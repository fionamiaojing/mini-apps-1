
var playboard = [];
for (var i = 0; i < 3; i++) {
    playboard.push([0,0,0]);
}

var winPattern = {'X':0, 'O':0};
var lastRoundWinner;
var currentPlayer = lastRoundWinner || 'X';

var handleClick = function(e) {
    if (e.target.innerHTML) {
        return
    }
    //place 'X' or 'O'
    placePosition(e.target);
    if (success(playboard)) {
        lastRoundWinner = currentPlayer
        winPattern[currentPlayer]++;
        displayWinStatus();
        endGame(true)
    } else if (spaceLeft(playboard) === 0){
        // end game
        endGame(false)
    } else {
        // switch player
        switchPlayer();
    }
}

var handleSubmit = function() {
    // clear message/gameboard/playboard/class
    // add back onclick event
    document.getElementById('message').innerHTML = '';
    var tdElements = document.getElementsByTagName('td');
    for (var i = 0; i < tdElements.length; i++) {
        tdElements[i].innerHTML = '';
    }
    clearPlayBoard();
    document.getElementById('gameBoard').classList.remove('endGame');
    document.getElementById('gameBoard').setAttribute('onclick', 'handleClick(event)');
    currentPlayer = 'X';

}

var handleName = function(e) {
    var inputValue = e.target.parentNode.childNodes[3].value
    e.target.parentNode.childNodes[1].innerHTML = 'Player : ' + inputValue + ' ('+ e.target.id + ')';
}


var placePosition = function(target) {
    target.innerHTML = currentPlayer;
    // locate the position in playboard
    var col = target.id % 3;
    var row = (target.id - col) / 3;
    playboard[row][col] = (currentPlayer === 'X' ? 1 : -1);
}

var switchPlayer = function() {
    currentPlayer = (currentPlayer === 'O' ? 'X' : 'O');
}

var clearPlayBoard = function() {
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            playboard[row][col] = 0
        }
    }
}

var success = function(playboard) {
    //check row:
    for (var row = 0; row < 3; row++) {
        var result = playboard[row].reduce((acc, cur) => acc + cur, 0);
        if (result === 3 || result === -3) {
            return true;
        }
    }
    //check col:
    for (var col = 0; col < 3; col++) {
        var result = 0;
        for (var row = 0; row < 3; row++) {
            result += playboard[row][col];
        }
        if (result === 3 || result === -3) {
            return true;
        }
    }
    //check diagnal:
    var majorDiagnal = playboard[0][0] + playboard[1][1] + playboard[2][2];
    var minorDiagnal = playboard[0][2] + playboard[1][1] + playboard[2][0];
    if (majorDiagnal === 3 || majorDiagnal === -3 || minorDiagnal === 3 || minorDiagnal === -3) {
        return true;
    }

    return false;
}

var spaceLeft = function(playboard) {
    // count the remaining available space
    var countOfZero = 0;
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            if (playboard[row][col] === 0) {
                countOfZero++;
            }
        }
    }
    return countOfZero;
}

var endGame = function(status) {
    var message;
    if (status) {
        message = 'Winner is ' + currentPlayer;
    } else {
        message = 'Reached A Tie, no winners, please restart'
    }
    //display the message and disable the gameboard
    document.getElementById('gameBoard').classList.add('endGame');
    document.getElementById('message').innerHTML = message;
    document.getElementById('gameBoard').removeAttribute('onclick');
}

var displayWinStatus = function() {
    var text = []
    for (var key in winPattern) {
        text.push(key);
        text.push(':');
        text.push(winPattern[key]);
        text.push('vs');
    }
    text.pop();
    console.log(text.join(' '));
    document.getElementById('winStatus').innerHTML = text.join(' ');
}