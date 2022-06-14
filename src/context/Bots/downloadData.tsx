import axios from "axios";
import { CatchClause } from "typescript";
import root from "../root";

export interface downloadDataResponse {
  msg?: string;
  success: boolean;
}

const downloadData = async (data: any, id: string) => {
  return await fetch(`${root}/api/bots/download?id=${id}`, {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        response
          .blob()
          .then((blob) => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = `${id}.zip`;
            a.click();
            return { success: true };
          })
          .catch((err) => {
            return { success: false, msg: err.message };
          });
      } else {
        return { success: false, msg: response.statusText };
      }
    })
    .catch((error) => {
      console.log(error);
      return { success: false, msg: error.message };
    });
};

export default downloadData;
