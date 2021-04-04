import React, {useEffect, useState} from 'react';
import {NavLink, useHistory, useParams} from 'react-router-dom';


import {connect, useDispatch, useSelector} from 'react-redux';
import {INotebook, INotebooks} from '../../interfaces/notebooks';

import {Menu, Skeleton} from 'antd';
import {BookOutlined, PaperClipOutlined, SettingOutlined} from '@ant-design/icons';

import MenuStyles from './menu.module.css'
import Add from '../../common/adding';

import {INotices} from '../../interfaces/notices';
import {AppStateType} from '../../redux/state';
import {getNoticesThunk} from '../../redux/notice-reducer';
import {actions, addNotebooksThunk, addPageThunk, getNotebooksThunk} from '../../redux/notebook-reducer';
import {getNotebooksPending, getNotebooksSelector, getSelectedNotebook } from '../../redux/selectors/notebook-selector';
const queryString = require('query-string');

const {SubMenu} = Menu;


// type PropsType = {
//     addNotebooksThunk: (name: string) => void,
//     addPageThunk: (id: number, title: string) => void,
//     getNotebooksThunk: () => void,
//     getNoticesThunk: () => void,
//     Notebooks: INotebook[],
//     Notices: INotices,
//     pending: boolean
// }


const MainMenu: React.FC = () => {
    const history = useHistory()
    const parsed = queryString.parse(history.location.search);

    const [nid, setNid] = useState(parsed.nid)
    const [page, setPage] = useState(parsed.pages)



    const dispatch = useDispatch()
    const notebooks = useSelector(getNotebooksSelector)
    const pending = useSelector(getNotebooksPending)
    const selectedNotebook = useSelector(getSelectedNotebook);

    const params = useParams()


    useEffect(() =>{
        setNid(parsed.nid)
        setPage(parsed.page)
    },[parsed.nid, parsed.page] )

    useEffect(() => {
        dispatch(getNotebooksThunk())
        // dispatch(getNoticesThunk())
    }, [])



    console.log('render')

    return (<div className={MenuStyles.mainWrap}>
                <div className={MenuStyles.menuWrap} style={{width: '270px'}}>
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
                                    }}>
                                        <NavLink to={'/notebook?nid=' + item.id + '&page='+selectedNotebook?.pages[0]?.id}></NavLink>{item.name}
                                            </Menu.Item>)

                                })}

                                {/*<Add*/}
                                {/*    placeholder={'Add notebook'}*/}
                                {/*    add={addNotebooksThunk}*/}
                                {/*/>*/}
                            </Menu.ItemGroup>


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

                {selectedNotebook && <div className={MenuStyles.Pages}>
                    <Menu
                        mode="inline"
                        theme="light"
                        defaultSelectedKeys={[page]}
                        selectedKeys={[page]}

                    >
                            <Menu.ItemGroup title={'Pages'} >
                                {selectedNotebook.pages.map(pages => {
                                    return <Menu.Item key={pages.id}>
                                        <NavLink to={'/notebook?nid=' + selectedNotebook?.id + '&page=' + pages.id}></NavLink>{pages.title}
                                    </Menu.Item>
                                })}
                            </Menu.ItemGroup>
                    </Menu>
                </div>}
            </div>

    );
}

export default MainMenu
