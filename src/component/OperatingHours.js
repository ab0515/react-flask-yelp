import React from 'react';
import { ListGroup } from 'react-bootstrap';

const OperatingHours = (props) => {
	const openhours = props.hours;
	const dates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const timeConverter = (time) => {
		var front = time.slice(0,2) % 12 || 12;
		var back = time.slice(2,time.length);
		var morning = time.slice(0,2) >= 12 && time.slice(0,2) < 24 ? 'PM' : 'AM';
		return front + ':' + back + ' ' + morning;
	};

	return openhours ? (
		<div>
			{
				openhours.map((item,idx) => (
					<ListGroup.Item key={item.day}>
						{dates[idx]} | {timeConverter(item.start)} - {timeConverter(item.end)}
					</ListGroup.Item>
				))
			}
		</div>
	) : (
		<div></div>
	);
}

export default OperatingHours;