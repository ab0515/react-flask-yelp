import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import { BrowserRouter as Router, useParams } from 'react-router-dom';

const SearchResults = (props) => {
	let { cat } = useParams();
	const inputs = props.location.state;
	// const [curTime, setcurTime] = useState(0);
	const [restaurants, setRestaurants] = useState([]);

	// useEffect(() => {
	// 	fetch('/time').then(res => res.json()).then(data => {
	// 		setcurTime(data.time);
	// 	});
	// }, []);

	useEffect(() => {
		// `/api/search/?cat=${cat}`
		fetch(`/api/search?cat=${inputs.userInput}&location=${inputs.location}`).then(res => res.json()).then(data => {
			// console.log(data);
			setRestaurants(data.businesses);
		});
	}, []);

	return (
		<div>
			<CardColumns>
				{
					restaurants.map(rest => (
						// <li key={rest.id}>{rest.name} {rest.price} {rest.rating}</li>
						<Card key={rest.id} style={{ width: '18rem'}}>
							<Card.Img variant="top" src={rest.image_url} />
						<Card.Body>
							<Card.Title>{rest.name}</Card.Title>
							<Card.Text> Rating: {rest.rating} </Card.Text>
							<Card.Text> Price range: {rest.price ? rest.price : 'N/A'} </Card.Text>
						</Card.Body>
						<Card.Footer>
							<small className="text-muted">Call {rest.phone}</small>
						</Card.Footer>
						</Card>
					))
				}
			</CardColumns>
		</div>
	);
}

export default SearchResults;