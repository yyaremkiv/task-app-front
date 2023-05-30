import API from "../config/axios.config";

class UserService {
  static async getUserById() {
    return API.get("/user");
  }
}

export default UserService;
