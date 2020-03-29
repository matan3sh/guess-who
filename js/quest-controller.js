'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
    onCloseModal()
}

function onStartGuessing() {
    onRestartGame()
    $('.game-start').hide()
    renderQuest();
}

function renderQuest() {
    const currQuest = getCurrQuest()
    $('.quest h2').text(currQuest.txt)
    $('.quest').show()
}

function onUserResponse(res) {
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            $('.modal').show()
        } else {
            alert('I dont know...teach me!')
            $('.quest').hide()
            $('.new-quest').show()
            $('.alert-modal').show()
        }
    } else {
        gLastRes = res
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var newQuest = $('#newQuest').val()
    var newGuess = $('#newGuess').val()
    if (newQuest === '' || newGuess === '') return
    addGuess(newQuest, newGuess, gLastRes)
    onRestartGame();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    $('.quest').hide();
    onCloseModal()
    gLastRes = null;
    restartGame()
}

function onCloseModal() {
    $('.modal').hide()
    $('.alert-modal').hide()
}
