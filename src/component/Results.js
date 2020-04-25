import React from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';

const Results = (props) => {
	// let { cat } = useParams();
	// console.log(props.location.temp)
	const inputs = props.location.state;
	console.log(props.location.state.userInput);
	return (
		<div>
			<h4>You are here: {inputs.location}</h4>
		</div>
	)
};

export default Results;