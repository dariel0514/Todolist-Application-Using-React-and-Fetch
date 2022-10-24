import React, { useEffect, useState } from "react";

const Home = () => {
  const [list, setList] = useState([]);

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
    var newList = [...list, myTask];
    fetch("https://assets.breatheco.de/apis/fake/todos/user/dariel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newList),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => getList())
      .catch((error) => console.log(error));
  };
  const deleteTask = (myTask) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/dariel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myTask),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => getList())
      .catch((error) => console.log(error));
  };

  return (
    <div className="text-center">
      {list.map((task, i) => {
        return <p key={i}>{task.label}</p>;
      })}
      <h1>To Do List</h1>
      <button
        className="btn btn-success"
        onClick={() => addTask({ label: "Eat", done: false })}
      >
        Add
      </button>
      <button
        className="btn btn-success"
        style={{ margin: "10px", backgroundColor: "red" }}
        onClick={() => deleteTask(1)}
      >
        Delete
      </button>
    </div>
  );
};

export default Home;
