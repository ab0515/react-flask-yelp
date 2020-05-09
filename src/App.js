import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home';
import SearchResults from './component/SearchResults';
import RestDetails from './component/RestDetails';

function App() {
  return (
	<div>
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Home} exact></Route>
				<Route path="/results" component={SearchResults} exact></Route>
			</Switch>
		</BrowserRouter>
	</div>
  );
}

export default App;
