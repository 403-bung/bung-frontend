import axios from "axios";
import { Cookies } from "react-cookie";

export const checkDraftArticle = async (navigate:any) => {
  const cookies = new Cookies()
  const token = cookies.get("id");
  const userNo = cookies.get("userNo");
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/draft`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { userNo: userNo },
  });
  if (response.data) {
    navigate("/draftModal");
    console.log("임시저장한 글이 있습니다.");
  } else {
    navigate("/wite");
  }
};