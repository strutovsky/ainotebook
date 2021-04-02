import React, {useState} from 'react';
import Styles from './document.module.css';
import {withRouter} from 'react-router-dom';

const queryString = require('query-string');

const Document: React.FC<any> = (props) => {
    const [title, setTitle] = useState("Новая страница")
    const [text, setText] = useState("")

    const parsed = queryString.parse(props.location.search);

    // useEffect(() => {
    //     NotebookAPI.getNotebookPage(notebookId, pageId)
    // }, [notebookId, pageId])

    return (<div className={Styles.wrap}>
                <div className={Styles.header}>
                    <input value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className={Styles.date}>
                    {new Date().toDateString()}
                </div>

                <div className={Styles.body} >
                    <textarea style={{"resize": "none"}} name="body" value={text} onChange={e => setText(e.target.value)}></textarea>
                </div>
            </div>)
}

export default withRouter(Document)