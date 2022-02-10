import { useState, useEffect } from "react";

const Test = () => {
  const [toDo, setTodo] = useState([ {
  	"id": 0,
    "title": "pick up laundry",
    "done": false
  },
  {
  	"id": 1,
    "title": "pick up thai food",
    "done": true
  }
  ]);

  // useEffect(() => {
  //   fetch("myurl")
  //     .then((response) => response.json())
  //     .then((data) => setTodo(data));
  // }, []);




  return (
    <>
      <ul>
        {toDo.map((obj) => (
          <li style={ (obj.done)? {  textDecoration: "line-through", color: "gray"} : {}} key={obj.id}>{obj.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Test;
