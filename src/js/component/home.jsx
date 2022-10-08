import React, { useEffect,useState } from "react";

const Home = () => {
	const [list, setList] = useState([])
	
	useEffect(() => {
		getList()
	},[])

const getList = () => {
	fetch("http://assets.breatheco.de/apis/fake/todos/user/dariel")
  .then(response => response.json())
  .then(result => setList(result))
  .catch(error => console.log(error))
	}

const addTask = (myTask) => {
	const newList = [...list, myTask]
	fetch("http://assets.breatheco.de/apis/fake/todos/user/dariel",{
	method: 'PUT',
	headers: {
	'Content-Type': 'application/json'
	},
	body: JSON.stringify(newList),
	redirect: 'follow'
	})
	.then(response => response.json())
	.then(result => getList())
	.catch(error => console.log(error))
}

return (
	<div className="text-center">
		{list.map((task, i) => {
			return(
				<p key={i}>{task.label}</p>
			)
		})}
	<button
	className="btn btn-primary"
	onClick={() => addTask([{label: 'Eat', done: false}])}
	>Add</button>
	</div>
);
};

export default Home;
