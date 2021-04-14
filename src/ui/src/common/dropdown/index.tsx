import React from 'react';

import { Menu, Dropdown, message} from 'antd';
import { DeleteOutlined, EditOutlined, CopyOutlined} from '@ant-design/icons';

import Styles from './dropdown.module.css'
import {useDispatch} from 'react-redux';
import { deleteNotebook } from '../../redux/notebook-reducer';
import { useHistory } from 'react-router-dom';
import { deletePage } from '../../redux/document-reducer';


message.config({duration: 30})

export const ContextMenu:React.FC<{nid: string,
                                   url: string,
                                   mode: 'page'|'notebook',
                                   pid?: string
}> = ({children,
                                                                                              nid,
                                                                                              url,
                                                                                              mode,pid
}) =>{
    const dispatch = useDispatch()
    const history = useHistory()

    const menu = (<Menu className={Styles.wrap}>
                    <Menu.Item key="1" icon={<EditOutlined />}>
                        Rename {mode}
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CopyOutlined />} onClick={(e) => {
                        navigator.clipboard.writeText(url)
                        message.success("link copied")
                    }}>
                        Copy link to {mode}
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() =>{
                        if(mode === "page" && pid) {
                            dispatch(deletePage(nid, pid))
                        }

                        if(mode === 'notebook') dispatch(deleteNotebook(nid))

                        history.push('/')

                    }}>
                        Delete {mode}
                    </Menu.Item>
                    </Menu>);
    return <Dropdown overlay={menu} trigger={['contextMenu']}>{children}</Dropdown>
}