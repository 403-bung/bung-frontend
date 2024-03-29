import left_arrow from "../icons/left_arrow.svg";

type ButtonParams = {
  onClick?: () => void;
};

export default function GoBackBtn({ onClick }: ButtonParams) {
  return <img src={left_arrow} alt="이전으로" onClick={onClick} />;
}
