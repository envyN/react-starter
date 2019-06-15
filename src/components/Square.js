import React from 'react';
import './Square.scss';

export function Square(props) {
    return (
        <button className={'square ' + (props.winnerCell ? 'winning-cell' : '')}
                onClick={props.onClick}>
            {props.value}
        </button>
    );
}
