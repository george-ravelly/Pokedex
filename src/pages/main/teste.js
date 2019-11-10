import React, { Component } from "react";
import Api from "../../services/api";
import "./styles.css";

export default class Teste extends Component{
    state = {
        pokemons: [],
    };

    componentDidMount (){
        this.loadProducts();
    }
    loadProducts = async () => {
        const resposta = await Api.get('/pokemon');
        //this.setState({ pokemons: resposta.data.results });
        console.log(resposta);
    };

    render (){
        return(
            <div className="tela">
                <article>
                    <strong>ola</strong>
                </article>
            </div>
        )
    }
}