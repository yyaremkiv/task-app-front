import API from "../config/axios.config";

interface IUser {
  email: string;
  username: string;
  _id: string;
}

class UserService {
  static async getUser(): Promise<IUser> {
    return API.get("/user");
  }
}

export default UserService;
