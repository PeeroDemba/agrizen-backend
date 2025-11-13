import User from "../../database/models/user.js";

export class ProfileRepository {
  static async getProfile(id: string) {
    return await User.findByPk(id);
  }

  static async getFarmers(query: {
    farmerId?: string;
    page?: number;
    perPage?: number;
  }) {
    return await User.findAndCountAll({
      where: {
        ...(query.farmerId ? { farmerId: query.farmerId } : false),
        role: "farmer",
      },
      attributes: {
        exclude: ["password", "resetToken", "resetTokenExpiredAt", "deletedAt"],
      },
      limit: query.perPage ?? 10,
      offset: query.page ? (query.page - 1) * (query.perPage ?? 10) : 0,
    });
  }

  static async getFarmer(farmerId: string) {
    return await User.findByPk(farmerId, {
      attributes: {
        exclude: ["password", "resetToken", "resetTokenExpiredAt", "deletedAt"],
      },
    });
  }
}
