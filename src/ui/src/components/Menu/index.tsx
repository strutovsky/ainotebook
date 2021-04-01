import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';


import {connect} from 'react-redux';
import {INotebooks} from '../../interfaces/notebooks';

import {Menu, Skeleton} from 'antd';
import {BookOutlined, PaperClipOutlined, SettingOutlined} from '@ant-design/icons';

import MenuStyles from './menu.module.css'
import Add from '../../common/adding';

import {INotices} from '../../interfaces/notices';
import {AppStateType} from '../../redux/state';
import {getNoticesThunk} from '../../redux/notice-reducer';
import {actions, addNotebooksThunk, addPageThunk, getNotebooksThunk} from '../../redux/notebook-reducer';


const {SubMenu} = Menu;


type PropsType = {
    addNotebooksThunk: (name: string) => void,
    addPageThunk: (id: number, title: string) => void,
    getNotebooksThunk: () => void,
    getNoticesThunk: () => void,
    Notebooks: INotebooks,
    Notices: INotices,
    pending: boolean
}


const MainMenu: React.FC<PropsType> = ({
                                           Notebooks,
                                           addNotebooksThunk,
                                           getNotebooksThunk,
                                           Notices,
                                           getNoticesThunk,
                                           pending,
                                           addPageThunk
                                       }) => {
    useEffect(() => {
        getNotebooksThunk()
        getNoticesThunk()
    }, [])

    return (
        <div className={MenuStyles.menuWrap} style={{width: '270px'}}>
            {pending ? <Skeleton active={true}/> :
                <Menu
                    defaultSelectedKeys={['add']}
                    mode="inline"
                    theme="light"

                >

                    <Menu.ItemGroup title={'Notebooks'}>
                        {Notebooks.map(item => (<SubMenu key={item.id} icon={<BookOutlined/>} title={item.name}>
                            {item.pages.map(page => {
                                return (<Menu.Item key={page.id + item.id}>
                                    <NavLink to={'/notebook/' + item.id + '/page/' + page.id}></NavLink>{page.title}
                                </Menu.Item>)


                            })}

                            <Add
                                placeholder={'Add page'}
                                add={() => addPageThunk(item.id, 'f')}
                            />
                        </SubMenu>))}

                        <Add
                            placeholder={'Add notebook'}
                            add={addNotebooksThunk}
                        />
                    </Menu.ItemGroup>


                    <Menu.ItemGroup title={'Sticks'}>
                        <SubMenu key="sub1" icon={<PaperClipOutlined/>} title="Stick pages">
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

                    <Menu.ItemGroup title={'Setting and other'}>
                        <SubMenu key="sub2" icon={<SettingOutlined/>} title="Setting">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                        </SubMenu>
                    </Menu.ItemGroup>
                </Menu>}
        </div>
    );
}


const mapStateToProps = (state: AppStateType) => {
    return {
        Notebooks: state.notebooks.data,
        Notices: state.notices.data,
        pending: state.notebooks.pending
    }
}

export default connect(mapStateToProps, {
    ...actions,
    addNotebooksThunk,
    getNotebooksThunk,
    getNoticesThunk,
    addPageThunk
})(MainMenu)
