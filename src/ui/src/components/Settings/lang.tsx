import { Radio } from 'antd';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setLang } from '../../redux/app-reducer';
import {AppStateType} from '../../redux/state';

export const LangSetting = () => {
    const value = useSelector((state: AppStateType) => state.app.data.lang)
    const dispatch = useDispatch()

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        color: '#fff',
        padding: '5px 20px'
    };

    return <Radio.Group onChange={e => dispatch(setLang(e.target.value))} value={value}>
                <Radio style={radioStyle} value={'ukr'}>
                    Ukr
                </Radio>
                <Radio style={radioStyle} value={'eng'}>
                    Eng
                </Radio>
            </Radio.Group>
}