export function WINNER_ARRAYS(n: number): number[][] {
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
    // console.debug(winningCombinations);
    return winningCombinations;
}

export enum TicTac {
    Tic = 'X',
    Tac = 'O'
}