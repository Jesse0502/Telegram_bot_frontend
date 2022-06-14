import axios from "axios";
import root from "../root";

const saveCheckboxes = async (data: any, id: string) => {
  const res = await axios.post(
    `${root}/api/bots/saveCheckboxes?id=${id}`,
    {
      data,
    },
    {
      headers: {
        Autorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export default saveCheckboxes;
