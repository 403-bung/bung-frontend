import axios from "axios";
import { SERVER_URL } from "./data/url";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const userNo = cookies.get("userNo");
const token = cookies.get("id");

export function joinParty(participantUserNo: number, articleNo: number) {
  axios
    .post(
      `${SERVER_URL}/party/join`,
      {
        participantUserNo,
        articleNo,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      console.log(response.data);
    });
}
