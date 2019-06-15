import * as React from 'react';
import { Board } from './Board';
import './TicTacToeGame.scss';

export interface TicTacToeGameProps {}

export interface GridSizeOption {
    n: number,
    label: string
}

export interface TicTacToeGameState {
    gameNumber: number,
    gameComplete: boolean,
    gridSize: number
}

export class TicTacToeGame extends React.Component<TicTacToeGameProps, TicTacToeGameState> {
    private gridOptions: GridSizeOption[] = [3, 5, 7, 9].map(n => ({n, label: `${ n }x${ n }`}));

    constructor(props: TicTacToeGameProps) {
        super(props);
        this.state = {
            gameNumber: 1,
            gameComplete: false,
            gridSize: this.gridOptions[0].n
        };
    }

    onComplete() {
        this.setState({gameNumber: this.state.gameNumber, gameComplete: true});
    }

    createNewGame() {
        this.setState({gameNumber: this.state.gameNumber + 1, gameComplete: false});
    }

    setGridOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({gridSize: +event.target.value});
    };

    render() {
        let newGameButton = null;
        if (this.state.gameComplete) {
            newGameButton = <>
                <select onChange={ this.setGridOption }>
                    { this.gridOptions.map(o => {
                        return <option value={ o.n }
                                       key={ o.n }>{ o.label }</option>
                    }) }
                </select>
                <button onClick={ () => this.createNewGame() }>New Game</button>
            </>;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board n={ this.state.gridSize }
                           key={ this.state.gameNumber }
                           onComplete={ () => {
                               this.onComplete();
                           } }/>
                </div>
                <div className="game-info">
                    <div>{ this.state.gameComplete ? 'Game Over' : `Game ${ this.state.gameNumber } in progress...` }</div>
                    { newGameButton }
                    <ol>{/* TODO */ }</ol>
                </div>
            </div>
        );
    }
}
