import React, {useEffect, useState} from 'react';
// @ts-ignore
import Styles from './document.module.css';
import {withRouter} from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined, PicLeftOutlined } from '@ant-design/icons';


const Document: React.FC<any> = (props) => {
    const {notebookId, pageId} = props.match.params
    const [title, setTitle] = useState("Новая страница")
    const [text, setText] = useState("")
    const [editTitle, setEditTitle] = useState(false)

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
                <div className={Styles.toolbar}>
                    <div className={Styles.logo}>Ainotebook</div>
                    <h4>Dmitriy Naholiuk</h4>
                    <Avatar style={{ backgroundColor: '#87d068', marginRight: '10px' }} icon={<UserOutlined />} />
                </div>
                <div className={Styles.header}>
                    <input value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className={Styles.body}>
                    <textarea name="body" value={text} onChange={e => setText(e.target.value)}></textarea>
                </div>
            </div>)
}

export default withRouter(Document)