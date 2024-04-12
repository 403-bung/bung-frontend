import { Link } from "react-router-dom";

export default function NavButton({
  title,
  img,
  href,
}: {
  title: string;
  img: string;
  href: string;
}) {
  return (
    <Link to={href}>
      <div className="w-[119px] h-[68px] flex flex-col justify-center items-center gap-[5px]">
        <img src={img} alt="" />
        <span className=" text-[10px] font-normal">{title}</span>
      </div>
    </Link>
  );
}
