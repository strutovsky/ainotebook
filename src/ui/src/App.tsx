import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {LoginPage} from './components/Login';
import { ChooseNotebook } from './components/NoNotebookSelected';
import { Avatar } from 'antd';

import MainMenu from './components/Menu/index';
import Document from './components/Document/index';
import {ErrorPage} from './components/Error';

import { UserOutlined,LogoutOutlined } from '@ant-design/icons';
import './App.css';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from 'react-redux';
import { getAppErrorSelector, getIsLoginedSelector } from './redux/selectors/app-selector';
import {checkLangThunk, checkLoginThunk, singOutThunk} from './redux/app-reducer';


function App() {
  const error = useSelector(getAppErrorSelector)
  const isLogined = useSelector(getIsLoginedSelector)

  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkLoginThunk())
        dispatch(checkLangThunk())
    }, [])


  if(!isLogined) {
    return <LoginPage/>
  }

  if(error) {
      return <ErrorPage/>
  }



  return (<BrowserRouter>
            <header>
                <div className={'Copyright'}>
                    (C) 2021 Naholiuk Dmytro and Max Strutovskiy
                </div>
                <div>
                    <h3>Dmitriy Naholiuk</h3>
                    <Avatar size={32} icon={<UserOutlined />} />
                    <LogoutOutlined size={40}
                                    style={{'color': 'red', marginLeft: '10px'}}
                                    title={'logout'}
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
