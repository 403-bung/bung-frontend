import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export type UserParticipationHistories = {
  userNo: number;
  totalCount: number;
  participationHistories: ParticipationHistories[];
};

type ParticipationHistories = {
  articleNo: number;
  name: string; // 구인글제목
  content: string; //구인글내용
  category: string;
  status: string;
  currentUserCount: number;
  maxUserCount: number;
  recruitingStartTime: string;
  recruitingEndTime: string;
  partyStartTime: string;
};

export type Feedback = {
  userNo: number;
  feedbackSize: number;
  feedbackTags: UserFeedbackTagResponse[];
  rate: number;
};

type UserFeedbackTagResponse = {
  tag: Tag;
  positive: boolean;
  title: string;
  count: number;
};

export enum Tag {
  KINDNESS = "KINDNESS",
  EFFORT = "EFFORT",
  TIME_KEEPER = "TIME_KEEPER",
  LATER = "LATER",
  NOT_EFFORT = "NOT_EFFORT",
  BAD_ATTITUDE = "BAD_ATTITUDE",
}

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

export async function feedback(userNo: number) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/users/${userNo}/feedback`,
    {
      params: { userNo },
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

export async function changeArticleStatus(status: string, articleNo: number) {
  await axios.put(
    `${process.env.REACT_APP_API_URL}/articles/${articleNo}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${cookies.get("id")}` },
    }
  );
}

export async function getPartyHistory(userNo: number) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/users/${userNo}/party-histories`,
    {
      headers: { Authorization: `Bearer ${cookies.get("id")}` },
      params: { userNo: userNo },
    }
  );

  return response.data;
}
