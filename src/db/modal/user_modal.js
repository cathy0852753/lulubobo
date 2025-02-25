class User {
  constructor(email, userId, userName, password, created_at) {
    this.email = email;
    this.userId = userId;
    this.userName = userName;
    this.password = password;
    this.createdAt = created_at;
  }

  // 方法來顯示使用者資料
  displayInfo () {
    console.log(`User: ${this.userName}, Email: ${this.email}`);
  }

  // 驗證密碼
  validatePassword (inputPassword) {
    return this.password === inputPassword;
  }
}

module.exports = User;
