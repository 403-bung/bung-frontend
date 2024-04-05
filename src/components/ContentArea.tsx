import { useQuery } from "@tanstack/react-query";
import ContentCard, { ContentCardProps } from "./ContentCard";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../data/url";
import axios from "axios";
import { Cookies } from "react-cookie";

export default function ContentArea() {
  const location = useLocation();
  const cookies = new Cookies();
  const token = cookies.get("id");

  const [category, setCategory] = useState(
    location.pathname === "/home"
      ? "home"
      : location.pathname.replace("/home/", "")
  );

  useEffect(() => {
    setCategory(
      location.pathname === "/home"
        ? "home"
        : location.pathname.replace("/home/", "")
    );
  }, [location.pathname]);

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

  const { data, isLoading } = useQuery<ContentCardProps[]>({
    queryKey: [category],
    queryFn: async () => await getArticles(category, token),
  });

  return (
    <>
      <div className="w-full h-full bg-[#fbfbfb] px-4 overflow-y-auto scrollbar-hide pb-[96px]">
        <div className="w-full flex flex-col gap-4">
          {isLoading ? (
            <p>로딩중</p>
          ) : (
            data?.map((element, index) => (
              <ContentCard key={index} {...element} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
