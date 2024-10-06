const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('../connection');

const app = express();
app.use(express.json());

const corsOptions = {
  origin: [
    'http://localhost:3001',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// connect to the database
let db;

(async () => {
  try {
    await connectToDb();
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
      db = getDb();
    });
  } catch (err) {
    console.error('Unable to start the server', err);
    process.exit(1);
  }
})();

app.get('/user', async (req, res) => {
  const users = db.collection('users');
  const fieldName = await users
    .findOne()
    .then(user => {
      const fieldName = Object.keys(user);
      return fieldName;
    })
    .then(data => data);

  users
    .find()
    .limit(5)
    .toArray()
    .then(users => {
      const data = {
        fieldName: fieldName,
        users
      };
      return res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send('Error occurred');
    });
});

app.post('/user', async (req, res) => {
  const user = req.body;

  try {
    const userKeyCountCollection = db.collection('store_key');
    const userKeyCountArray = await userKeyCountCollection.find({ key_name: 'user_count' }).toArray();

    if (userKeyCountArray.length === 0) {
      return res.status(500).json({ isOk: 'N', errMsg: '未找到 store_key 中的鍵值' });
    }

    const userKeyCount = userKeyCountArray[0];
    console.log('userKeyCount:', userKeyCount);

    const usersCollection = db.collection('users');
    const sameUserEmailCount = await usersCollection.countDocuments({ email: user.email });

    if (sameUserEmailCount > 0) {
      return res.status(400).json({ isOk: 'N', errMsg: '信箱已被註冊' });
    }

    const newUserData = {
      email: user.email,
      user_id: parseInt(userKeyCount.key_value) + 1,
      user_name: user.name,
      password: user.password,
    };

    const insertResult = await usersCollection.insertOne(newUserData);

    if (insertResult.acknowledged) {
      await userKeyCountCollection.updateOne(
        { _id: new ObjectId(userKeyCount._id) },
        { $set: { key_value: String(parseInt(userKeyCount.key_value) + 1), } }
      );
      console.info('key_value 已更新');

      return res.status(201).json({ isOk: 'Y' });
    } else {
      return res.status(500).json({ isOk: 'N', errMsg: '新增使用者失敗' });
    }
  } catch (err) {
    console.error('發生錯誤:', err);
    return res.status(500).send('發生錯誤: ' + err.message);
  }
});

app.post('/user/login', async (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  const users = db.collection('users');
  const count = await users.countDocuments(({}, { email: email }));
  if (count === 0) {
    const response = { isOk: 'N', errMsg: '信箱未註冊' };
    return res.status(201).json(response);
  }

  users
    .find({ email: email })
    .forEach(user => {
      if (user.password !== password) {
        const response = { isOk: 'N', errMsg: '密碼錯誤' };
        return res.status(201).json(response);
      } else {
        const response = { isOk: 'Y', ...user };
        return res.status(201).json(response);
      }
    })
    .catch(err => {
      res.status(500).send('Error occurred');
    });
});