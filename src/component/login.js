import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './provider';
import { postUserLogin, postAddUser } from '../common/resource';
import { message, Button, Form, Input, Space } from 'antd';

const LoginPage = ({ type }) => {
  const [formInput, setFormInput] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (type === 'register') {
      setFormInput(['email', 'name', 'userName', 'password', 'password2']);
    } else {
      setFormInput(['email', 'password']);
    }
  }, [type]);

  const handleLogin = async (values) => {
    const { email, password } = values;
    try {
      const result = await postUserLogin({ email, password });
      if (result.isOk === 'Y') {
        login(result.user_name);
        navigate('/');
        form.resetFields();
      } else {
        message.error(result.errMsg);
      }
    } catch (err) {
      console.error('Login Error:', err);
      message.error('登入失敗，請稍後再嘗試');
    }
  };

  const handleRegister = async (values) => {
    try {
      const result = await postAddUser(values);
      if (result.isOk === 'Y') {
        navigate('/login');
        form.resetFields();
      } else {
        message.error(result.errMsg);
      }
    } catch (err) {
      console.error('Register Error:', err);
      message.error('註冊失敗，請稍後再嘗試');
    }
  };

  const formLayout = {
    name: 'login',
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    autoComplete: 'off',
    onFinish: type !== 'register' ? handleLogin : handleRegister,
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      top: '30vh',
    },
    formWrapper: {
      border: '1px solid lightgray',
      borderRadius: 8,
      padding: 10,
      width: 400,
      height: 350,
      position: 'relative',
    },
    buttonGroup: {
      position: 'absolute',
      bottom: 20,
      left: '35%',
    },
  };

  const getFormItem = (name) => {
    switch (name) {
      case 'email':
        return (
          <Form.Item
            key="email"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        );
      case 'userName':
        return (
          <Form.Item
            key="userName"
            label="名稱"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your userName!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        );
      case 'password':
        return (
          <Form.Item
            key={name}
            label="密碼"
            name={name}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        );
      case 'password2':
        return (
          <Form.Item
            key={name}
            label="確認密碼"
            name={name}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2>{type === 'register' ? '註冊' : '登入'}</h2>
        <Form {...formLayout}>
          {formInput.map((input) => getFormItem(input))}
          <div style={styles.buttonGroup}>
            <Space>
              <Button type="primary" htmlType="submit">
                {type === 'register' ? '註冊' : '登入'}
              </Button>
              {type !== 'register' && (
                <Button type="default" onClick={() => navigate('/register')}>
                  註冊
                </Button>
              )}
              {type === 'register' && (
                <Button type="default" onClick={() => navigate('/login')}>
                  取消
                </Button>
              )}
            </Space>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
