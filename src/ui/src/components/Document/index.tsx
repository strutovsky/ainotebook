import React, {useEffect, useState} from 'react';
import Styles from './document.module.css';
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getActivePage } from '../../redux/selectors/notebook-selector';
import { getNotebookPageThunk } from '../../redux/notebook-reducer';

const queryString = require('query-string');

const Document: React.FC<any> = (props) => {
    const activePage = useSelector(getActivePage)
    const dispatch = useDispatch()

    const parsed = queryString.parse(props.location.search);

    useEffect(() => {
        dispatch(getNotebookPageThunk(parsed.nid, parsed.page))
    }, [parsed.nid, parsed.page])

    return (<div className={Styles.wrap}>
                <div className={Styles.header}>
                    <input value={activePage?.title}
                    />
                </div>

                <div className={Styles.date}>
                    {activePage?.create_at}
                </div>

                <div className={Styles.body} >
                    <textarea style={{"resize": "none"}} name="body" value={activePage?.body}></textarea>
                </div>
            </div>)
}

export default withRouter(Document)