import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home';
import SearchResults from './component/SearchResults';
import Results from './component/Results';

function App() {
  return (
	<div>
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Home} exact></Route>
				<Route path="/results" component={SearchResults}></Route>
			</Switch>
		</BrowserRouter>
	</div>
  );
}

export default App;
