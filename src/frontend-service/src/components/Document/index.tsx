import React, {useEffect, useState} from 'react';
import Styles from './document.module.css';
import {withRouter} from 'react-router-dom';


const Document = (props: any) => {
    const {notebookId, pageId} = props.match.params
    const [title, setTitle] = useState("Новая страница")
    const [text, setText] = useState("")

    useEffect(() => {
        async function load() {
            const notebooks = await fetch('http://localhost:4200/notebooks/' + notebookId)
            const notebooksJson = await notebooks.json()

            const page = notebooksJson.pages.find((item: any) => item.id === Number(pageId))
            setTitle(page.title)
            setText(page.text)
        }

        load()

    }, [notebookId, pageId])



    return (<div className={Styles.wrap}>
                <div className={Styles.header}>
                    <h2>{title}</h2>
                </div>

                <div className={Styles.body}>
                    {text}
                </div>
            </div>)
}

export default withRouter(Document)