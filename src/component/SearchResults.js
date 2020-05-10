import React, { useState, useEffect } from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { BrowserRouter as Router, useRouteMatch, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../style/Searchresults.css';
import DisplayAddress from './DisplayAddress';
import RestDetails from './RestDetails';

const SearchResults = (props) => {
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
			<div className="center">
				<CardColumns style={{paddingLeft:'8%'}}>
					{
						restaurants.map(rest => (
							// <li key={rest.id}>{rest.name} {rest.price} {rest.rating}</li>
							<Card key={rest.id}
								style={{width:'auto'}}>
								<Card.Img 
									variant="top" 
									src={rest.image_url}
									className="coverBackground square"
									/>
							<Card.Body>
								{/* <Card.Title>{rest.name}</Card.Title> */}
								<Card.Text><span style={{fontWeight:'bold'}}>{rest.name}</span> | {rest.price ? rest.price : 'N/A'} | {rest.rating} </Card.Text>
								{/* <Card.Text> Price range: {rest.price ? rest.price : 'N/A'} </Card.Text> */}
								<DisplayAddress rest={rest}></DisplayAddress>
								<Link to={{
									pathname: `/search/biz/${rest.name}`,
									state: {
										bizId: rest.id
									}
								}}>Click here</Link>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">Call {rest.display_phone}</small>
							</Card.Footer>
							</Card>
						))
					}
				</CardColumns>
			</div>
		</div>
	);
}

export default SearchResults;