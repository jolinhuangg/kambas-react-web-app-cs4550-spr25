import { useState } from "react";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((i) => i !== index));
  };
  return (
    <div
      id="wd-array-state-variables"
      className="mx-4 my-4"
      style={{ maxWidth: "200px" }}
    >
      <h2>Array State Variable</h2>
      <button onClick={addElement} className="btn btn-success mb-3">
        Add Element
      </button>
      <ul className="list-group">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between"
          >
            {" "}
            {item}
            <button
              onClick={() => deleteElement(index)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
