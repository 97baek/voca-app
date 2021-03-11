// import { useState, useEffect } from "react";
import Word from "./Word";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Day() {
  const { day } = useParams();
  // const [words, setWords] = useState([]);
  const words = useFetch(`http://localhost:3001/words?day=${day}`);
  // useEffect(() => {
  //   fetch("http://localhost:3001/words")
  //     .then((res) => res.json())
  //     .then((data) => setWords(data.filter((word) => word.day === Number(day))));
  // }, []);

  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>'Loading...'</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Day;
