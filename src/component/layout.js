import React, { useEffect } from 'react';
import {
  AccountBookOutlined,
  UserOutlined,
  LogoutOutlined,
  SmileOutlined,
  RightOutlined,
  LeftOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Dropdown } from 'antd';
import { useAuth } from './provider';
import UserPage from './userPage';
import BaseTable from './baseTable';
import ManagePage from './managePage';
import { Permission } from '../common/constants';

const { Header, Content, Footer, Sider } = Layout;

const items = [{ icon: UserOutlined, label: '人員' }, { icon: AccountBookOutlined, label: '記帳' }, { icon: SettingOutlined, label: '管理' }].map(
  (item, index) => ({
    key: String(index + 1),
    icon: React.createElement(item.icon),
    label: item.label,
  }),
);

const dropdownItems = (user, logout) => {
  return [
    {
      key: '1',
      icon: React.createElement(UserOutlined),
      label: user,
    },
    {
      key: '2',
      label: '登出',
      icon: React.createElement(LogoutOutlined),
      onClick: () => logout()
    },
  ];
};


const PageLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [tab, setTab] = React.useState('1');
  const { logout, user } = useAuth();
  const [navItem, setNavItem] = React.useState([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const userPermission = new Permission();
    const isAdmin = userPermission.checkIsAdmin(user);
    const items = [
      { icon: UserOutlined, label: '人員', permission: Permission.IS_ADMIN },
      { icon: AccountBookOutlined, label: '記帳', permission: Permission.IS_USER },
      { icon: SettingOutlined, label: '管理', permission: Permission.IS_ADMIN }];
    console.log(user);
    setNavItem(
      items
        .filter(item =>
          isAdmin ? true : item.permission != Permission.IS_ADMIN
        )
        .map(
          (item, index) => ({
            key: String(index + 1),
            icon: React.createElement(item.icon),
            label: item.label,
          }),
        )
    );

  }, []);

  const showTab = () => {
    switch (tab) {
      case '1':
        return <UserPage />;
      case '2':
        return <BaseTable />;
      case '3':
        return <ManagePage />;
      default:
        break;
    }
  };

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
        <Menu mode="inline" defaultSelectedKeys={['1']} items={navItem} onClick={(e) => setTab(e.key)} />
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
            <Dropdown
              menu={{
                items: dropdownItems(user, logout),
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
              maxHeight: 'calc(100vh - 110px)',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {showTab()}
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer> */}
      </Layout>
    </Layout>
  );
};
export default PageLayout;