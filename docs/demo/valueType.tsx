import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export interface TableListItem {
  key: number;
  name: string;
  status: string;
  updatedAt: number;
  createdAt: number;
  progress: number;
  money: number;
  percent: number | string;
  createdAtRange: number[];
  code: string;
}
const tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 20; i += 1) {
  tableListDataSource.push({
    key: i,
    name: `TradeCode ${i}`,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    updatedAt: Date.now() - Math.floor(Math.random() * 1000),
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    createdAtRange: [
      Date.now() - Math.floor(Math.random() * 2000),
      Date.now() - Math.floor(Math.random() * 2000),
    ],
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    percent:
      Math.random() > 0.5
        ? ((i + 1) * 10 + Math.random()).toFixed(3)
        : -((i + 1) * 10 + Math.random()).toFixed(2),
    code: `const getData = async params => {
  const data = await getData(params);
  return { list: data.data, ...data };
};`,
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 72,
  },
  {
    title: 'border 序号',
    dataIndex: 'index',
    key: 'indexBorder',
    valueType: 'indexBorder',
    width: 72,
  },
  {
    title: '状态',
    dataIndex: 'status',
    initialValue: 'all',
    width: 100,
    ellipsis: true,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      close: { text: '关闭', status: 'Default' },
      running: { text: '运行中', status: 'Processing' },
      online: { text: '已上线', status: 'Success' },
      error: { text: '异常', status: 'Error' },
    },
  },
  {
    title: '代码',
    key: 'code',
    width: 120,
    dataIndex: 'code',
    valueType: 'code',
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [<a>操作</a>, <a>删除</a>],
  },
];

export default () => (
  <>
    <ProTable<TableListItem>
      columns={columns}
      request={(params) => {
        console.log(params);
        return Promise.resolve({
          total: 200,
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      headerTitle="日期类"
    />
    <ProTable<TableListItem>
      columns={[
        {
          title: '进度',
          key: 'progress',
          dataIndex: 'progress',
          valueType: (item) => ({
            type: 'progress',
            status: item.status !== 'error' ? 'active' : 'exception',
          }),
          width: 200,
        },
        {
          title: '金额',
          dataIndex: 'money',
          valueType: 'money',
          width: 150,
        },
        {
          title: '数字',
          dataIndex: 'money',
          key: 'digit',
          valueType: 'digit',
          width: 150,
        },
        {
          title: '百分比',
          key: 'percent',
          width: 120,
          dataIndex: 'percent',
          valueType: () => ({
            type: 'percent',
          }),
        },
      ]}
      request={() => {
        return Promise.resolve({
          total: 200,
          data: tableListDataSource,
          success: true,
        });
      }}
      rowKey="key"
      headerTitle="数字类"
    />
  </>
);
