import * as React from 'react';
import { Board } from './Board';
import './TicTacToeGame.scss';

export interface TicTacToeGameProps {}

export interface TicTacToeGameState {
    gameNumber: number,
    gameComplete: boolean
}

export class TicTacToeGame extends React.Component<TicTacToeGameProps, TicTacToeGameState> {
    constructor(props: TicTacToeGameProps) {
        super(props);
        this.state = {
            gameNumber: 1,
            gameComplete: false
        };
    }

    onComplete() {
        this.setState({gameNumber: this.state.gameNumber, gameComplete: true});
    }

    createNewGame() {
        this.setState({gameNumber: this.state.gameNumber + 1, gameComplete: false});
    }

    render() {
        let newGameButton = null;
        if (this.state.gameComplete) {
            newGameButton = <button onClick={ () => this.createNewGame() }>New Game</button>;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board n={ 3 }
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
