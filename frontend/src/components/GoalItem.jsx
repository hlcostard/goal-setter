import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import ModalDelete from "./ModalDelete";
import ModalForm from "./ModalForm";

function GoalItem({ goal }) {
  const [openModalForm, setOpenModalForm] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  return (
    <div className="goal flex">
      <div>{new Date(goal.createdAt).toLocaleString("en-GB")}</div>
      <h2>{goal.text}</h2>
      <div className="flex goal-footer">
        <button onClick={() => setOpenModalForm(true)} className="btn-icon">
          <FaEdit />
        </button>
        {openModalForm && (
          <ModalForm setOpenModalForm={setOpenModalForm} goal={goal} />
        )}
        <button onClick={() => setOpenModalDelete(true)} className="btn-icon">
          <FaTrash />
        </button>
        {openModalDelete && (
          <ModalDelete setOpenModalDelete={setOpenModalDelete} goal={goal} />
        )}
      </div>
    </div>
  );
}

export default GoalItem;
