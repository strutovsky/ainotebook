import React from 'react'
import {BookOutlined} from '@ant-design/icons'
import Styles from './choose.module.css'

export const ChooseNotebook = () => {
   return (<div className={Styles.wrap}>
               <BookOutlined />
               <h2>Please choose notebook in menu</h2>
            </div>)
}