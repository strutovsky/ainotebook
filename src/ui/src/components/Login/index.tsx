import React from 'react';
import {Button, Form, Input} from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';

import Styled from './login.module.css'



export const LoginPage = () => {
    return <div className={Styled.wrap}>
                <div className={Styled.img}>

                </div>

                <div className={Styled.form}>
                    <h1>Ainotebook</h1>

                    <h3>Login</h3>
                    <Form
                        name="basic"
                        style={{'minWidth': '320px'}}
                        initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
           </div>
}