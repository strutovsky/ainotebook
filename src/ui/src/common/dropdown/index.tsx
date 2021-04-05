import React from 'react';

import { Menu, Dropdown, message} from 'antd';
import { DeleteOutlined, EditOutlined, CopyOutlined} from '@ant-design/icons';

import Styles from './dropdown.module.css'
import {useDispatch} from 'react-redux';
import { deleteNotebook } from '../../redux/notebook-reducer';


function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
}

export const ContextMenu:React.FC<{nid: string}> = ({children,nid}) =>{
    const dispatch = useDispatch()

    const menu = (<Menu className={Styles.wrap}>
                    <Menu.Item key="1" icon={<EditOutlined />}>
                        Rename notebook
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CopyOutlined />}>
                        Copy link to notebook
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() =>{dispatch(deleteNotebook(nid))}}>
                        Delete notebook
                    </Menu.Item>
                    </Menu>);
    return <Dropdown overlay={menu} trigger={['contextMenu']}>{children}</Dropdown>
}