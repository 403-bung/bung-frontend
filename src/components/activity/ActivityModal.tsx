import Modal from "react-modal";
import Title from "components/UI/Title";
import { deleteArticle } from "api";

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleNo?: number;
  title: string;
  content1: string;
  content2?: string;
  actionFunc: React.MouseEventHandler;
  trueBtn: string;
  falseBtn: string;
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

const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  articleNo,
  title,
  content1,
  content2,
  actionFunc,
  trueBtn,
  falseBtn,
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
        <Title text={title} />
        <div className="flex flex-col items-center">
          <span className=" font-medium text-lg text-[#1f1f1f]">
            {content1}
          </span>
          <span className=" font-medium text-lg text-[#1f1f1f]">
            {content2}
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-5">
        <button
          className="bg-[#4A25A9] w-full text-white text-base font-semibold py-4 rounded-[10px]"
          onClick={actionFunc}
        >
          {trueBtn}
        </button>
        <button onClick={onClose}>{falseBtn}</button>
      </div>
    </Modal>
  );
};

export default ActivityModal;
