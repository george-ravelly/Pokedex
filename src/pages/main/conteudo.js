import React, { Component } from "react";
import Api from "../../services/api";
import "./styles.css";

export default class Conteudo extends Component{
    //classe de estado de objetos
    state = {
        pokemons: [],
        pokeInfo: {},
        page:0,
    };

    //Montando o Componente
    componentDidMount (){
        this.loadPokedex();
    }
    //Actions dos Butões
    proximo = () => {
        const { page, pokeInfo } = this.state;

        if(page === pokeInfo.count) return;
        else if(page+24>pokeInfo.count){
            let numPagina = page + (pokeInfo.count-page);
            this.loadPokedex(numPagina);
        }
        else{
            let numPagina = page + 24;
            this.loadPokedex(numPagina);
        }
    }
    anterior = () => {
        const { page } = this.state;

        if(page === 0) return;
        else if(page-24<0){
            let numPagina = 24 - page;
            this.loadPokedex(numPagina);
        }
        else{
            let numPagina = page - 24;
            this.loadPokedex(numPagina);
        }
    }

    //Carrega os dados da api
    loadPokedex = async (page = 0) => {
        const resposta = await Api.get(`/pokemon?offset=${page}&limit=24`);
        const { results, ...pokeInfo } = resposta.data; 
        this.setState({ pokemons: results, pokeInfo, page });
        console.log(resposta.data.results);
    };
    loadSprites = async () =>{
        const sprt = await Api.get()
    }

    render (){
        const { pokemons, pokeInfo } = this.state;
        return(
            <div className="tela">
                {pokemons.map( poke => (
                    <article key={poke.name}>
                        <strong>{ poke.name }</strong>
                    </article>
                ))}
                <div className="paginacao">
                    <button className="btn btn-secondary" onClick={this.anterior}>Anterior</button>
                    <button className="btn btn-secondary" onClick={this.proximo}>Proximo</button>
                </div>
            </div>
        )
    }
}