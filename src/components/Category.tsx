const categories = [
  "전체",
  "공동구매",
  "게임",
  "이벤트",
  "스터디",
  "자유",
  "해주세요",
  "아이돌",
];

export default function Category() {
  return (
    <div className="w-[375px] flex flex-nowrap overflow-hidden hover:overflow-x-scroll p-[10px]">
      <div className="flex items-center gap-10">
        {categories.map((category) => (
          <div
            key={category}
            className="px-2 py-[5px] font-normal font-base whitespace-nowrap"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
