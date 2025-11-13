import { ErrorConstructor } from "../../utils/errors.js";
import { ProfileRepository } from "./profile.repository.js";

export class ProfileService {
  static async getProfile(id: string) {
    return await ProfileRepository.getProfile(id);
  }

  static async getFarmers(
    user: { id: string; role: "admin" | "farmer" },
    query: {
      farmerId?: string;
      page?: number;
      perPage?: number;
    }
  ) {
    if (user.role === "admin") {
      return await ProfileRepository.getFarmers(query);
    } else {
      throw new ErrorConstructor(
        "Access denied. Your role does not permit this action.",
        403
      );
    }
  }

  static async getFarmer(
    user: { id: string; role: "admin" | "farmer" },
    farmerId: string
  ) {
    if (user.role === "admin") {
      return await ProfileRepository.getFarmer(farmerId);
    } else {
      throw new ErrorConstructor(
        "Access denied. Your role does not permit this action.",
        403
      );
    }
  }
}
