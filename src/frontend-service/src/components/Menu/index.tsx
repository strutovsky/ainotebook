import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {AppStateType} from "../../redux/state";
import {actions, addNotebooksThunk, getNotebooksThunk} from "../../redux/notebook-reducer";
import {connect} from "react-redux";
import {INotebooks} from "../../interfaces/notebooks";

import {Menu} from 'antd';
import {BookOutlined, PaperClipOutlined, SettingOutlined} from '@ant-design/icons';

import MenuStyles from './menu.module.css'
import Add from '../../common/adding';
import {getNoticesThunk} from "../../redux/notice-reducer";
import {INotices} from "../../interfaces/notices";


const { SubMenu } = Menu;


type PropsType = {
    addNotebooksThunk: (name: string) => void,
    getNotebooksThunk: () => void,
    getNoticesThunk: () => void,
    Notebooks: INotebooks,
    Notices: INotices,
}


const MainMenu: React.FC<PropsType> = ({Notebooks, addNotebooksThunk, getNotebooksThunk, Notices, getNoticesThunk}) => {
    debugger
        useEffect(() => {
            getNotebooksThunk()
            getNoticesThunk()
        }, [])

        return (
            <div className={MenuStyles.menuWrap}>
                <Menu
                    defaultSelectedKeys={['add']}
                    mode="inline"
                    theme="light"
                >
                    <Menu.ItemGroup title={"Notebooks"}>
                        {Notebooks.map(item => (<SubMenu key={item.id} icon={<BookOutlined />} title={item.name}>
                                {item.pages.map(page => {
                                    return (<Menu.Item key={page.id}>
                                                <NavLink to={"/notebook/"+item.id + "/page/" + page.id}></NavLink>{page.title}
                                            </Menu.Item>)
                                })}
                        </SubMenu>))}

                        <Add
                            placeholder={"Add notebook"}
                            add={addNotebooksThunk}
                        />
                    </Menu.ItemGroup>



                    <Menu.ItemGroup title={"Sticks"}>
                        <SubMenu key="sub1" icon={<PaperClipOutlined />} title="Stick pages">
                            {Notices.map(item => (<Menu.Item key={item.id}>
                                {item.name}
                            </Menu.Item>))}

                            {/*<Add*/}
                            {/*    addingMode={this.props.addingNotice}*/}
                            {/*    setAddingMode={this.props.setAddingNoticeMode}*/}
                            {/*    placeholder={"Add stick page"}*/}
                            {/*    add={this.addNoteNotice}*/}
                            {/*/>*/}
                        </SubMenu>
                    </Menu.ItemGroup>

                    <Menu.ItemGroup title={"Setting and other"}>
                        <SubMenu key="sub2" icon={<SettingOutlined />} title="Setting">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                        </SubMenu>
                    </Menu.ItemGroup>
                </Menu>
            </div>
        );
}


const mapStateToProps = (state: AppStateType) => {
    return {
        Notebooks: state.notebooks.data,
        Notices: state.notices.data,
    }
}

export default connect(mapStateToProps, {...actions,
    addNotebooksThunk,
    getNotebooksThunk,
    getNoticesThunk
})(MainMenu)
