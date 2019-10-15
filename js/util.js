'use strict'

function getProperGuess(guessTxt) {
    return guessTxt.charAt(0).toUpperCase() + guessTxt.slice(1).toLowerCase();
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

