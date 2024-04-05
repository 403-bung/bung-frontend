import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../data/url";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

const categories = [
  { text: "전체", url: "home" },
  { text: "공동구매", url: "group_buying" },
  { text: "게임", url: "game" },
  { text: "이벤트", url: "event" },
  { text: "스터디", url: "study" },
  { text: "자유", url: "free" },
  { text: "해주세요", url: "please" },
  { text: "아이돌", url: "idol" },
];

export default function Category() {
  const [selectedUrl, setSelectedUrl] = useState("home");
  const cookies = new Cookies();
  const token = cookies.get("id");

  async function getArticles(category: string, token: string) {
    const response = await axios.get(`${SERVER_URL}/articles`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        category: category === "home" ? "" : category.toUpperCase(),
        sortStrategy: "LATEST",
        size: 10,
      },
    });
    return response.data;
  }

  const { data } = useQuery({
    queryKey: [selectedUrl],
    queryFn: () => getArticles(selectedUrl, token),
  });
  useEffect(() => {
    console.log(selectedUrl);
  }, [selectedUrl]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-[375px] flex flex-nowrap overflow-hidden hover:overflow-x-scroll p-[10px]">
      <div className="flex items-center gap-10">
        {categories.map((category) => (
          <div className="flex flex-col" key={category.text}>
            <div
              className={`px-2 py-[5px] text-[#595959] font-normal font-base whitespace-nowrap ${
                selectedUrl === category.url && "text-[#4A25A9] font-semibold"
              }`}
            >
              <Link
                to={category.url === "home" ? "/home" : `/home/${category.url}`}
                onClick={() => {
                  console.log(category.url);
                  setSelectedUrl(category.url);
                }}
              >
                {category.text}
              </Link>
              {selectedUrl === category.url && (
                <div className="w-full h-px bg-[#4A25A9] relative top-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
