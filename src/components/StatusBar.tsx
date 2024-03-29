import location from "../icons/location.svg";
import signal from "../icons/Signal.svg";
import chain from "../icons/chain.svg";
import battery from "../icons/battery.svg";

export default function StatusBar() {
  return (
    <>
      <div className="w-full h-12 flex justify-around items-end ">
        <div className="flex justify-center px-[30px] py-3 gap-1">
          <span>9:41</span>
          <img src={location} alt="location" />
        </div>
        <div className="w-[160px] h-full"></div>
        <div className="flex  h-full px-[12px] py-3 gap-2">
          <img src={signal} alt="signal" />
          <img src={chain} alt="chain" />
          <img src={battery} alt="battery" />
        </div>
      </div>
    </>
  );
}
