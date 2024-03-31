import { Link } from "react-router-dom";
import alarm from "../icons/alarm.svg";
import bung from "../icons/bung.svg";
export default function Header() {
  return (
    <>
      <div className="w-full px-4 py-3 flex justify-between items-center">
        <Link to="/home">
          <img src={bung} alt="logo" />
        </Link>
        <img src={alarm} alt="alarm" />
      </div>
    </>
  );
}
