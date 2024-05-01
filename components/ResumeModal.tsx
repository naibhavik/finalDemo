import React from "react";

interface Props {
  imageUrl: string;
  onClose: () => void;
}

const ResumeModal: React.FC<Props> = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default ResumeModal;
