import React from 'react'
import {InfoCircleOutlined} from '@ant-design/icons'
import Styles from './error.module.css'

export const ErrorPage = () => {
   return (<div className={Styles.wrap}>
                <InfoCircleOutlined />
                <h2>Something wrong try to refresh page</h2>
                <button onClick={() => window.location.reload()}>Refresh</button>
            </div>)
}