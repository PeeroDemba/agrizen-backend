import { ProfileRepository } from "./profile.repository.js";

export class ProfileService {
  static async getProfile(id: string) {
    return await ProfileRepository.getProflie(id);
  }
}
