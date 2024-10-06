export const tableBody = [
  { key: 1, item: 0, transfer: false, sort: '薪資', way: '轉帳', account: '台新銀行', description: null, tag: '美金', date: '2023-01-19', expense: 1234, },
  { key: 2, item: 1, transfer: false, sort: '美容美髮', way: '信用卡', account: '兆豐商銀', description: null, tag: '飲料', date: '2023-02-19', expense: 5678, },
  { key: 3, item: 0, transfer: false, sort: '回饋', way: '轉帳', account: '永豐銀行', description: null, tag: '美金', date: '2023-03-19', expense: 7535, },
  { key: 4, item: 0, transfer: false, sort: '利息所得', way: '轉帳', account: '台新銀行', description: null, tag: '飲料', date: '2023-04-19', expense: 6245, },
  { key: 5, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '美金', date: '2023-03-19', expense: 2452, },
  { key: 6, item: 1, transfer: false, sort: '美容美髮', way: '信用卡', account: '兆豐商銀', description: null, tag: '朋友聚餐', date: '2023-03-19', expense: 6473, },
  { key: 7, item: 0, transfer: false, sort: '中獎', way: '轉帳', account: '第一銀行', description: null, tag: '朋友聚餐', date: '2023-03-19', expense: 2452, },
  { key: 8, item: 0, transfer: false, sort: '獎金', way: '轉帳', account: '聯邦銀行', description: null, tag: '嚕嚕', date: '2023-04-19', expense: 7457, },
  { key: 9, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '嚕嚕', date: '2023-05-19', expense: 13142, },
  { key: 10, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '台新銀行', description: null, tag: '嚕嚕', date: '2023-08-19', expense: 67867, },
  { key: 11, item: 1, transfer: false, sort: '美容美髮', way: '信用卡', account: '兆豐商銀', description: null, tag: '飲料', date: '2023-04-19', expense: 5576, },
  { key: 12, item: 0, transfer: false, sort: '外幣買賣', way: '轉帳', account: '土地銀行', description: null, tag: '油費', date: '2023-03-19', expense: 7846, },
  { key: 13, item: 0, transfer: false, sort: '外幣買賣', way: '轉帳', account: '華南銀行', description: null, tag: '同事聚餐', date: '2023-04-19', expense: 345, },
  { key: 14, item: 1, transfer: false, sort: '服飾', way: '轉帳', account: '王道銀行', description: null, tag: '朋友聚餐', date: '2023-05-19', expense: 2627, },
  { key: 15, item: 1, transfer: false, sort: '服飾', way: '轉帳', account: '連線銀行', description: null, tag: '同事聚餐', date: '2023-05-19', expense: 9579, },
  { key: 16, item: 1, transfer: false, sort: '服飾', way: '現金', account: '現金', description: null, tag: '油費', date: '2023-05-19', expense: 2358, },
  { key: 17, item: 0, transfer: false, sort: '回饋', way: '現金', account: '現金', description: null, tag: '同事聚餐', date: '2023-05-19', expense: 4748, },
  { key: 18, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '王道銀行', description: null, tag: '飲料', date: '2023-05-19', expense: 12412, },
  { key: 19, item: 0, transfer: false, sort: '回饋', way: '轉帳', account: '玉山銀行', description: null, tag: '油費', date: '2023-05-19', expense: 23423, },
  { key: 20, item: 1, transfer: true, sort: '電子票證加值', way: '轉帳', account: '王道銀行', description: null, tag: '同事聚餐', date: '2023-07-19', expense: 124, },
];

export const account = [
  { value: '1', label: '現金', way: ['Cash'] },
  { value: '008', label: '華南銀行', way: ['Credit card', 'Transfer'] },
  { value: '005', label: '土地銀行', way: ['Transfer'] },
  { value: '007', label: '第一銀行', way: ['Credit card', 'Transfer'] },
  { value: '017', label: '兆豐商銀', way: ['Credit card', 'Transfer'] },
  { value: '803', label: '聯邦銀行', way: ['Transfer'] },
  { value: '808', label: '玉山銀行', way: ['Credit card', 'Transfer'] },
  { value: '812', label: '台新銀行', way: ['Credit card', 'Transfer'] },
  { value: '824', label: '連線銀行', way: ['Credit card', 'Transfer'] },
];

export const way = [
  { value: 'Cash', label: '現金' },
  { value: 'Credit card', label: '信用卡' },
  { value: 'Transfer', label: '轉帳' }
];

export const tagOptions = [
  { value: '嚕嚕', label: '嚕嚕', hidden: false, color: 'orange' },
  { value: '小波', label: '小波', hidden: false, color: 'orange' },
  { value: '朋友聚餐', label: '朋友聚餐', hidden: false, color: 'brown' },
  { value: '同事聚餐', label: '同事聚餐', hidden: false, color: 'brown' },
  { value: '公司聚餐', label: '公司聚餐', hidden: false, color: 'brown' },
  { value: '聚餐', label: '聚餐', hidden: false, color: 'brown' },
  { value: '美金', label: '美金', hidden: false, color: 'red' },
  { value: '油費', label: '油費', hidden: false, color: 'blue' },
  { value: '飲料', label: '飲料', hidden: false, color: 'brown' },
];

export const sortE = [
  { value: '1', label: '美容美髮', transfer: false, item: 1, },
  { value: '2', label: '購物', transfer: false, item: 1, },
  { value: '3', label: '交通', transfer: false, item: 1, },
  { value: '4', label: '飲食', transfer: false, item: 1, },
  { value: '5', label: '服飾', transfer: false, item: 1, },
  { value: '6', label: '網路費', transfer: false, item: 1, },
  { value: '7', label: '帳戶戶轉', transfer: true, item: 1, },
  { value: '8', label: '電子票證加值', transfer: true, item: 1, },
  { value: '9', label: '信用卡費', transfer: true, item: 1, },
  { value: '10', label: '外幣買賣', transfer: true, item: 1, },
  { value: '11', label: '寵物', transfer: false, item: 1, },
];
export const sortI = [
  { value: '1', label: '薪資', transfer: false, item: 0, },
  { value: '2', label: '獎金', transfer: false, item: 0, },
  { value: '3', label: '中獎', transfer: false, item: 0, },
  { value: '4', label: '回饋', transfer: false, item: 0, },
  { value: '5', label: '利息所得', transfer: false, item: 0, },
  { value: '6', label: '帳戶戶轉', transfer: true, item: 0, },
  { value: '7', label: '外幣買賣', transfer: true, item: 0, },
  { value: '8', label: '定存到期', transfer: true, item: 0, },
];
