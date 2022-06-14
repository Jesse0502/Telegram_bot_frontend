import axios from "axios";
import root from "../root";

export interface LoginInterface {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: string;
  success: boolean;
}

const Login: (data: LoginInterface) => any = async (data: LoginInterface) => {
  try {
    let res = await axios.post(`${root}/api/auth/login`, { data });
    if (!res.data.data.includes("email is incorrect")) {
      return { data: res.data.data, success: true };
    }
    return { data: res.data.data, success: false };
  } catch (error: any) {
    return { data: error.message, success: false };
  }
};

export default Login;
