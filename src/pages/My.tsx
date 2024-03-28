import Header from "../components/Header";
import NavBar from "../components/NavBar";
import StatusBar from "../components/StatusBar";

export default function My() {
  return (
    <>
      <div className="w-[375px] h-full min-h-screen bg-white flex flex-col items-center">
        <StatusBar />
        <Header />
        <NavBar />
      </div>
    </>
  );
}
