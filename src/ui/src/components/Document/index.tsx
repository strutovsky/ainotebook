import React, {useEffect, useState} from 'react';
import Styles from './document.module.css';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getActivePage, getNotebooksPending, getPagePending} from '../../redux/selectors/notebook-selector';
import { getNotebookPageThunk } from '../../redux/notebook-reducer';
import { Skeleton } from 'antd';

const queryString = require('query-string');

const Document: React.FC<any> = (props) => {
    const activePage = useSelector(getActivePage)
    const pending = useSelector(getPagePending)
    const dispatch = useDispatch()

    const parsed = queryString.parse(props.location.search);

    useEffect(() => {
        dispatch(getNotebookPageThunk(parsed.nid, parsed.page))
    }, [parsed.nid, parsed.page])

    if(pending) {
        return <Skeleton active/>
    }

    return (<div className={Styles.wrap}>
                <div className={Styles.header}>
                    <input value={activePage?.title} readOnly
                    />
                </div>

                <div className={Styles.date}>
                    {activePage?.create_at}
                </div>

                <div className={Styles.body} >
                    <textarea style={{"resize": "none"}} name="body" value={activePage?.body} readOnly></textarea>
                </div>
            </div>)
}

export default withRouter(Document)