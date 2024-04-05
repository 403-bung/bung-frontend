import { useQuery, useQueryClient } from "@tanstack/react-query";
import ContentCard, { ContentCardProps } from "./ContentCard";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

export default function ContentArea() {
  const location = useLocation();

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

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: [category] });

  const { data, isLoading } = useQuery<ContentCardProps[]>({
    queryKey: [category],
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <div className="w-full h-full bg-[#fbfbfb] px-4 overflow-y-auto scrollbar-hide pb-[96px]">
        <div className="w-full flex flex-col gap-4">
          {!isLoading &&
            data?.map((element, index) => (
              <ContentCard key={index} {...element} />
            ))}
        </div>
      </div>
    </>
  );
}
