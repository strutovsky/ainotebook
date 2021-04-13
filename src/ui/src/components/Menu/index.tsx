import React, {useEffect, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import {actions, addNotebooksThunk, addPageThunk, getNotebooksThunk} from '../../redux/notebook-reducer';
import {getNotebooksPending, getNotebooksSelector, getSelectedNotebook } from '../../redux/selectors/notebook-selector';
import {Menu, Skeleton} from 'antd';

import Add from '../../common/adding';
import { ContextMenu } from '../../common/dropdown';

import {BookOutlined, SettingOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import MenuStyles from './menu.module.css'

const queryString = require('query-string');
const {SubMenu} = Menu;

const MainMenu: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const parsed = queryString.parse(history.location.search);

    const [nid, setNid] = useState(parsed.nid)
    const [page, setPage] = useState(parsed.pages)
    const [isOpen, setIsOpen] = useState(true)

    const notebooks = useSelector(getNotebooksSelector)
    const pending = useSelector(getNotebooksPending)
    const selectedNotebook = useSelector(getSelectedNotebook);

    useEffect(() => {
        dispatch(getNotebooksThunk())
    }, [])

    useEffect(() =>{
        setNid(parsed.nid)
        setPage(parsed.page)
    },[parsed.nid, parsed.page])


    const addBook = (name: string) => {
        dispatch(addNotebooksThunk(name))
    }

    const addPage = (nid: string, title: string) => {
        dispatch(addPageThunk(nid, title))
    }

    return (<div className={MenuStyles.mainWrap  + " " + (isOpen ? MenuStyles.menuOpened : "")}>
                <div className={MenuStyles.menuButton} onClick={() => {
                    setIsOpen(prevState => !prevState)
                }}>
                    <MenuUnfoldOutlined />
                </div>

                <div className={MenuStyles.menuWrap + " custom-scroll"}>
                    {pending ? <Skeleton active={true}/> :
                        <Menu
                            mode="inline"
                            theme="light"
                            selectedKeys={[nid]}
                        >

                            <Menu.ItemGroup title={'Notebooks'}>
                                {notebooks.map(item => {
                                    if(nid === item.id){
                                        dispatch(actions.setSelectedNotebook(item))
                                    }
                                    return (<Menu.Item key={item.id} icon={<BookOutlined/>} title={item.name} onClick={(info) =>{
                                                 dispatch(actions.setSelectedNotebook(item))
                                    }}><ContextMenu nid={item.id} url={window.location.host+'/notebook?nid=' + item.id + '&page=' + item?.pages[0]?.id}>
                                            <NavLink to={'/notebook?nid=' + item.id + '&page=' + item?.pages[0]?.id}>{item.name}</NavLink>
                                            </ContextMenu>
                                            </Menu.Item>)

                                })}

                            </Menu.ItemGroup>

                            <Add
                                placeholder={'Add notebook'}
                                add={addBook}
                                mode={'book'}
                            />


                            {/*<Menu.ItemGroup title={'Sticks'}>*/}
                            {/*    <SubMenu key="sub1" icon={<PaperClipOutlined/>} title="Stick pages">*/}
                            {/*        {Notices.map(item => (<Menu.Item key={item.id}>*/}
                            {/*            {item.name}*/}
                            {/*        </Menu.Item>))}*/}

                            {/*        <Add*/}
                            {/*            addingMode={this.props.addingNotice}*/}
                            {/*            setAddingMode={this.props.setAddingNoticeMode}*/}
                            {/*            placeholder={"Add stick page"}*/}
                            {/*            add={this.addNoteNotice}*/}
                            {/*        />*/}
                            {/*    </SubMenu>*/}
                            {/*</Menu.ItemGroup>*/}

                            <Menu.ItemGroup title={'Setting and other'}>
                                <SubMenu key="sub2" icon={<SettingOutlined/>} title="Setting">
                                    <Menu.Item key="9">Option 9</Menu.Item>
                                    <Menu.Item key="10">Option 10</Menu.Item>
                                </SubMenu>
                            </Menu.ItemGroup>
                        </Menu>}
                </div>

                {selectedNotebook && <div className={MenuStyles.Pages + " custom-scroll"}>
                    {!pending ? <Menu
                        mode="inline"
                        theme="light"
                        selectedKeys={[page]}
                    >
                            <Menu.ItemGroup title={'Pages'} >
                                {selectedNotebook.pages.map(pages => {
                                    return <Menu.Item key={pages.id} onClick={() => {
                                        setIsOpen(false)
                                        setPage(page?.id)}
                                    }>
                                        <NavLink to={'/notebook?nid=' + selectedNotebook?.id + '&page=' + pages.id}></NavLink>{pages.title}
                                    </Menu.Item>
                                })}
                            </Menu.ItemGroup>
                            <Add
                                placeholder={'Add page'}
                                add={addPage}
                                mode={'page'}
                                nid={selectedNotebook?.id}
                            />
                    </Menu> : <Skeleton active={true}/> }
                </div>}
            </div>

    );
}

export default MainMenu
