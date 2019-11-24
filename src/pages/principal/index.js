import React, { Component } from "react";
import PokeInfo from "../pokeInfo";
import "./styles.css";

export default class Conteudo extends Component {
	//classe de estado de objetos
	state = {
		pokemons: [],
		pokeInfo: {},
		page: 0
	};

	//Montando o Componente
	componentDidMount() {
		this.loadPokedex();
	}
	//Actions dos Butões
	proximo = () => {
		const { page, pokemons } = this.state;

		if (page === pokemons.count) return;
		else if (page + 1 > pokemons.count) {
			let numPagina = page + (pokemons.count - page);
			this.loadPokedex(numPagina);
		} else {
			let numPagina = page + 1;
			this.loadPokedex(numPagina);
		}
	};
	anterior = () => {
		const { page } = this.state;

		if (page === 0) return;
		else if (page - 1 < 0) {
			let numPagina = 1 - page;
			this.loadPokedex(numPagina);
		} else {
			let numPagina = page - 1;
			this.loadPokedex(numPagina);
		}
	};

	//Carrega os dados da api
	loadPokedex = async (page = 0) => {
		fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=1`)
			.then(response => response.json())
			.then(data => this.setState({ pokemons: data.results, page }));
		/*Pegando dados da api com axios
		const resposta = await Api.get(`/pokemon?offset=${page}&limit=24`);
		const { results, ...pokeInfo } = resposta.data;
		this.setState({ pokemons: results, pokeInfo, page });
		console.log(resposta.data.results);*/
	};

	render() {
		const { pokemons } = this.state;
		return (
			<div className="tela row">
				<div className="col">
					{pokemons.map(poke => (
						<div className="col name" key={poke.name}>
							<PokeInfo url={poke.url} />
							<div className="paginacao">
								<button className="btn btn-secondary" onClick={this.anterior}>
									Anterior
								</button>
								<button className="btn btn-info" onClick={this.proximo}>
									Proximo
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}
