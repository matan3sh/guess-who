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
            showWinnigModal()
        } else {
            alert('I dont know...teach me!')
            $('.quest').hide()
            $('.new-quest').show()
            showAlertModal()
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

function showWinnigModal() {
    var strHtml = ` <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Victorius!</h5>
                                <button type="button" class="btn btn-dark" onclick="onCloseModal()" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body text-center">
                                <p>You Win</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" onclick="onRestartGame()">Restart game</button>
                            </div>
                        </div>
                    </div>
    `
    $('.modal').html(strHtml)
    $('.modal').show()
}

function showAlertModal() {
    var strHtml = ` <h4 class="alert-heading">Help to make us better</h4>
                    <hr>
                    <p class="mb-0">Unfortunately, we were unable to identify what you were thinking of, but we would love to add it to our repository</p>
    `
    $('.alert-modal').html(strHtml)
    $('.alert-modal').show()
}

function onCloseModal() {
    $('.modal').hide()
    $('.alert-modal').hide()
}