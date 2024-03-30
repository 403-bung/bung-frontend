import ContentCard from "./ContentCard";

export default function ContentArea() {
  return (
    <>
      <div className="w-full h-full bg-[#fbfbfb] px-4 overflow-y-auto scrollbar-hide pb-[96px]">
        <div className="w-full flex flex-col gap-4">
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
        </div>
      </div>
    </>
  );
}
