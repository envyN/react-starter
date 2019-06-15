import * as React from 'react';
import './Square.scss';
import { TicTac } from './TicTacToeHelper';

export interface SquareProps {
    value: TicTac | null,
    winnerCell: boolean,
    onClick: () => void
}

export function Square(props: SquareProps) {
    return (
        <button className={ 'square ' + (props.winnerCell ? 'winning-cell' : '') }
                onClick={ props.onClick }>
            { props.value }
        </button>
    );
}
