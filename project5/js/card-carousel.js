let paused = false;
let clubCardWidth = $('.club-card').width();

console.log(`Club card width is ${clubCardWidth}`);

let minX;
let maxX;

function setupPositions() {
    var cardsAmt = $('.club-card').length;

    minX = -clubCardWidth;
    maxX = (cardsAmt * clubCardWidth) + clubCardWidth;

    console.log(`Card minX is ${minX}, maxX is ${maxX}`);

    $('.club-card').each(function (index) {
        var width = $(this).width();
        $(this).css({
            'left': index * width
        });

        var position = $(this).position();
        var left = position.left;
        console.log("Starting at: " + left);
    });
}

function moveLeft(element, amt) {

    if (paused) return;

    var width = element.width();
    var position = element.position();
    var left = position.left;
    var viewportWidth = $(window).width();

    element.css({
        'left': (left - amt < minX ? maxX : left - amt)
    });
}

function moveAllLeft() {
    $('.club-card').each(function (index) {
        moveLeft($(this), 1);
    });
}

function getLastCardPosition() {

}

function getAfterLastCardPosition() {

}

function start() {
    setInterval(moveAllLeft, 1000 / 60);
}

$('.club-card').hover(function () {
    paused = true;
}, function () {
    paused = false;
});

setupPositions();
start();