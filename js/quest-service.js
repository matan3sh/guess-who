var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

const KEY = 'tree'

function createQuestsTree() {
    gQuestsTree = loadFromStorage(KEY)
    if (!gQuestsTree || gQuestsTree === null) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function getCurrQuest() {
    return gCurrQuest
}

function getPrevQuest() {
    return gPrevQuest
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    if (res === 'yes') gCurrQuest = gCurrQuest.yes
    else gCurrQuest = gCurrQuest.no
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuesNode = createQuest(newQuestTxt)
    var previousQuest = getPrevQuest()
    previousQuest[lastRes] = newQuesNode
    newQuesNode.no = gCurrQuest
    newQuesNode.yes = createQuest(newGuessTxt)
    saveToStorage(KEY, gQuestsTree)
}

function restartGame() {
    gPrevQuest = null
    gCurrQuest = gQuestsTree
}


