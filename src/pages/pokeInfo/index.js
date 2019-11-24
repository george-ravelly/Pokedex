import React from "react";
import Info from "../info";
import "./styles.css";

class PokeInfo extends React.Component {
	constructor() {
		super();
		this.state = {
			pokemon: {},
			isLoaded: false
		};
	}

	componentDidMount() {
		this.loadPokemon();
	}

	loadPokemon = async () => {
		fetch(`${this.props.url}`)
			.then(response => response.json())
			.then(data => this.setState({ pokemon: data, isLoaded: true }));
		//console.log(this.state.pokemon);
	};

	componentDidUpdate() {}

	render() {
		const { pokemon, isLoaded } = this.state;
		if (isLoaded) {
			return (
				<div className="pokeInfo">
					<a href="link" data-toggle="collapse" data-target="#ip">
						<img src={pokemon.sprites.front_default} alt="pokemonsprite"></img>
					</a>
					<div className="collapse" id="ip">
						<Info url={pokemon.id} />
					</div>
				</div>
			);
		}
		return <div>Carregando...</div>;
	}
}
export default PokeInfo;
