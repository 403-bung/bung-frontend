import Modal from "react-modal";
import closeBtn from "icons/closeBtn.svg";
import MypageTab from "components/UI/MypageTab";
import ProfileBar from "components/mypage/ProfileBar";
import TimelineArea from "components/mypage/TimelineArea";
import { useMatch } from "react-router-dom";
import MannerArea from "components/mypage/MannerArea";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleNo?: number;
  userNo: number;
}

const profileModalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  content: {
    position: "absolute",
    width: "375px",
    height: "80%",
    top: "20%",
    left: "calc(50% - 375px / 2)",
    backgroundColor: "white",
    padding: "0px",
    transform: "translate(0%, 0%)",
    display: "flex",
    flexDirection: "column",
  },
};

export default function ProfileModal({
  isOpen,
  onClose,
  articleNo,
  userNo,
}: ProfileModalProps) {
  const timelineMatch = useMatch("/activity/:article/timeline");
  const manner = useMatch("/activity/:article/manner");

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={profileModalStyle}>
        <div className="w-full pr-4 pt-5 pb-4 flex justify-end">
          <img src={closeBtn} alt="close" onClick={onClose} />
        </div>
        <ProfileBar
          userNo={userNo}
          //   participantUserNo={userNo}
          //   partyNo={articleNo}
        />
        <MypageTab
          timelinePath={`/activity/${articleNo}/timeline`}
          mannerPath={`/activity/${articleNo}/manner`}
        />
        {timelineMatch && (
          <div className="overflow-y-auto">
            <TimelineArea userNo={userNo} />
          </div>
        )}
        {manner && (
          <div className=" overflow-hidden">
            {" "}
            <MannerArea />
          </div>
        )}
      </Modal>
    </>
  );
}
