import React from 'react';
import { Menu, Button, Input } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined, BookOutlined, PlusOutlined,
} from '@ant-design/icons';

import MenuStyles from './menu.module.css'

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
        this.setState({notebookValue: ''})
        this.props.AddBook(this.state.notebookValue)
    }

    nootebookChangeHandler = (e) => {
        this.setState({notebookValue: e.target.value})
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
                    </Menu.ItemGroup>

                    {!this.props.addingMode && <div className={MenuStyles.tempNoteboook}
                               key={'add'}
                               onClick={() => this.props.setAddingMode(true)}
                    >
                        <PlusOutlined /> Add notebook
                    </div>}


                    {this.props.addingMode &&  <Menu.Item className={MenuStyles.tempNoteboook}
                               key={'temp'} icon={<BookOutlined /> }
                               disabled={true}
                    >

                        <Input ref={this.addBookRef}
                               placeholder="Enter name of notebook"
                               value={this.state.notebookValue}
                               autoFocus={true}
                               onChange={this.nootebookChangeHandler}
                               onBlur={this.addNoteBook}/>

                    </Menu.Item>}

                    <Menu.ItemGroup title={"Quick notice"}>
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </Menu.ItemGroup>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export default MainMenu