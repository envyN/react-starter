import * as React from 'react';
import './Square.scss';

export interface SquareProps {
    value: string | null,
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
