import React from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
import ContextMenu from "./ContextMenu"; // make sure path is correct

interface QuizControlButtonsProps {
  onDelete: () => void | Promise<void>;
  onPublish: () => void | Promise<void>;
  published: boolean;
  qid: string;
}

const QuizControls: React.FC<QuizControlButtonsProps> = ({
  onDelete,
  onPublish,
  published,
  qid,
}) => {
  return (
    <div className="d-flex align-items-center justify-content-end ms-auto gap-2">
      <div style={{ opacity: published ? 1 : 0.5 }}>
        <GreenCheckmark />
      </div>
      <ContextMenu onDelete={onDelete} onPublish={onPublish} qid={qid} />
    </div>
  );
};

export default QuizControls;
