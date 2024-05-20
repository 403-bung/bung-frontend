import { useEffect } from "react";
import bung from "icons/bung.svg";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function Intro() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const id = cookies.get("id");
  useEffect(() => {
    setInterval(() => navigate("/login"), 3000);
  });
  // useEffect(() => {
  //   if (!id) {
  //     setInterval(() => navigate("/login"), 3000);
  //   }
  //   else {
  //     navigate("/home");
  //   }
  // }
  // );

  return (
    <div className="w-[375px] min-h-dvh bg-white flex flex-col justify-center items-center absolute top-0">
      <img src={bung} alt="bung" className="w-[185px]" />
    </div>
  );
}
