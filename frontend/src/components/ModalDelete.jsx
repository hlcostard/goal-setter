import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function ModalDelete({ setOpenModalDelete, goal }) {
  const ref = useRef();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(deleteGoal(goal._id));
  };

  useEffect(() => {
    const checkIfClickeddOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModalDelete(false);
      }
    };
    document.addEventListener("click", checkIfClickeddOutside);

    return () => {
      document.removeEventListener("click", checkIfClickeddOutside);
    };
  }, [setOpenModalDelete]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modalBackground">
      <div className="modalContainer" ref={ref}>
        <div className="modalTitle">
          <h2>
            Are you sure you want to delete goal
            <span style={{ color: "red" }}> {goal.text}</span>
          </h2>
        </div>
        <div className="form-group">
          <form onSubmit={onSubmit}>
            <div className="flex modalFooter">
              <button
                className="btn btn-danger"
                onClick={() => setOpenModalDelete(false)}
              >
                Cancel
              </button>
              <button className="btn btn-sucess">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ModalDelete;
