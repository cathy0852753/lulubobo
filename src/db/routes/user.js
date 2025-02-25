const express = require('express');
const { ObjectId } = require('mongodb');
const { getDb } = require('../connection');
const { User } = require('../modal/modal');

const bcrypt = require('bcrypt');

const router = express.Router();

//所有使用者
router.get('/users', async (req, res) => {
  const db = getDb();
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

//單一使用者
router.get('/user/:userKey', async (req, res) => {
  const db = getDb();
  const users = db.collection('users');
  try {
    const userKey = req.params.userKey;

    const user = await users.findOne({ userId: parseInt(userKey) }); // 假設 user_id 是數字

    if (!user) {
      return res.status(404).json({ isOk: 'N', errMsg: '使用者未找到' });
    }

    return res.status(200).json({ isOk: 'Y', user });
  } catch (err) {
    console.error('發生錯誤:', err);
    return res.status(500).json({ isOk: 'N', errMsg: '發生錯誤: ' + err.message });
  }
});

//註冊
router.post('/user', async (req, res) => {
  const user = req.body;
  try {
    const db = getDb();
    const userKeyCountCollection = db.collection('store_key');
    const userKeyCountArray = await userKeyCountCollection.find({ key_name: 'user_count' }).toArray();

    if (userKeyCountArray.length === 0) {
      return res.status(500).json({ isOk: 'N', errMsg: '未找到 store_key 中的鍵值' });
    }

    const userKeyCount = userKeyCountArray[0];

    const usersCollection = db.collection('users');
    const sameUserEmailCount = await usersCollection.countDocuments({ email: user.email });

    if (sameUserEmailCount > 0) {
      return res.status(400).json({ isOk: 'N', errMsg: '信箱已被註冊' });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const user_id = parseInt(userKeyCount.key_value) + 1;

    const newUserData = new User(user.email, user_id, user.name, hashedPassword, Date.now());
    const insertResult = await usersCollection.insertOne(newUserData);

    if (insertResult.acknowledged) {
      await userKeyCountCollection.updateOne(
        { _id: new ObjectId(userKeyCount._id) },
        { $set: { key_value: String(user_id), } }
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

router.post('/user/login', async (req, res) => {
  const db = getDb();
  const user = req.body;
  const email = user.email;
  const password = user.password;
  const users = db.collection('users');
  const count = await users.countDocuments({ email: email });
  if (count === 0) {
    const response = { isOk: 'N', errMsg: '信箱未註冊' };
    return res.status(201).json(response);
  }

  users
    .find({ email: email })
    .forEach(user => {
      if (bcrypt.compareSync(user.password, password)) {
        const response = { isOk: 'N', errMsg: '密碼錯誤' };
        return res.status(201).json(response);
      } else {
        const response = { isOk: 'Y', user: user };
        return res.status(201).json(response);
      }
    })
    .catch(err => {
      res.status(500).send('Error occurred');
    });
});

module.exports = router; // 確保正確導出