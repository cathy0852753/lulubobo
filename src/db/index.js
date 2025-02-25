require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./connection');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

// 將 ALLOWED_ORIGINS 環境變數轉換為陣列
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

// CORS 設置
const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// 連接資料庫
const startServer = async () => {
  try {
    await connectToDb();
    console.log('Connected to database');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
    process.exit(1);
  }
};

startServer();

// 使用 body-parser 解析 JSON
app.use(express.json());

// 使用使用者路由
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});
