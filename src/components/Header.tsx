import { Link } from "react-router-dom";
import alarm from "../icons/alarm.svg";
export default function Header() {
  return (
    <>
      <div className="w-full px-4 py-3 flex justify-between">
        <Link to="/home">
          <div className="w-[78px] h-8 bg-[#c7bbe4]"></div>
        </Link>
        <img src={alarm} alt="alarm" />
      </div>
    </>
  );
}
