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
import { LangSetting } from '../Settings/lang';
import {getLangSelector} from '../../redux/selectors/app-selector';
import {texts} from '../../lang/languages';

const queryString = require('query-string');
const {SubMenu} = Menu;

const MainMenu: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const parsed = queryString.parse(history.location.search);

    const [nid, setNid] = useState(parsed.nid)
    const [page, setPage] = useState(parsed.pages)
    const [isOpen, setIsOpen] = useState(true)
    const [editNotebookMode, setEditNotebookMode] = useState(false)

    const notebooks = useSelector(getNotebooksSelector)
    const pending = useSelector(getNotebooksPending)
    const selectedNotebook = useSelector(getSelectedNotebook);
    const lang = useSelector(getLangSelector)

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
                        <Menu
                            mode="inline"
                            theme="light"
                            selectedKeys={[nid]}
                        >

                            <Menu.ItemGroup title={texts.menu.Notebooks[lang]}>
                                {notebooks.map(item => {
                                    if(nid === item.id){
                                        dispatch(actions.setSelectedNotebook(item))
                                    }
                                    return (<Menu.Item key={item.id}
                                                       icon={<BookOutlined/>}
                                                       title={item.name}
                                                       disabled={pending}
                                                       onContextMenu={() => {}}
                                                       onClick={(info) =>{
                                                            dispatch(actions.setSelectedNotebook(item))
                                    }}>
                                        <ContextMenu mode={'notebook'}
                                                     name={item.name}
                                                    nid={item.id}
                                                    url={window.location.host+'/notebook?nid=' + item.id + '&page=' + item?.pages[0]?.id}
                                        >
                                            <NavLink to={'/notebook?nid=' + item.id + '&page=' + item?.pages[0]?.id}>{item.name}</NavLink>
                                        </ContextMenu>
                                    </Menu.Item>)})}
                            </Menu.ItemGroup>

                            <Add
                                placeholder={texts.menu.addNotebook[lang]}
                                add={addBook}
                                mode={'book'}
                            />

                            <Menu.ItemGroup title={texts.settings.setting[lang]}>
                                <SubMenu key="sub2" icon={<SettingOutlined/>} title={texts.settings.lang[lang]}>
                                    <LangSetting/>
                                </SubMenu>
                            </Menu.ItemGroup>
                        </Menu>
                </div>

                {selectedNotebook && <div className={MenuStyles.Pages + " custom-scroll"}>
                    <Menu
                        mode="inline"
                        theme="light"
                        selectedKeys={[page]}
                        defaultSelectedKeys={[page]}
                    >
                            <Menu.ItemGroup title={texts.menu.Pages[lang]} >
                                {selectedNotebook.pages.map(pages => {
                                    return <Menu.Item key={pages.id} disabled={pending}>
                                        <ContextMenu mode={'page'}
                                                     nid={selectedNotebook?.id}
                                                     pid={pages.id}
                                                     url={window.location.host+'/notebook?nid=' + selectedNotebook.id + '&page=' + pages.id}
                                        >
                                            <NavLink onClick={(e) => {
                                                if(pages !== undefined) setPage(pages.id)}

                                            } to={'/notebook?nid=' + selectedNotebook?.id + '&page=' + pages.id}>{pages.title}</NavLink>
                                        </ContextMenu>
                                    </Menu.Item>
                                })}
                            </Menu.ItemGroup>
                            <Add
                                placeholder={texts.menu.addPage[lang]}
                                add={addPage}
                                mode={'page'}
                                nid={selectedNotebook?.id}
                            />
                    </Menu>
                </div>}
            </div>

    );
}

export default MainMenu
