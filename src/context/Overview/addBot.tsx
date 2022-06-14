import axios from "axios";
import root from "../root";

export interface addBotInterface {
  name: string;
  api_id: string;
  api_hash: string;
  password: string;
}

export interface addBotResponse {
  data: addBotInterface[];
  success: boolean;
  msg?: string;
}

const addBot: (data: addBotInterface) => any = async (
  data: addBotInterface
) => {
  try {
    const res = await axios.post(
      `${root}/api/addbot`,
      { data },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (res.data.data.includes("already")) {
      return { data: null, success: false, msg: res.data.data };
    }
    return {
      data: res.data.data,
      success: true,
      msg: "Bot added Successfully",
    };
  } catch (error: any) {
    return { data: null, success: false, msg: error.message };
  }
};

export default addBot;
