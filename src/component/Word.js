import React, { useState } from "react";

function Word({ word: w }) {
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false);
  const [isChecked, setIsChecked] = useState(word.isDone);

  const onToggleShow = () => {
    setIsShow(!isShow);
  };

  const onToggleDone = () => {
    // setIsChecked(!isChecked);
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        isDone: !isChecked,
      }),
    }).then((res) => {
      if (res.ok) {
        setIsChecked(!isChecked);
      }
    });
  };

  const del = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          setWord({ id: 0 });
        }
      });
    }
  };

  if (word.id === 0) {
    return null;
  }

  return (
    <tr className={isChecked === true ? "off" : ""}>
      <td>
        <input type="checkbox" onChange={onToggleDone} checked={isChecked} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={onToggleShow}>뜻 {isShow === true ? "숨기기" : "보기"}</button>
        <button onClick={del} className="btn_del">
          삭제
        </button>
      </td>
    </tr>
  );
}

export default Word;

// REST API
//
// Create: POST
// Read: GET
// Update: PUT
// Delete: DELETE
