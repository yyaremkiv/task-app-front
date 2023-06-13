import API from "../config/axios.config";
import { AxiosResponse } from "axios";
import { ISigninArg, ISignupArg } from "../Interfaces/DataTypes";

interface IAuthResponse {
  data: any;
}

class AuthService {
  static async signup(request: ISignupArg): Promise<IAuthResponse> {
    const { username, email, password } = request;
    return API.post<IAuthResponse>("/auth/signup", {
      username,
      email,
      password,
    });
  }

  static async signin(request: ISigninArg): Promise<IAuthResponse> {
    const { email, password } = request;
    return API.post<IAuthResponse>("/auth/signin", { email, password });
  }

  static async logout(): Promise<AxiosResponse<void>> {
    return API.get<void>("/auth/logout");
  }

  static async refresh(): Promise<IAuthResponse> {
    return API.get<IAuthResponse>("/auth/refresh", { withCredentials: true });
  }
}

export default AuthService;
