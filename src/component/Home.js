import React, { useState, useEffect } from 'react';
import Autocomplete from './Autocomplete';
import Button from 'react-bootstrap/Button';

const Home = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch('/api/parentCategories').then(res => res.json()).then( data => {
				setCategories(data.categories);
			});
	}, []);

	return (
		<div>
			<Autocomplete suggestions={categories}></Autocomplete>
		</div>
	);
}

export default Home;