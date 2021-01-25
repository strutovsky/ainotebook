import React from 'react';
import {HashRouter, Route} from "react-router-dom";

import MainMenu from './components/Menu';
import Document from './components/Document';

import './App.css';
import 'antd/dist/antd.css';
import {FileDoneOutlined} from '@ant-design/icons';


function App() {

  return (<HashRouter>
          <header>
              <h1><FileDoneOutlined /> Ainotebook</h1>
          </header>

          <div className="App">

              <MainMenu/>

              <Route path="/notebook/:notebookId?/page/:pageId?" render={() => <Document/>}/>
          </div>
      </HashRouter>
  );
}

export default App;
