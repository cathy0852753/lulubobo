import { Table, Tag, Button, Input, Space, } from 'antd';
import { tableBody, tagOptions } from '../data/testData';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import './baseTable.css';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const BaseTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
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
            type="dashed"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            篩選
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
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      width: '5%',
    }, {
      title: '分類',
      dataIndex: 'sort',
      width: '12%',
      ...getColumnSearchProps('sort'),
    }, {
      title: '方式',
      dataIndex: 'way',
      width: '10%',
      ...getColumnSearchProps('way'),
    }, {
      title: '帳戶',
      dataIndex: 'account',
      width: '10%',
      ...getColumnSearchProps('account'),
    }, {
      title: '描述',
      dataIndex: 'description',
      width: '25%',
      ...getColumnSearchProps('description'),
    }, {
      title: '標籤',
      key: 'tag',
      dataIndex: 'tag',
      width: '15%',
      ...getColumnSearchProps('tag'),
      render: (_, { tag }) => (
        <>
          <Tag color='skyblue' key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </>
      ),
    }, {
      title: '日期',
      dataIndex: 'date',
      width: '10%',
    }, {
      title: '金額',
      dataIndex: 'expense',
      width: '15%',
    },
  ];
  const defaultFooter = () => 'Here is footer';
  return (
    <div>
      <Button style={{ float: 'right', marginBottom: 8 }}>新增</Button>
      <Table
        size={'small'}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        pagination={false}
        scroll={{
          y: 'calc(100vh - 300px)',
          x: 'calc(100vw - 300px)',
        }}
        columns={columns}
        dataSource={tableBody}
        footer={defaultFooter}
      />
    </div>
  );
};
export default BaseTable;