import Modal from "react-modal";
import Title from "components/UI/Title";
import { deleteArticle } from "api";

interface ModalDeleteConfirmProps {
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
    height: "280px",
    top: "calc(50% - 140px)",
    left: "calc(50% - 150px)",
    backgroundColor: "white",
    padding: "40px 24px 28px 24px",
    transform: "translate(0%, 0%)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

const ModalDeleteConfirm: React.FC<ModalDeleteConfirmProps> = ({
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
      <Title text={"벙개를 삭제하시겠어요?"} />
      <div className="w-full flex flex-col items-center gap-5">
        <button
          className="bg-[#4A25A9] w-full text-white text-base font-semibold py-5 rounded-[10px]"
          onClick={handleDelete}
        >
          삭제하기
        </button>
        <button onClick={onClose}>취소하기</button>
      </div>
    </Modal>
  );
};

export default ModalDeleteConfirm;
