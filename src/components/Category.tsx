import { Link, useLocation } from "react-router-dom";

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

const isActiveCategory = (categoryUrl: string, currentPath: string) => {
  if (categoryUrl === "home") {
    return currentPath === "/home";
  } else {
    return currentPath === `/home/${categoryUrl}`;
  }
};

export default function Category() {
  const location = useLocation();

  return (
    <div className="w-[375px] flex flex-nowrap overflow-hidden hover:overflow-x-scroll p-[10px]">
      <div className="flex items-center gap-10">
        {categories.map((category) => (
          <div className="flex flex-col" key={category.text}>
            <div
              className={`px-2 py-[5px] font-normal font-base whitespace-nowrap ${
                isActiveCategory(category.url, location.pathname)
                  ? "text-[#4A25A9] font-semibold"
                  : "text-[#595959]"
              }`}
            >
              <Link
                to={category.url === "home" ? "/home" : `/home/${category.url}`}
              >
                {category.text}
              </Link>
              <div
                className={`w-full h-px ${
                  isActiveCategory(category.url, location.pathname)
                    ? "bg-[#4A25A9]"
                    : ""
                } relative top-2`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
