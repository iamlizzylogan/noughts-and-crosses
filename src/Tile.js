import React, { Component } from 'react';

export default class Tile extends Component {

    constructor(props) {
        super(props);
        this.id = props.id;
        this.onClick = props.onClick;
        this.targetOwnership = props.targetOwnership;
        this.shouldTileReset = props.shouldTileReset;
        this.onReset = props.onReset;
        this.state = {
            empty: true,
            ownership: null,
            classNames: `board__tile --empty`
        };
    }

    componentWillReceiveProps(nextProps) {
        this.targetOwnership = nextProps.targetOwnership;
        this.onClick = nextProps.onClick;
        this.shouldTileReset = nextProps.shouldTileReset;

        this.shouldTileReset ? this.reset() : null;
    }

    toggleEmpty() {
        this.setState({ empty: !this.state.empty });
    }

    setOwnership() {
        this.setState({ ownership: this.targetOwnership });
        this.setClassNames(`board__tile --${this.targetOwnership}`);
    }

    onTileClick() {
        if (!this.state.ownership) {
            this.toggleEmpty();
            this.setOwnership();
            this.onClick();
        }
    }

    setClassNames(names) {
        names ? this.setState({ classNames: names}) : this.setState({ classNames: `board__tile --empty`});
    }

    reset() {
        this.setState({empty: true, ownership: null});
        setTimeout(this.setClassNames.bind(this), 400);
        this.onReset();
    }

    render() {
        return <div
            onClick={() => this.onTileClick()}
            className={this.state.classNames}
            id={`tile-${this.id}`} />
    }
}
