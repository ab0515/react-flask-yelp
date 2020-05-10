import React, {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { Card, ListGroup } from 'react-bootstrap';
import OperatingHours from './OperatingHours';

const RestDetails = (props) => {
	const inputs = props.location.state;
	const [info, setInfo] = useState([]);
	const [photos, setPhotos] = useState([]);
	const [hours, setHours] = useState([]);
	
	useEffect(() => {
		fetch(`/api/getdetails?id=${inputs.bizId}`).then(res => res.json())
		.then(data => {
			setInfo(data);
			setPhotos(data.photos);
			setHours(data.hours[0]);
		});
	}, []);
	return (
		<div>
			{hours.is_open_now ? 'Open Now' : 'Closed'}
			<Card>
				<Card.Header>Operating Hours</Card.Header>
				<OperatingHours hours={hours.open}></OperatingHours>
			</Card>
			{/* <Carousel>
				{
					photos.map((item, idx) => (
						<Carousel.Item key={idx}>
							<img
								className="d-block w-100"
								src={item}
								alt="Image"
							></img>
						</Carousel.Item>
					))
				}
			</Carousel> */}
		</div>
	);
}

export default RestDetails;