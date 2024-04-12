import { useQuery } from "@tanstack/react-query";
import ContentCard, { ContentCardProps } from "./ContentCard";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
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
  const [sortBy, setSortBy] = useState<string>("CLOSE_TO_FINISH");

  async function getArticles(category: string, sortBy: string) {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/articles`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          category: category === "home" ? "" : category.toUpperCase(),
          sortStrategy: sortBy,
          size: 10,
        },
      }
    );
    return response.data;
  }
  const { data, isLoading } = useQuery<ContentCardProps[]>({
    queryKey: [category, sortBy],
    queryFn: async () => await getArticles(category, sortBy),
  });

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
  };

  return (
    <>
      <div className="flex w-full justify-end bg-[#fbfbfb] pt-5 pb-4 px-4">
        <select
          className="bg-transparent font-normal text-[14px]"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="CLOSE_TO_FINISH">마감순</option>
          <option value="POPULAR">인기순</option>
          <option value="LATEST">최신순</option>
        </select>
      </div>
      <div className="w-full h-full bg-[#fbfbfb] px-4 overflow-y-auto scrollbar-hide pb-[96px]">
        <div className="w-full flex flex-col gap-4">
          {isLoading ? (
            <p>로딩중</p>
          ) : (
            data?.map((element, index) => (
              <ContentCard key={index} {...element} />
            ))
          )}
          {data?.length === 0 && <div>아직 작성된 글이 없어요</div>}
        </div>
      </div>
    </>
  );
}
