import { useHistory } from "react-router";
import useFetch from "../hooks/useFetch";

function CreateDay() {
  const days = useFetch("http://localhost:3001/days");
  const history = useHistory();
  const onClick = () => {
    fetch(`http://localhost:3001/days/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        day: days.length + 1,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("날짜가 추가되었습니다.");
        history.push(`/`);
      }
    });
  };

  return (
    <div>
      <h3>현재 일 수: {days.length}일</h3>
      <button onClick={onClick}>Day 추가</button>
    </div>
  );
}

export default CreateDay;
