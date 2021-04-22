import React, {useEffect, useState} from 'react';
import {useHistory, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {getPagePending} from '../../redux/selectors/notebook-selector';
import { Skeleton } from 'antd';
import {
    getActivePageSelector,
    getDocumentErrorSelector,
    getDocumentPendingSelector
} from '../../redux/selectors/document-selector';
import {deletePage, getNotebookPageThunk, saveChangesThunk} from '../../redux/document-reducer';
import {actions} from '../../redux/document-reducer'
import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {SyncOutlined, DeleteOutlined} from '@ant-design/icons';

import { ErrorPage } from '../Error';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Styles from './document.module.css';
import {AppStateType} from '../../redux/state';
import {Modal} from 'antd'


const queryString = require('query-string');

const { confirm } = Modal;



const Document: React.FC<any> = (props) => {

    const activePage = useSelector(getActivePageSelector)
    const pending = useSelector(getPagePending)
    const error = useSelector(getDocumentErrorSelector)
    const pendingSync = useSelector(getDocumentPendingSelector)
    const activeNote = useSelector((state: AppStateType) => state.notebooks.data.selectedNotebooks)

    const dispatch = useDispatch()
    const parsed = queryString.parse(props.location.search);

    let _contentState = ContentState.createFromText(activePage ? activePage.body : "");

    const raw = convertToRaw(_contentState)
    const [editorState, setEditorState] = useState(raw) ;

    useEffect(() => {
        return () => {
            dispatch(saveChangesThunk(editorState))
        }
    }, [])

    useEffect(() => {
        dispatch(saveChangesThunk(editorState))
        dispatch(getNotebookPageThunk(parsed.nid, parsed.page))
    }, [parsed.nid, parsed.page])



    useEffect(() => {
        if(activePage) {

            try {
                const temp = JSON.parse(activePage.body)
                setEditorState(temp)

            }catch (e){
                setEditorState(convertToRaw(ContentState.createFromText(activePage.body)))
            }
        }
    }, [activePage])


    if(error) {
        return <ErrorPage message={error}/>
    }

    if(activePage === null || pending) {
        return <Skeleton title={true} active={true} className={"padding-10"}></Skeleton>
    }

    return (<div className={Styles.wrap}>
                    <div className={Styles.header}>
                        <input value={activePage?.title} onChange={(e) => {
                            dispatch(actions.setTitle(e.target.value))
                        }}
                        />


                    </div>

                    <div className={Styles.date}>
                        {activePage?.create_at}
                    </div>

                    <div className={Styles.body + " custom-scroll"} >
                        <Editor
                            defaultContentState={editorState}
                            onContentStateChange={setEditorState}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            stripPastedStyles={true}
                            toolbar={{
                                options: ['inline', 'list', ]
                            }}

                        />
                    </div>

                    <SyncOutlined className={Styles.sync} spin={pendingSync} onClick={() =>
                        {
                            dispatch(saveChangesThunk(editorState, true))

                        }
                    }/>

                    <DeleteOutlined className={Styles.delete} spin={pendingSync} onClick={() =>
                    {
                        if(activeNote?.id && activePage?.id && activeNote?.pages.length !==1) {
                            confirm({
                                title: 'Do you Want to delete this page?',

                                onOk() {
                                    dispatch(deletePage(activeNote?.id, activePage?.id))
                                }})
                        }
                    }
                    }/>



    </div>)
}

export default withRouter(Document)