import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const userNo = cookies.get("userNo");
const token = cookies.get("id");

export function joinParty(participantUserNo: number, articleNo: number) {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/party/join`,
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
