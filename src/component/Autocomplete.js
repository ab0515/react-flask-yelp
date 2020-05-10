import React, { Component, Fragment } from 'react';
import '../style/Autocomplete.css';
import PropTypes from 'prop-types';
import Results from './Results';
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';

// https://alligator.io/react/react-autocomplete/
class Autocomplete extends Component {
	static propTypes = {
		suggestions: PropTypes.instanceOf(Array)
	};

	static defaultProps = {
		suggestions: []
	};

	constructor(props) {
		super(props);

		this.state = {
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			userInput: "",
			location: ""
		}
	}

	onChange = e => {
		const { suggestions } = this.props;
		const userInput = e.currentTarget.value;

		const filteredSuggestions = suggestions.filter(
			suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
		);

		this.setState({
			activeSuggestion: 0,
			filteredSuggestions,
			showSuggestions: true,
			userInput: e.currentTarget.value
		});
	};

	handleChange = e => {
		const location = e.target.value;
		this.setState({ 
			location: location
		});
	};

	// click on suggestion
	onClick = e => {
		this.setState({
			activeSuggestion: 0,
			filteredSuggestions: [],
			showSuggestions: false,
			userInput: e.currentTarget.innerText
		});
	};

	onKeyDown = e => {	// a key down pressed
		const { activeSuggestion, filteredSuggestions } = this.state;
		if (e.keyCode === 13) {	// when user pressed the enter key
			this.setState({
				activeSuggestion: 0,
				showSuggestions: false,
				userInput: filteredSuggestions[activeSuggestion]
			});
		}
		else if (e.keyCode === 38) {	// up arrow
			if (activeSuggestion === 0) {
				return;
			}
			this.setState({activeSuggestion: activeSuggestion-1})
		}
		// User pressed the down arrow, increment the index
		else if (e.keyCode === 40) {
			if (activeSuggestion - 1 === filteredSuggestions.length) {
			  return;
			}
	  
			this.setState({ activeSuggestion: activeSuggestion + 1 });
		}	
	};

	render() {
		const {
			onChange, onClick, onKeyDown, handleChange,
			state: {
				activeSuggestion, 
				filteredSuggestions,
				showSuggestions,
				userInput,
				location
			}
		} = this;

		let suggestionsListComponent;

		if (showSuggestions && userInput) {
			if (filteredSuggestions.length) {
				suggestionsListComponent = (
					<ul className="suggestions">
						{filteredSuggestions.map((suggestion, index) => {
							let className;

							if (index === activeSuggestion) {
								className = "suggestion-active";
							}

							return (
								<li 
									className={className}
									key={suggestion}
									onClick={onClick}
								>
									{suggestion}
								</li>
							);
						})}
					</ul>
				)
			} else {
				suggestionsListComponent = (
					<div className="no-suggestion">
					</div>
				)
			}
		}

		return (
			<Fragment>
				<div className="margin">
					<Container>
						<Row>
							<Col md={5} className="centerItem">
								<Row>
									<input 
									type="text"
									onChange={onChange}
									onKeyDown={onKeyDown}
									value={userInput}
									placeholder="What's you are craving for?"
									/>
								
								</Row>
							</Col>
							<Col md={5} className="centerItem">
								<input type="text"
								onChange={handleChange}
								placeholder="Where?"
								value={location}
								/>
							</Col>
							<Col md={2}>
								{/* <Link to={`/results/${userInput},${location}`}>Go</Link> */}
								<Link to={{
									pathname:'/search',
									state:{
										userInput,
										location
									}
								}}><span>Go</span></Link>
							</Col>
						</Row>
						<Row>
							<Col md={5} className="centerItem">
							{suggestionsListComponent}	
							</Col>
						</Row>
					</Container>
				</div>
			</Fragment>
		);
	}
}

export default Autocomplete;