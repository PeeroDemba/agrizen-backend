import User from "../../database/models/user.js";

export class ProfileRepository {
  static async getProflie(id: string) {
    return await User.findByPk(id);
  }
}
