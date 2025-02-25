import React, { useEffect, useRef, useState } from 'react';
import { Table, Button, Input, Space, Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { getUsersDataApi } from '../common/resource';
import { getUsersData } from '../common/fakeData';

const UserPage = () => {

  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const col = [
    { key: 'userId', fieldName: '使用者編號', width: 100, },
    { key: 'userName', fieldName: '使用者', width: 100, },
    { key: 'email', fieldName: '信箱', width: 100, },
    { key: 'password', fieldName: '密碼', width: 100, },
    { key: 'permissions', fieldName: '權限', width: 100, },
  ];

  const fetchUserData = async () => {
    const data = await getUsersDataApi() || getUsersData;
    console.log(data);
    const columns = col.map(col => ({
      key: col.key,
      title: col.fieldName,
      dataIndex: col.key,
      width: col.width,
      ...getColumnSearchProps(col.key),
    }));
    const users = data.users.map((user) => ({
      key: `${user._id}`,
      ...user
    }));
    setColumns(columns);
    setDataSource(users);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        key={dataIndex}
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          allowClear
          style={{
            width: '200',
            marginBottom: 8,
          }}
        />
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  return (
    <Table
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{ x: 'calc(100vw - 300px)', }}
    />

  );
};
export default UserPage;