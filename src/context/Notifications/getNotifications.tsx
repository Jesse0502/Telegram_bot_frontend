import axios from "axios";
import root from "../root";

export interface getNotificationResponse {
  data: notificationInterface[];
  success: boolean;
}

interface who_posted {
  first_name: string;
  last_name: string;
  id: string | number;
}

export interface notificationInterface {
  id: string;
  name: string;
  who_posted: who_posted;
  source: string;
  lastUpdated: string;
  description: string;
  botId: string;
  media: any;
}

const getNotifications: () => any = async () => {
  try {
    let res = await axios.post(
      `${root}/api/notifications/getNotifications`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return { data: res.data.data, success: true };
  } catch (error: any) {
    return { data: [], success: false };
  }
};

export default getNotifications;
