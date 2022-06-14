import axios from "axios";
import root from "../root";

export interface botInterface {
  _id: string;
  name: string;
  owner: string;
  api_id: string;
  api_hash: string;
  password: string;
  status: string;
  updatedAt: string;
  groups: botGroupInterface[];
  keywords: string[];
  scanGroups: botGroupInterface[];
  createdAt: string;
}

export interface botGroupInterface {
  id: string;
  name: string;
}

export interface getBotsResponse {
  data: botInterface[];
  success: boolean;
}

const getBots: () => any = async () => {
  try {
    const res = await axios.post(
      `${root}/api/bots/getBots`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return { data: res.data.data, success: true };
  } catch (error: any) {
    return { data: [], success: false };
  }
};

export default getBots;
