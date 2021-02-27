import React from 'react';
import {HashRouter, Route} from "react-router-dom";

import MainMenu from './components/Menu/index';
import Document from './components/Document/index';

import './App.css';
import 'antd/dist/antd.css';
import {FileDoneOutlined} from '@ant-design/icons';


function App() {

  return (<HashRouter>

        <div className="App">
          <MainMenu/>

          <Route path="/notebook/:notebookId?/page/:pageId?" render={() => <Document/>}/>
        </div>
      </HashRouter>
  );
}

export default App;
