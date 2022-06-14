import axios from "axios";
import root from "../root";

export interface SignupInterface {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  msg: string;
  success: boolean;
}

const Signup: (data: SignupInterface) => any = async (
  data: SignupInterface
) => {
  try {
    const res = await axios.post(`${root}/api/auth/signup`, { data });
    if (!res.data.data.includes("email already exist")) {
      return { msg: res.data.data, success: true };
    }
    return { msg: res.data.data, success: false };
  } catch (error: any) {
    return { msg: error.message, success: false };
  }
};

export default Signup;
