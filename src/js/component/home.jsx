import React, { useEffect, useState } from "react";

const Home = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/dariel")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setList(result);
      })
      .catch((error) => console.log(error));
  };

  const addTask = (myTask) => {
    var newList = [...list, { label: myTask, done: false }];
    fetch("https://assets.breatheco.de/apis/fake/todos/user/dariel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newList),
      redirect: "follow",
    })
      .then((response) => {
        response.status === 200 ? setList(newList) : "";
      })
      .then((result) => getList())
      .catch((error) => console.log(error));
  };

  const deleteTask = (index) => {
    const delList = list.filter((task, i) => i != index);
    console.log(delList);
    fetch("https://assets.breatheco.de/apis/fake/todos/user/dariel", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delList),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => getList())
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="text-center container">
      <h1>To Do List</h1>
      <form>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          id="newtask"
          name="newtask"
        ></input>
        <button
          className="btn btn-success"
          onClick={(e) => {
            e.preventDefault();
            addTask(input);
          }}
        >
          Add
        </button>
        <div>
          <ul className="list-group">
            {list.map((task, i) => {
              return (
                <li className="list-group-item d-flex justify-content-between">
                  <p key={i}>{task.label}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTask(i)}
                  >
                    delete
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Home;
