import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import MainMenu from './components/Menu/index';
import Document from './components/Document/index';

import './App.css';
import 'antd/dist/antd.css';
import {FileDoneOutlined} from '@ant-design/icons';
import {LoginPage} from './components/Login';
import { ChooseNotebook } from './components/NoNotebookSelected';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';



function App() {
  if(false) {
    return <LoginPage/>
  }

  return (<HashRouter>

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
      </HashRouter>
  );
}

export default App;
