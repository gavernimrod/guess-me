///////////////////////////////////////
/////////////   Service   /////////////
///////////////////////////////////////
'use strict'

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLocalStorageHasTree = false;
var gGameLog = '';
const QUEST_TREE_KEY = 'questTree'


function restartGlobalVars(){
    gLastRes = null;
    gPrevQuest = null;
    gNewQuestAns = null;
    gGameLog = '';
    gQuestsTree = loadFromStorage(QUEST_TREE_KEY);
    gCurrQuest = gQuestsTree;
}


function createQuestsTree() {
    if (gLocalStorageHasTree) {
        gQuestsTree = loadFromStorage(QUEST_TREE_KEY);
    } else {
        gQuestsTree = createQuest('Male');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function saveLog(speaker,value){
    var log = `${speaker}: ${value}`
    gGameLog += `${log}<br/><br/>`
}


function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, res, gFirstAnswer) {
    var newQuest = createQuest(newQuestTxt);
    // debugger;
    if (!gFirstAnswer) gFirstAnswer = 'yes';
    var gSecondAnswer = (gFirstAnswer === 'yes')? 'no' : 'yes';
    newQuest[gFirstAnswer] = createQuest(newGuessTxt)
    newQuest[gSecondAnswer] = gCurrQuest
    gPrevQuest[res] = newQuest;
    saveToStorge(QUEST_TREE_KEY,gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest;
}

function getQuestTree() {
    return gQuestsTree;
}


function getGameLog(){
    return gGameLog;
}

function saveToStorge(key,value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str)
    gLocalStorageHasTree = true;
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    return JSON.parse(str);
}





