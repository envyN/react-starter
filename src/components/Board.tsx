import * as React from 'react';
import { Square } from './Square';
import './Board.scss';

export interface BoardProps {
    n: number,
    onComplete: Function
}

export interface BoardState {
    squares: (string | null)[],
    xIsNext: boolean,
    gameOver: boolean,
    winner: string | null,
    winningCells: number[]
}

export class Board extends React.Component<BoardProps, BoardState> {
    public winningCombinations: number[][];
    public n: number;

    constructor(props: BoardProps) {
        super(props);
        const n = +(props.n) || 3;
        this.state = {
            squares: Array(n * n)
                .fill(null),
            xIsNext: true,
            gameOver: false,
            winner: null,
            winningCells: []
        };
        this.winningCombinations = this.calcWinningCombinations(n);
        this.n = n;
    }

    calcWinningCombinations(n: number) {
        const winningCombinations = [];
        for (let row = 0; row < n; row++) {
            //All Rows as Winning Combinations
            winningCombinations.push(new Array(n).fill(0)
                                                 .map((v, i) => (row * n) + i));
            //All Cols as Winning Combinations
            winningCombinations.push(new Array(n).fill(0)
                                                 .map((v, i) => row + (n * i)));
        }
        //Leading Diagonal as Winning Combinations
        winningCombinations.push(new Array(n).fill(0)
                                             .map((v, i) => i * n + i));
        //Reverse Diagonal as Winning Combinations
        winningCombinations.push(new Array(n).fill(0)
                                             .map((v, i) => (n * (i + 1)) - i - 1));
        console.debug(winningCombinations);
        return winningCombinations;
    }

    calculateWinner(state: BoardState): BoardState {
        let gameOver = state.squares.indexOf(null) === -1;
        let winner = null;
        let winningCells: number[] = [];
        this.winningCombinations.forEach(comb => {
            const combVal = comb.map(p => state.squares[p]);
            if (combVal.indexOf(null) === -1) {
                let same = true;
                const val = combVal[0];
                combVal.forEach(v => (same = (same && v === val)));
                if (same) {
                    gameOver = true;
                    winner = val;
                    winningCells.push(...comb);
                }
            }
        });
        return {...state, gameOver, winner, winningCells};
    }

    handleClick(i: number) {
        if (!this.state.gameOver && this.state.squares[i] === null) {
            const squares = this.state.squares.slice();
            let xIsNext = !this.state.xIsNext;
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            const newState = this.calculateWinner({...this.state, squares, xIsNext});
            this.setState(newState);
            if (newState.gameOver) {
                this.props.onComplete();
            }
        }
    }

    renderSquare(i: number) {
        const isIWinner = this.state.winningCells && this.state.winningCells.indexOf(i) !== -1;
        return <Square key={ i }
                       value={ this.state.squares[i] }
                       onClick={ () => this.handleClick(i) }
                       winnerCell={ isIWinner }/>;
    }

    renderCols(n: number, rowIndex: number) {
        let cols = [];
        while (n--) {
            cols.push(this.renderSquare(rowIndex + n));
        }
        return cols;
    }

    renderRows(n: number) {
        let row = n;
        let rows = [];
        while (row--) {
            rows.push(<div className="board-row"
                           key={ row }>{ this.renderCols(n, row * n) }</div>);
        }
        return rows;
    }

    render() {
        let status = `Next player: ${ this.state.xIsNext ? 'X' : 'O' }`;
        if (this.state.gameOver) {
            let winnerStatus;
            switch (this.state.winner) {
                case 'X':
                    winnerStatus = 'X Wins!';
                    break;
                case 'O':
                    winnerStatus = 'O Wins!';
                    break;
                default:
                    winnerStatus = 'Match Drawn!';
                    break;
            }
            status = `${ winnerStatus }`;
        }
        return (
            <div>
                <div className="status">{ status }</div>
                <div className="board">
                    { this.renderRows(this.n) }
                </div>
            </div>
        );
    }
}
