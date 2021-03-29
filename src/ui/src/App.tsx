import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import MainMenu from './components/Menu/index';
import Document from './components/Document/index';

import './App.css';
import 'antd/dist/antd.css';
import {FileDoneOutlined} from '@ant-design/icons';
import {LoginPage} from './components/Login';
import { ChooseNotebook } from './components/NoNotebookSelected';


function App() {
  if(false) {
    return <LoginPage/>
  }

  return (<HashRouter>

        <div className="App">
          <MainMenu/>
          <Switch>
              <Route path="/notebook/:notebookId?/page/:pageId?" render={() => <Document/>}/>
              <Route>
                  <ChooseNotebook/>
              </Route>
          </Switch>


        </div>
      </HashRouter>
  );
}

export default App;
