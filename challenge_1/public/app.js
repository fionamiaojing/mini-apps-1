var playboard = [];
for (var i = 0; i < 3; i++) {
    playboard.push([0,0,0]);
}
var playerName = {'X': 'X', 'O': 'O'}
var winPattern = {'X':0, 'O':0};
var lastRoundWinner;
var currentPlayer = lastRoundWinner || 'X';
var toggleBoard = false;

//handle click event on gameboard
var handleClick = function(e) {
    if (e.target.innerHTML) {
        return
    }
    //place 'X' or 'O'
    placePosition(e.target);
    if (success(playboard)) {
        // retain the lastRoundWinner
        lastRoundWinner = currentPlayer
        // update the win pattern and display
        winPattern[currentPlayer]++;
        displayWinStatus();
        // trigger end Game
        endGame(true)
    } else if (spaceLeft(playboard) === 0){
        // end game
        endGame(false)
    } else {
        // switch player
        switchPlayer();
        // check if need to toggle;
        if (toggleBoard) {
            let midplayboard = rotateMatrix(playboard);
            playboard = gravityMatrix(midplayboard);
            //playboard = midplayboard;
        }
        
    }
}

//handle Refresh
var handleSubmit = function() {
    // DOM event:
    // clear messages in the message tag
    document.getElementById('message').innerHTML = '';
    // clear placement of 'X' or 'O' in table;
    var tdElements = document.getElementsByTagName('td');
    for (var i = 0; i < tdElements.length; i++) {
        tdElements[i].innerHTML = '';
    }
    // clear css style
    document.getElementById('gameBoard').classList.remove('endGame');
    // JS file event:
    // clear playboard
    clearPlayBoard();
    // addback onclick event
    document.getElementById('gameBoard').setAttribute('onclick', 'handleClick(event)');
    // restart from the lastRoundWinner
    currentPlayer = lastRoundWinner;
}

//handle submit name
var handleName = function(e) {
    // Display name on the DOM
    var inputValue = e.target.parentNode.childNodes[3].value
    e.target.parentNode.childNodes[1].innerHTML = 'Player : ' + inputValue + ' ('+ e.target.id + ')';
    playerName[e.target.id] = inputValue;
}

// handle place 'X' or 'O'
var placePosition = function(target) {
    // set the attr in DOM
    target.innerHTML = currentPlayer;
    // locate the position in playboard and update playboard
    var col = target.id % 3;
    var row = Math.floor(target.id / 3);
    playboard[row][col] = (currentPlayer === 'X' ? 1 : -1);
}

var switchPlayer = function() {
    currentPlayer = (currentPlayer === 'O' ? 'X' : 'O');
}

var clearPlayBoard = function() {
    // reset all values in playboard to 0
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
        message = 'Winner is ' + playerName[currentPlayer] + ' 🎉';
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
    document.getElementById('winStatus').innerHTML = text.join(' ');
}

var handleToggle = function(event) {
    if (event.target.checked) {
        toggleBoard = true;
    } else {
        toggleBoard = false;
    }
}


var rotateMatrix = function(playboard) {
    let newMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    let oldMatrix = playboard;
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            //rotate playboard
            var value = oldMatrix[2-row][col];
            newMatrix[col][row] = value;
            //rotate gameboard
            var correspondingID = col * 3 + row;
            resetElement(correspondingID, value);
        }
    }
    return newMatrix 
}

var gravityMatrix = function(playboard) {
    for (var row = 1; row >= 0; row--) {
        for (var col = 0; col < 3; col++) {
            let  currentVal = playboard[row][col];
            if ( currentVal === 0) {
                continue
            }
            var newRow = 2;
            while (newRow > row) {
                if (playboard[newRow][col] === 0) {
                    playboard[newRow][col] = currentVal;
                    playboard[row][col] = 0;
                    let newid = newRow * 3 + col;
                    resetElement(newid, currentVal);
                    let oldid = row * 3 + col;
                    resetElement(oldid, 0); 
                    break;
                }
                newRow--
            }  
        }
    }
    return playboard;
}

var resetElement = function(id, value) {
    var text = '';
    if (value === 0) {
        text = ''
    } else if (value === 1) {
        text = 'X'
    } else {
        text = 'O'
    }
    document.getElementById(id).innerHTML = text;
}