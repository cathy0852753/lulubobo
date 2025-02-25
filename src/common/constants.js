export class Permission {
  constructor(parameters) {

  }

  static IS_ADMIN = 2;
  static IS_USER = 1;

  checkIsAdmin (user) {
    return user?.permissions == Permission.IS_ADMIN;
  }
}



