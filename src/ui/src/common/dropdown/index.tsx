import React, {useState} from 'react';

import { Menu, Dropdown, message} from 'antd';
import { DeleteOutlined, EditOutlined, CopyOutlined} from '@ant-design/icons';

import Styles from './dropdown.module.css'
import {useDispatch} from 'react-redux';
import { deleteNotebook } from '../../redux/notebook-reducer';
import { useHistory } from 'react-router-dom';
import { deletePage } from '../../redux/document-reducer';
import {NotebookModal} from '../../components/Modals/NotebookModal';


message.config({duration: 1.5})

export const ContextMenu:React.FC<{nid: string,
                                   url: string,
                                   mode: 'page'|'notebook',
                                   pid?: string,
                                   name?: string,
                                    prohabited?: boolean

}> = ({children,
                                                                                              nid,
                                                                                              url,
                                                                                              mode,pid,
                                   prohabited, name
}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const [hidden, setHidden] = useState(true)


    const menu = (<Menu className={Styles.wrap}>
                    {mode !== "page" && <Menu.Item key="1" icon={<EditOutlined />} onClick={() => {
                        setHidden(false)
                    }}>
                        Rename {mode}
                    </Menu.Item>}
                    <Menu.Item icon={<CopyOutlined />} onClick={(e) => {
                        navigator.clipboard.writeText(url)
                        message.success("link copied")
                    }}>
                        Copy link to {mode}
                    </Menu.Item>
                     {!prohabited && mode !== "page" && <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() =>{

                        if(mode === 'notebook') dispatch(deleteNotebook(nid))

                        history.push('/')

                    }}>
                        Delete {mode}
                    </Menu.Item>}
                    </Menu>);
    return <>
            <Dropdown overlay={menu} trigger={['contextMenu']}>{children}</Dropdown>
            <NotebookModal nid={nid} hidden={hidden} setHidden={setHidden} name={name}/>
        </>
}