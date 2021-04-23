import React, {useState} from 'react';
import {Button, Form, Input} from 'antd';
import Styled from './login.module.css'
import {useDispatch, useSelector} from 'react-redux';
import { getAppPendingSelector } from '../../redux/selectors/app-selector';
import {loginThunk, singUpThunk} from '../../redux/app-reducer';



export const LoginPage = () => {
    const [mode, setMode] = useState<'login'|'signup'>('login')
    const pending = useSelector(getAppPendingSelector)

    const dispatch = useDispatch()

    const onFinish = (data: {username?: string, password: string, email: string}) => {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)


        if(mode === 'signup' && data.username){
            formData.append('name', data.username)
            dispatch(singUpThunk(formData))
        }

        if(mode === 'login'){
            dispatch(loginThunk(formData))
        }
    }


    return <div className={Styled.wrap}>
                <div className={Styled.img}>

                </div>

                <div className={Styled.form}>
                    <h1>Ainotebook/{mode}</h1>

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout={'vertical'}
                        // onFinishFailed={onFinishFailed}
                    >
                        {mode === 'signup' && <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>}

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {required: true, message: 'Please input your email!' },
                                {pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Write correct email!'}
                                ]}

                        >
                            <Input type={'email'} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" disabled={pending}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>


                    {mode === 'login' && <div className={Styled.linkToSingUp}
                         onClick={() => setMode('signup')}>
                        Doesn't have account ? <br/>Click to sing up
                    </div>}

                    {mode === 'signup' && <div className={Styled.linkToSingUp}
                         onClick={() => setMode('login')}>
                        Already have account ? <br/>Click to login
                    </div>}
                </div>
           </div>
}