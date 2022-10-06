import React, { useEffect } from "react";

const Home = () => {
	useEffect(() => {
	fetch("http://assets.breatheco.de/apis/fake/todos/user/dariel")
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log(error))
	}, []);

const addTask = (myTask) => {
	fetch("http://assets.breatheco.de/apis/fake/todos/user/dariel",{
	method: 'PUT',
	body: JSON.stringify(myTask),
	redirect: 'follow',
	headers: {
		"Content-Type": "application/json",
	},
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log(error));
};



	return (
		<div className="text-center">
		<button
		className="btn btn-primary"
		onClick={() => addTask([{label: 'Eat', done: false}])}
		>Add</button>
		</div>
	);
};

export default Home;
