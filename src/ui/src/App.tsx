import React from 'react';
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


function App() {
  if(false) {
    return <LoginPage/>
  }

  if(false) {
      return <ErrorPage/>
  }

  return (<BrowserRouter>
            <header>
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
