import React from 'react';

import { Menu, Dropdown, message} from 'antd';
import { DeleteOutlined, EditOutlined, CopyOutlined} from '@ant-design/icons';

import Styles from './dropdown.module.css'


function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
}


const menu = (
    <Menu onClick={handleMenuClick} className={Styles.wrap}>
        <Menu.Item key="1" icon={<EditOutlined />}>
            Rename notebook
        </Menu.Item>
        <Menu.Item key="3" icon={<CopyOutlined />}>
            Copy link to notebook
        </Menu.Item>
        <Menu.Item key="2" icon={<DeleteOutlined />}>
            Delete notebook
        </Menu.Item>
    </Menu>
);

export const ContextMenu: React.FC = ({children}) =>{
    return <Dropdown overlay={menu} trigger={['contextMenu']}>{children}</Dropdown>
}