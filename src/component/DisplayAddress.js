import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap'; 
import '../style/DisplayAddress.css';

const DisplayAddress = (props) => {
	const [location, setLocation] = useState(props.rest.location);

	return (
		<div>
			<p className="noMargin">
				{location.address1}{location.address2 ? " " + location.address2+"," : ","} {location.zip_code}
			</p>
			<p className="noMargin">
				{location.city}, {location.country}
			</p>
		</div>
	)
}

export default DisplayAddress;