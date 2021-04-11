import React, {useEffect, useState} from 'react';
import Styles from './document.module.css';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getActivePage, getNotebooksPending, getPagePending} from '../../redux/selectors/notebook-selector';
import { Skeleton } from 'antd';
import {getActivePageSelector, getDocumentErrorSelector} from '../../redux/selectors/document-selector';
import {getNotebookPageThunk, saveChangesThunk} from '../../redux/document-reducer';
import {actions} from '../../redux/document-reducer'
import { ErrorPage } from '../Error';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Button: React.FC = () => {
    return <button/>
}


const queryString = require('query-string');

const Document: React.FC<any> = (props) => {
    const activePage = useSelector(getActivePageSelector)

    const pending = useSelector(getPagePending)
    const error = useSelector(getDocumentErrorSelector)
    const dispatch = useDispatch()

    const parsed = queryString.parse(props.location.search);



    let _contentState = ContentState.createFromText(activePage ? activePage.body : "");
    const raw = convertToRaw(_contentState)

    const [editorState, setEditorState] = useState(raw) ;
    useEffect(() => {
        if(activePage) {
            try {
                setEditorState(JSON.parse(activePage.body))
            }catch (e){
                setEditorState(convertToRaw(ContentState.createFromText(activePage.body)))
            }
        }
    }, [activePage])


    useEffect(() => {
        dispatch(getNotebookPageThunk(parsed.nid, parsed.page))
        dispatch(saveChangesThunk(editorState))
    }, [parsed.nid, parsed.page])

    if(error) {
        return <ErrorPage message={error}/>
    }

    if(pending || activePage === null) {
        return <Skeleton active/>
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

                <div className={Styles.body} >
                    {/*<textarea style={{"resize": "none"}}*/}
                    {/*          name="body"*/}
                    {/*          value={activePage?.body}*/}
                    {/*          onChange={e => {*/}
                    {/*              dispatch(actions.setBody(e.target.value))*/}
                    {/*          }}*/}
                    {/*          className={"custom-scroll"}*/}
                    {/*></textarea>*/}
                    <Editor
                        defaultContentState={editorState}
                        onContentStateChange={setEditorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        toolbar={{
                            options: ['inline', 'list', 'textAlign']
                        }}
                    />
                </div>
            </div>)
}

export default withRouter(Document)