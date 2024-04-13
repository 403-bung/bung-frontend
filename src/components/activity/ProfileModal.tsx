import Modal from "react-modal";
import closeBtn from "icons/closeBtn.svg";
import MypageTab from "components/UI/MypageTab";
import ProfileBar from "components/mypage/ProfileBar";

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
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={profileModalStyle}>
        <div className="w-full pr-4 pt-5 pb-4 flex justify-end">
          <img src={closeBtn} alt="close" onClick={onClose} />
        </div>
        <ProfileBar userNo={userNo} />
        <MypageTab
          timelinePath={`/activity/${articleNo}/timeline`}
          mannerPath={`/activity/${articleNo}/manner`}
        />
      </Modal>
    </>
  );
}
