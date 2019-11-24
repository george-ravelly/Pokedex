import React, { Component } from "react";
import Pokedex from "./components/header/index";
import Conteudo from "./pages/principal";

class App extends Component {
	render() {
		return (
			<div className="container-fluid">
				<Pokedex />
				<Conteudo />
			</div>
		);
	}
}

export default App;
