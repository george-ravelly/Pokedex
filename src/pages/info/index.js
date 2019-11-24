import React from "react";
import "./styles.css";
//Classe para pegar as informaçções dos pokemons selecionados
class Info extends React.Component {
	constructor() {
		super();
		this.state = {
			pokemon: {},
			descricao: "",
			isLoaded: false
		};
	}

	componentDidMount() {
		this.loadPokemon();
		this.loadDescription();
	}

	//Consulta os detalhes do pokemon
	loadPokemon = async () => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.url}`)
			.then(response => response.json())
			.then(data => this.setState({ pokemon: data, isLoaded: true }));
		//console.log(this.state.pokemon);
	};

	//Carrega a descrição do pokemon
	loadDescription() {
		fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.props.url}`)
			.then(response => response.json())
			.then(data =>
				this.setState({ descricao: data.flavor_text_entries[1].flavor_text })
			);
	}

	componentDidUpdate() {}

	render() {
		const { pokemon, isLoaded } = this.state;
		if (isLoaded) {
			//console.log(pokemon.abilities[1].ability);
			//Mostra os dados dos pokemons
			return (
				<div className="info">
					<div className="fundo" role="document">
						<div className="row">
							<div className="col-12 titulo">
								<h5>
									#{pokemon.id} - {pokemon.name}
								</h5>
							</div>
							<div className="descricao col-12">
								<div className="dPokemon">
									<h6>{this.state.descricao}</h6>
								</div>
							</div>
							<div className="col-12 col-sm-4">
								<div className="bar col-12 d-sm-none"></div>
								<div className="dPokemon">
									<strong>Habilidades:</strong>
									{pokemon.abilities.map(habilidade => (
										<h6>{habilidade.ability.name}</h6>
									))}
								</div>
							</div>
							<div className="col-12 col-sm-4">
								<div className="bar col-12 d-sm-none"></div>
								<div className="dPokemon">
									<strong>Tipo:</strong>
									{pokemon.types.map(tipo => (
										<h6>{tipo.type.name}</h6>
									))}
								</div>
							</div>
							<div className="col-12 col-sm-4">
								<div className="bar col-12 d-sm-none"></div>
								<div className="dPokemon">
									<strong>Caracteristicas:</strong>
									<h6>{(pokemon.weight / 10).toFixed(1)} kg</h6>
									<h6>{(pokemon.height / 10).toFixed(1)} m</h6>
								</div>
							</div>
							<div className="estatus col-12">
								<div className="bar col-12"></div>
								<strong>Status do Pokemon</strong>
								<div className="bar col-12"></div>
							</div>
							<div className="estatus col-12">
								{pokemon.stats.map(p => (
									<div className="borda col-12 col-sm-4">
										<strong>{p.stat.name}</strong>{" "}
										<strong>{p.base_stat}</strong>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			);
		}
		return <div>Carregando...</div>;
	}
}
export default Info;
