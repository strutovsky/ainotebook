import React, {useEffect, useState} from 'react';
// @ts-ignore
import Styles from './document.module.css';
import {withRouter} from 'react-router-dom';
import {NotebookAPI} from '../../api/notebookAPI';


const Document: React.FC<any> = (props) => {
    const {notebookId, pageId} = props.match.params
    const [title, setTitle] = useState("Новая страница")
    const [text, setText] = useState("")

    useEffect(() => {
        NotebookAPI.getNotebookPage(notebookId, pageId)
    }, [notebookId, pageId])



    return (<div className={Styles.wrap}>
                <div className={Styles.header}>
                    <input value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className={Styles.date}>
                    {new Date().toDateString()}
                </div>

                <div className={Styles.body}>
                    <textarea name="body" value={text} onChange={e => setText(e.target.value)}></textarea>
                </div>
            </div>)
}

export default withRouter(Document)