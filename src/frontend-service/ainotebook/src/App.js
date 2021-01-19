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

function App() {
  const [notebooks, setNotebooks] = useState(temp)
  const [addingMode, setAddingMode] = useState(false)

  const AddBook = (book) => {
    setNotebooks([...notebooks, {name: book, id: notebooks.length + 1}])
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
                  />

              <Document/>
          </div>
      </>
  );
}

export default App;
