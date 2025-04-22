import React from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
import ContextMenu from "./ContextMenu"; // make sure path is correct

interface QuizControlButtonsProps {
  onDelete: () => void | Promise<void>;
}

const QuizControls: React.FC<QuizControlButtonsProps> = ({ onDelete }) => {
  return (
    <div className="d-flex align-items-center justify-content-end ms-auto gap-2">
      <GreenCheckmark />
      <ContextMenu onDelete={onDelete} />
    </div>
  );
};

export default QuizControls;