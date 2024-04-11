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

export async function feedback() {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/users/${userNo}/feedback`,
    {
      params: { userNo },
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
}

export async function getArticle(articleNo: string) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/articles/${articleNo}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { userNo: userNo, articleNo: articleNo },
    }
  );

  return response.data;
}

export async function getUser(userNo: number) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/users/${userNo}/profile`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
}

export async function deleteArticle(articleNo: number) {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}/articles/${articleNo}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
}
