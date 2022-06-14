import axios from "axios";
import root from "../root";

export interface deleteBotResponse {
  data: string;
  success: boolean;
}

const deleteBot: (data: string) => any = async (data: string) => {
  console.log("{ data: { _id: data } }", { data: { _id: data } });
  try {
    const res = await axios.post(
      `${root}/api/bots/delete`,
      {
        data: { _id: data },
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return { data: res.data.data, success: true };
  } catch (error: any) {
    return { data: [], success: false };
  }
};

export default deleteBot;
