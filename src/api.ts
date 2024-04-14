import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function joinParty(participantUserNo: number, articleNo: number) {
  axios
    .post(
      `${process.env.REACT_APP_API_URL}/party/join`,
      {
        participantUserNo,
        articleNo,
      },
      {
        headers: { Authorization: `Bearer ${cookies.get("id")}` },
      }
    )
    .then((response) => {
      console.log(response.data);
    });
}

export async function feedback() {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/users/${cookies.get("userNo")}/feedback`,
    {
      params: { userNo: cookies.get("userNo") },
      headers: { Authorization: `Bearer ${cookies.get("id")}` },
    }
  );

  return response.data;
}

export async function getArticle(articleNo: number) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/articles/${articleNo}`,
    {
      headers: { Authorization: `Bearer ${cookies.get("id")}` },
      params: { userNo: cookies.get("userNo"), articleNo: articleNo },
    }
  );

  return response.data;
}

export async function getUser(userNo: number) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/users/${userNo}/profile`,
    {
      headers: { Authorization: `Bearer ${cookies.get("id")}` },
    }
  );

  return response.data;
}

export async function deleteArticle(articleNo: number) {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}/articles/${articleNo}`,
    {
      headers: { Authorization: `Bearer ${cookies.get("id")}` },
    }
  );

  return response.data;
}

export async function changeAcceptence(
  state: string,
  articleNo: number,
  participantUserNo: number
) {
  await axios.put(
    `${process.env.REACT_APP_API_URL}/party/acceptence`,
    {
      state: state,
      articleNo: articleNo,
      participantUserNo: participantUserNo,
    },
    {
      headers: { Authorization: `Bearer ${cookies.get("id")}` },
    }
  );
}
