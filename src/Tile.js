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

    setClassNames() {
        if (this.state.empty) {
            return `board__tile --empty`
        } else if (this.state.ownership) {
            return `board__tile --${this.state.ownership}`
        }
    }

    reset() {
        this.setState({empty: true, ownership: null});
        this.onReset();
    }

    render() {
        return <div
            onClick={() => this.onTileClick()}
            className={this.setClassNames()}
            id={`tile-${this.id}`} />
    }
}
