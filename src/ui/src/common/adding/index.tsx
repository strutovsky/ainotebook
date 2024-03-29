import React, {useState} from 'react'
import MenuStyles from '../../components/Menu/menu.module.css';
import {BookOutlined, PlusOutlined} from '@ant-design/icons';
import {Input, Menu} from 'antd';

type ownProps = {
    placeholder: string,
    mode: "page" | "book",
    add: Function,
    nid?: string,
}

const Add: React.FC<ownProps> = ({placeholder, mode, add, nid}) => {
    const [value, setValue] = useState("")
    const [addingMode, setAddingMode] = useState(false)

    const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (<>
                {!addingMode && <div
                                   className={MenuStyles.tempNotebook}
                                   key={'add'}
                                   onClick={() => setAddingMode(true)}
                >
                    <PlusOutlined /> {placeholder}
                </div>}

                {addingMode && <Menu.Item
                                        className={MenuStyles.tempNotebook}
                                        key={'temp'} icon={<BookOutlined /> }
                                        disabled={true}
                >

                    <Input
                        placeholder={placeholder}
                        value={value}
                        autoFocus={true}
                        onChange={valueHandler}
                        onBlur={(e) => {
                            if(e.target.value !== ''){
                                if(mode === 'book'){
                                    add(value)
                                }

                                if(mode === 'page') {
                                    add(nid, value)
                                }
                                setValue('')
                                setAddingMode(false)
                            }
                            setAddingMode(false)
                        }}
                        onKeyPress={e => {
                            if(e.code === "Enter" && value === "") {
                                setValue('')
                                setAddingMode(false)
                            }else if(e.code === "Enter" && value !== "" ){
                                if(mode === 'book'){
                                    add(value)
                                }
                                if(mode === 'page') {
                                    add(nid, value)
                                }

                                setValue('')
                                setAddingMode(false)
                            }
                        }}

                        onKeyDown={e => {
                            if(e.code === "Escape"){
                                setValue('')
                                setAddingMode(false)
                            }
                        }}
                    />
                </Menu.Item>}
            </>)
}

export default Add