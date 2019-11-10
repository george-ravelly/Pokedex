import React,{ Component } from "react";
import Pokedex from "./components/header/index";
import Conteudo from "./pages/main/conteudo";

class App extends Component{ 
    render(){
        return(
            <div>
                <Pokedex />
                <Conteudo />
            </div>
        )
    };
}

export default App;