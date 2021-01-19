import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {FileDoneOutlined} from '@ant-design/icons';

import MainMenu from './components/Menu';
import React, {useState} from 'react';
import Document from './components/Document';

const temp = [
  {name: 'Soroka', id: '1'},
  {name: 'Novitskiy', id: '2'}
]

const noticesTemp = [
    {name: 'Soroka page', id: '1n'},
    {name: 'Novitskiy page', id: '2n'}
]

function App() {
  const [notebooks, setNotebooks] = useState(temp)
  const [notices, setNotice] = useState(noticesTemp)

  const [addingMode, setAddingMode] = useState(false)
  const [addingNotice, setAddingNoticeMode] = useState(false)

  const AddBook = (book) => {
    let tempId = Number(notebooks.length) + 1

    if(book === "")  {
        setNotebooks([...notebooks, {name: 'Book ' + tempId, id: tempId}])
    }else {
        setNotebooks([...notebooks, {name: book, id: tempId}])
    }
  }

  const AddNotice = (notice) => {
    let tempId = (parseInt(notices.length) + 1) + 'n'

    console.log(tempId)

    if(notice === "")  {
        setNotice([...notices, {name: 'notice ' + tempId, id: tempId}])
    }else {
        setNotice([...notices, {name: notice, id: tempId}])
    }
  }

  return (<>
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

              <Document/>
          </div>
      </>
  );
}

export default App;
