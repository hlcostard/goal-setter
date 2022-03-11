import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGoal } from "../features/goals/goalSlice";

function ModalForm({ setOpenModalForm, goal }) {
  const [newText, setNewText] = useState("");
  const ref = useRef();
  const dispatch = useDispatch();
  const { _id, text } = goal;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGoal({ id: _id, text: newText }));
    setNewText("");
  };

  useEffect(() => {
    const checkIfClickeddOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenModalForm(false);
      }
    };
    document.addEventListener("click", checkIfClickeddOutside);

    return () => {
      document.removeEventListener("click", checkIfClickeddOutside);
    };
  }, [setOpenModalForm]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modalBackground">
      <div className="modalContainer" ref={ref}>
        <div className="flex">
          <button className="btn btn-x" onClick={() => setOpenModalForm(false)}>
            X
          </button>
        </div>
        <div className="modalTitle">
          <h2>Updating goal</h2>
        </div>
        <div className="form-group">
          <form onSubmit={onSubmit}>
            <label htmlFor="text">Goal</label>
            <input
              type="text"
              name="text"
              id="text"
              value={newText}
              placeholder={text}
              onChange={(e) => setNewText(e.target.value)}
            />

            <div className="flex modalFooter">
              <button
                className="btn btn-danger"
                onClick={() => setOpenModalForm(false)}
              >
                Cancel
              </button>
              <button className="btn btn-sucess">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ModalForm;
