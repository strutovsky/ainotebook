import React, {useEffect} from 'react';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';

import {LoginPage} from './components/Login';
import { ChooseNotebook } from './components/NoNotebookSelected';
import { Avatar } from 'antd';

import MainMenu from './components/Menu/index';
import Document from './components/Document/index';
import {ErrorPage} from './components/Error';

import { UserOutlined,LogoutOutlined, InfoCircleOutlined} from '@ant-design/icons';
import './App.css';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from 'react-redux';
import { getAppErrorSelector, getIsLoginedSelector } from './redux/selectors/app-selector';
import {checkLangThunk, checkLoginThunk, getUserInfoThunk, singOutThunk} from './redux/app-reducer';
import {AppStateType} from './redux/state';


function App() {
  const error = useSelector(getAppErrorSelector)
  const isLogined = useSelector(getIsLoginedSelector)
  const userInfo = useSelector((state: AppStateType) => state.app.data.userInfo)

  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkLoginThunk())
        dispatch(checkLangThunk())

    }, [])

    useEffect(() => {
        if(isLogined) dispatch(getUserInfoThunk())

    }, [isLogined])


  if(!isLogined) {
    return <LoginPage/>
  }

  if(error) {
      return <ErrorPage/>
  }



  return (<BrowserRouter>
            <header>
                <div className={'MainInfo'}>
                    <InfoCircleOutlined title={'(C) 2021 Naholiuk Dmytro and Max Strutovskiy'} className={'Copyright'}/>
                    <h3><a href={'/'}>AiNotebook</a></h3>
                </div>
                <div>
                    <h3 className={'UserInfo'}>{userInfo.name} | {userInfo.email}</h3>
                    <Avatar size={32} icon={<UserOutlined />} className={'UserInfo'}/>
                    <LogoutOutlined size={40}
                                    style={{'color': 'red', marginLeft: '10px'}}
                                    title={'logout'}
                                    className={'Logout'}
                                    onClick={() => {
                                        dispatch(singOutThunk())
                                    }}
                    />
                </div>
            </header>
            <div className="App">
              <MainMenu/>
              <Switch>
                  <Route path="/notebook" render={() => <Document/>}/>
                  <Route>
                      <ChooseNotebook/>
                  </Route>
              </Switch>
            </div>
      </BrowserRouter>
  );
}

export default App;
