import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {FileDoneOutlined} from '@ant-design/icons';
import {HashRouter, Route} from "react-router-dom";

import MainMenu from './components/Menu';
import React, {useEffect, useState} from 'react';
import Document from './components/Document';


function App() {
    const [notebooks, setNotebooks] = useState([])
    const [notices, setNotice] = useState([])

    const [addingMode, setAddingMode] = useState(false)
    const [addingNotice, setAddingNoticeMode] = useState(false)

    async function load() {
        const notebooks = await fetch('http://localhost:4200/notebooks')
        const notebooksJson = await notebooks.json()
        setNotebooks(notebooksJson)

        const notices = await fetch('http://localhost:4200/notices')
        const noticesJson = await notices.json()
        setNotice(noticesJson)
    }

    useEffect(() => {
        load()
    }, [])


const AddBook = async (book) => {
    let tempId = Number(notebooks.length) + 1
    const data = {
        id: tempId,
        name: book,
        pages: []
    }

    const response = await fetch('http://localhost:4200/notebooks',
        {
             method: 'POST', // *GET, POST, PUT, DELETE, etc.
             headers:
                 {
                  'Content-Type': 'application/json'
                 },
             body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    await load()
}

  const AddNotice = (notice) => {
    let tempId = (parseInt(notices.length) + 1) + 'n'


    if(notice === "")  {
        setNotice([...notices, {name: 'notice ' + tempId, id: tempId}])
    }else {
        setNotice([...notices, {name: notice, id: tempId}])
    }
  }

  return (<HashRouter>
          <header>
              <h1><FileDoneOutlined /> Ainotebook</h1>
          </header>

          <div className="App">

              <MainMenu notebooks={notebooks}
                        AddBook={AddBook}
                        addingMode={addingMode}
                        setAddingMode={setAddingMode}
                        notices={notices}
                        addingNotice={addingNotice}
                        setAddingNoticeMode={setAddingNoticeMode}
                        AddNotice={AddNotice}
                  />

              <Route path="/notebook/:notebookId?/page/:pageId?" render={() => <Document/>}/>
          </div>
      </HashRouter>
  );
}

export default App;
