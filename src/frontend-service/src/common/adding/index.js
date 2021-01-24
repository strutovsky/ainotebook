import React, {useEffect, useState} from 'react'
import MenuStyles from '../../components/Menu/menu.module.css';
import {BookOutlined, PlusOutlined} from '@ant-design/icons';
import {Input, Menu} from 'antd';

const Add = ({addingMode, setAddingMode, placeholder, add}) => {
    const [value, setValue] = useState("")

    const valueHandler = (e) => {
        setValue(e.target.value)
    }

    return (<>
                {!addingMode && <div className={MenuStyles.tempNoteboook}
                                   key={'add'}
                                   onClick={() => setAddingMode(true)}
                >
                    <PlusOutlined /> {placeholder}
                </div>}

                {addingMode && <Menu.Item className={MenuStyles.tempNoteboook}
                                          key={'temp'} icon={<BookOutlined /> }
                                          disabled={true}
                >

                    <Input
                        placeholder={placeholder}
                        value={value}
                        autoFocus={true}
                        onChange={valueHandler}
                        onBlur={(e) => {
                            setValue('')
                            add(e)
                        }}/>
                </Menu.Item>}
            </>)
}

export default Add