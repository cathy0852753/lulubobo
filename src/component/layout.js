import React from 'react';
import {
  AccountBookOutlined,
  UserOutlined,
  SmileOutlined,
  RightOutlined,
  LeftOutlined,
  FrownOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Dropdown } from 'antd';
import { useAuth } from './provider';
import UserPage from './userPage';
const { Header, Content, Footer, Sider } = Layout;

const items = [{ icon: UserOutlined, label: '人員' }, { icon: AccountBookOutlined, label: '記帳' }].map(
  (item, index) => ({
    key: String(index + 1),
    icon: React.createElement(item.icon),
    label: item.label,
  }),
);


const PageLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { logout } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout>
      <Sider
        style={{ height: '100vh', borderRight: '1px solid rgba(5, 5, 5, 0.06)' }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
      >
        <div className="demo-logo-vertical" />
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            margin: '5px 0px',
            width: '100%',
            height: 30,
          }}
        />
        <Menu mode="inline" defaultSelectedKeys={['1']} items={items} onClick={(e) => console.log(e)} />
      </Sider>
      <Layout>
        <Header
          style={{
            height: 40,
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div style={{ margin: '5px', float: 'right', display: 'flex' }}>
            <FrownOutlined style={{ width: 18, fontSize: 16 }} />

            <Dropdown
              menu={{
                items: [{
                  key: '1',
                  label: '登出',
                  onClick: () => logout()
                }],
              }}
              placement="bottomRight"
            >
              <Button type="text" icon={<SmileOutlined />} />
            </Dropdown>
          </div>

        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              maxHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <UserPage />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};
export default PageLayout;