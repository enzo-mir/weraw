import { FormValues } from "../utils/types/login.type";

export default function fetchLog(datas: FormValues) {
  return fetch(process.env.API_URL! + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(datas),
  });
}
