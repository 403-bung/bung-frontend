import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { text: "전체", url: "" },
  { text: "공동구매", url: "buy" },
  { text: "게임", url: "game" },
  { text: "이벤트", url: "event" },
  { text: "스터디", url: "study" },
  { text: "자유", url: "free" },
  { text: "해주세요", url: "do" },
  { text: "아이돌", url: "idol" },
];

export default function Category() {
  const [selectedUrl, setSelectedUrl] = useState("");

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
                to={`/home/${category.url}`}
                onClick={() => setSelectedUrl(category.url)}
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
