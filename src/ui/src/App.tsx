import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {LoginPage} from './components/Login';
import { ChooseNotebook } from './components/NoNotebookSelected';
import { Avatar } from 'antd';

import MainMenu from './components/Menu/index';
import Document from './components/Document/index';
import {ErrorPage} from './components/Error';

import { UserOutlined } from '@ant-design/icons';
import './App.css';
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from 'react-redux';
import { getAppErrorSelector } from './redux/selectors/app-selector';
import { NotebookModal } from './components/Modals/NotebookModal';
import { checkLangThunk } from './redux/app-reducer';


function App() {
  const error = useSelector(getAppErrorSelector)
  const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkLangThunk())
    }, [])


  if(false) {
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
