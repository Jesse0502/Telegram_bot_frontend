import axios from "axios";
import root from "../root";
import { botInterface } from "./getBots";

export interface updateBotResponse {
  data: string;
  success: boolean;
}

const updateBot: (data: botInterface, id: string) => any = async (
  data: botInterface,
  id: string
) => {
  try {
    const res = await axios.post(
      `${root}/api/bots/update?id=${id}`,
      {
        data,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return { data: res.data.data, success: true };
  } catch (error: any) {
    return { data: error.message, success: false };
  }
};

export default updateBot;
