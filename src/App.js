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
            message: "Click a tile to begin"
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
                victory: true
            });
            if (owner === "nought") {
                this.setState({ winner: "noughts", message: " have won"})
            } else if (owner === "cross") {
                this.setState({ winner: "crosses", message: " have won"})
            }
        } else if (this.state[name].length === 5 && !this.state.victory) {
            this.setState({ winner: "draw", message: "It's a "})
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
            message: ""
        });
    }

    render() {
        const {winner, winningCombination} = this.state;
        return (
            <div className="container">
                <div className="landscape">
                <svg className="landscape__icon" xmlns="http://www.w3.org/2000/svg" style={{isolation:'isolate'}} viewBox="0 0 181.417 181.417" width="241.889" height="241.889" fill="#ddd">
                    <defs>
                        <clipPath id="a">
                            <path d="M0 0h181.417v181.417H0z"/>
                        </clipPath>
                    </defs>
                    <g clipPath="url(#a)">
                        <path d="M14.511 0C6.527 0 0 6.527 0 14.511v152.396c0 7.984 6.527 14.51 14.511 14.51h67.772c7.984 0 14.51-6.526 14.51-14.51V14.511C96.793 6.527 90.267 0 82.283 0H14.511zm0 6.284h9.423c-.014.149-.044.293-.044.447v.611a4.553 4.553 0 0 0 4.564 4.564H68.34a4.553 4.553 0 0 0 4.563-4.564v-.611c0-.154-.029-.298-.044-.447h9.424c4.61 0 8.219 3.617 8.219 8.227v152.396c0 4.61-3.609 8.219-8.219 8.219H14.511c-4.61 0-8.22-3.609-8.22-8.219V14.511c0-4.61 3.61-8.227 8.22-8.227z" fillRule="evenodd"/>
                        <path d="M102.603 84.06v6.291h64.304c4.61 0 8.227 3.61 8.227 8.22v9.423c-.15-.015-.294-.044-.447-.044h-.612a4.555 4.555 0 0 0-4.564 4.564V152.4a4.554 4.554 0 0 0 4.564 4.563h.612c.153 0 .297-.029.447-.044v9.424c0 4.61-3.617 8.219-8.227 8.219H96.732v6.292h70.175c7.984 0 14.51-6.527 14.51-14.511V98.571c0-7.984-6.526-14.511-14.51-14.511h-64.304zM120.016 16.797l-10.058 6.861 10.058 6.86v-4.554c19.114 0 35.154 15.902 35.154 35.156h-4.552l6.86 10.057 6.861-10.057h-4.978c0-21.316-18.029-39.344-39.345-39.344v-4.979z"/>
                    </g>
                </svg>
                <span className="landscape__message">
                    Please go back to portrait
                </span>
                </div>
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
                        <button className="message__button" onClick={() => this.reset()}>Play again</button>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
