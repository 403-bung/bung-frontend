import Button from "../components/Button";
import left_arrow from "../icons/left_arrow.svg";
import Title from "../components/Title";
import Input from "../components/Input";

function NicknamePage() {
  return (
    <>
      <div className="w-[375px] h-full min-h-screen bg-white pt-[76px] pb-[52px] px-4 flex flex-col justify-between">
        <div>
          <img src={left_arrow} alt="이전으로" />
          <div className="flex flex-col mt-4 mb-7">
            <Title text={"마지막으로"} />
            <Title text={"닉네임을 적어주세요"} />
          </div>
          <Input innerText="닉네임을 입력해 주세요" />
        </div>
        <Button text={"다음"} />
      </div>
    </>
  );
}

export default NicknamePage;
