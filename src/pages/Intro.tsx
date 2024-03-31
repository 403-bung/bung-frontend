import { useEffect } from "react";
import bung from "../icons/bung.svg";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const navigate = useNavigate();
  useEffect(() => {
    setInterval(() => navigate("/login"), 3000);
  });

  return (
    <div className="w-[375px] min-h-screen bg-white flex flex-col justify-center items-center absolute top-0">
      <img src={bung} alt="bung" className="w-[185px]" />
    </div>
  );
}
