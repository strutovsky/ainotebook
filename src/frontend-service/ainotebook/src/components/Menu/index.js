import React from 'react';
import { Menu, Button, Input } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined, BookOutlined, PlusOutlined, PaperClipOutlined, SettingOutlined,
} from '@ant-design/icons';

import MenuStyles from './menu.module.css'
import Add from '../../common/adding';

const { SubMenu } = Menu;

class MainMenu extends React.Component {
    state = {
        collapsed: false,
        notebookValue: ''
    };

    constructor(props) {
        super(props);
        this.addBookRef = React.createRef();
    }

    focusOnInput = () => {
        this.props.setAddingMode(true)
    }

    addNoteBook = (e) => {
        this.props.setAddingMode(false)
        this.props.AddBook(e.target.value)
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        return (
            <div style={{ width: 256 }} className={MenuStyles.menuWrap}>
                {/*<Button className={MenuStyles.button} type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }} >*/}
                {/*    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}*/}
                {/*</Button>*/}

                {/*<Button type="primary" className={MenuStyles.addNotebook} onClick={this.focusOnInput}>Add notebook <PlusOutlined /></Button>*/}
                <Menu
                    defaultSelectedKeys={['add']}
                    mode="inline"
                    theme="light"

                    // inlineCollapsed={this.state.collapsed}
                >
                    <Menu.ItemGroup title={"Notebooks"}>
                        {this.props.notebooks.map(item => (<Menu.Item key={item.id} icon={<BookOutlined />}>
                            {item.name}
                        </Menu.Item>))}

                        <Add
                            addingMode={this.props.addingMode}
                            setAddingMode={this.props.setAddingMode}
                            placeholder={"Add notebook"}
                            add={this.addNoteBook}
                        />
                    </Menu.ItemGroup>



                    <Menu.ItemGroup title={"Sticks"}>
                        <SubMenu key="sub1" icon={<PaperClipOutlined />} title="Stick">
                            <Menu.Item key="5">Page 1</Menu.Item>
                            <Menu.Item key="5">Page 2</Menu.Item>
                            <Menu.Item key="5">Page 3</Menu.Item>
                        </SubMenu>
                    </Menu.ItemGroup>

                    <Menu.ItemGroup title={"Setting and other"}>
                        <SubMenu key="sub2" icon={<SettingOutlined />} title="Setting" o>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </Menu.ItemGroup>
                </Menu>
            </div>
        );
    }
}

export default MainMenu