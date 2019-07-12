import React, { Component } from 'react';
import Tile from './Tile.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.state = {
            currentOwner: "nought",
            winner: "",
            winningCombination: {},
            noughtOwned: [],
            crossOwned: [],
            victory: false,
            tilesShouldReset: false,
            message: "Click a tile to begin",
            messagePlayAgain: " "
        };
    }

    generateTiles() {
        const indices = [...new Array(9)].map((_, index) => index);
        return indices.map(index => <Tile onClick={
            !this.state.victory
            ? () => {
                this.addToOwned(this.state.currentOwner, index);
                this.checkWinner(this.state.currentOwner);
                this.toggleOwner();
            }
            : null}
            targetOwnership={this.state.currentOwner}
            shouldTileReset={this.state.tilesShouldReset}
            onReset={this.toggleTilesShouldReset.bind(this)}
            key={index} id={index} />
        );
    }

    addToOwned(owner, index) {
        const name = `${owner}Owned`;
        this.state[name].push(index);

        this.state.noughtOwned.length === 1 ? this.setState({ message: "" }) : null;
    }

    checkWinner(owner) {
        const name = `${owner}Owned`;
        const check = this.combinations.map(combination => combination.every(element => this.state[name].includes(element)));
        if (!!check.reduce((prev, curr) => prev |= curr)) {
            this.setState({
                currentOwner: null,
                winningCombination: check.indexOf(true),
                victory: true,
                messagePlayAgain: "Play again"
            });
            if (owner === "nought") {
                this.setState({ winner: "noughts", message: " have won"})
            } else if (owner === "cross") {
                this.setState({ winner: "crosses", message: " have won"})
            }
        } else if (this.state[name].length === 5 && !this.state.victory) {
            this.setState({ winner: "draw", message: "It's a ", messagePlayAgain: "Play again"})
        } else null;
    }

    toggleOwner() {
        this.state.currentOwner === "nought" ? this.setState({ currentOwner: "cross" })
        : this.state.currentOwner === "cross" ? this.setState({ currentOwner: "nought" }) : null;
    }

    toggleTilesShouldReset() {
        this.setState({ tilesShouldReset: false });
    }

    reset() {
        this.setState({
            currentOwner: "nought",
            winner: "",
            winningCombination: {},
            noughtOwned: [],
            crossOwned: [],
            victory: false,
            tilesShouldReset: true,
            message: "",
            messagePlayAgain: ""
        });
    }

    render() {
        const {winner, winningCombination} = this.state;
        return (
            <div className="container">
                <div className="landscape__message">Please go back to portrait</div>
                <header>
                    <div className="logo">
                    <span className="logo__titlePart">Noughts</span>
                    <span className="logo__titlePart">& Crosses</span>
                    </div>
                </header>
                <main>
                    <div className={"board" + (winner ? ` --finish` : ``)} onClick={winner ? () => this.reset() : null}>
                        {this.generateTiles()}
                        {this.state.victory ?
                            <div className={"strikeout"
                                + ` --combination-${winningCombination}`
                                + (winningCombination >= 6 ? ` --diagonal` : winningCombination >= 3 ? ` --vertical` : winningCombination >= 0 ? ` --horizontal` : ``)}></div>
                        : null}
                    </div>

                    {/* TODO: Refactor this to a separate component */ }
                    <div className={"message" + (winner ? ` --${winner}` : ` --start`)}>
                        <span className="message__text">
                            <span className="message__textWinner">{winner}</span>
                            {this.state.message}
                        </span>
                        <button className="message__button" onClick={() => this.reset()}>{this.state.messagePlayAgain}</button>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
