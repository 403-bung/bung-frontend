import Modal from "react-modal";
import Title from "components/UI/Title";
import { deleteArticle } from "api";

interface CancleModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleNo?: number;
}

const customModalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 10,
  },
  content: {
    position: "absolute",
    width: "300px",
    height: "352px",
    top: "calc(50% - 176px)",
    left: "calc(50% - 150px)",
    backgroundColor: "white",
    padding: "40px 24px 28px 24px",
    transform: "translate(0%, 0%)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "72px",
  },
};

const CancleModal: React.FC<CancleModalProps> = ({
  isOpen,
  onClose,
  articleNo,
}) => {
  const handleDelete = async () => {
    if (articleNo) {
      const result = await deleteArticle(articleNo);
      if (result) {
        window.location.href = "/home";
      }
    }
  };

  return (
    <Modal isOpen={isOpen} style={customModalStyle} onRequestClose={onClose}>
      <div className="flex flex-col gap-2">
        <Title text="벙개를 나가시겠어요?" />
        <div className="flex flex-col items-center">
          <span className=" font-medium text-lg text-[#1f1f1f]">
            삭제하면 참여기록이 사라지고
          </span>
          <span className=" font-medium text-lg text-[#1f1f1f]">
            해당 벙개 참여도 불가능해요.
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-5">
        <button
          className="bg-[#4A25A9] w-full text-white text-base font-semibold py-4 rounded-[10px]"
          //   onClick={handleDelete}
        >
          나가기
        </button>
        <button onClick={onClose}>취소하기</button>
      </div>
    </Modal>
  );
};

export default CancleModal;
