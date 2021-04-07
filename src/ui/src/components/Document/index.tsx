import React, {useEffect, useState} from 'react';
import Styles from './document.module.css';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getActivePage, getNotebooksPending, getPagePending} from '../../redux/selectors/notebook-selector';
import { Skeleton } from 'antd';
import {getActivePageSelector} from '../../redux/selectors/document-selector';
import {getNotebookPageThunk, saveChangesThunk} from '../../redux/document-reducer';
import {actions} from '../../redux/document-reducer'


const queryString = require('query-string');

const Document: React.FC<any> = (props) => {
    const activePage = useSelector(getActivePageSelector)

    const pending = useSelector(getPagePending)
    const dispatch = useDispatch()


    const parsed = queryString.parse(props.location.search);


    useEffect(() => {
        dispatch(getNotebookPageThunk(parsed.nid, parsed.page))
        dispatch(saveChangesThunk())
    }, [parsed.nid, parsed.page])

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
                    <textarea style={{"resize": "none"}}
                              name="body"
                              value={activePage?.body}
                              onChange={e => {
                                  dispatch(actions.setBody(e.target.value))
                              }}
                              className={"custom-scroll"}
                    ></textarea>
                </div>
            </div>)
}

export default withRouter(Document)