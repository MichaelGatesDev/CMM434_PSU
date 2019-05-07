let cardsArr = [];

let minX = -1;
let maxX = -1;

let paused = false;

/**
 * Gets the narrowest and widest card widths
 * @param {*} cards The jQuery objects in a standard array
 */
function getExtents() {
    let narrowest = -1;
    let widest = -1;
    for (let i = 0; i < cardsArr.length; i++) {
        let card = cardsArr[i];
        if (narrowest === -1 || card.width < narrowest)
            narrowest = card.width();
        else if (widest === -1 || card.width > widest)
            widest = card.width();
    }
    return {
        narrowest: narrowest,
        widest: widest
    };
}

function initialize() {
    // put cards in array
    cardsArr = [];
    $('.club-card').each(function () {
        cardsArr.push($(this));
    });

    // calculate extents
    let extents = getExtents(cardsArr);
    minX = -extents.narrowest;
    maxX = extents.widest;

    // setup the initial positions
    setupPositions();
}

function setupPositions() {
    let lastX = 0;
    let index = 0;
    for (const card of cardsArr) {
        let newX = index == 0 ? 0 : lastX + card.width();
        card.css({
            'left': newX
        });
        lastX = newX;
        index++;
    }
}

function getLastCardX() {
    let maxX = -1;
    for (const card of cardsArr) {
        let left = parseInt(card.css('left'), 10);
        let width = card.width();
        let x = left + width;
        if (maxX === -1 || x > maxX) maxX = x;
    }
    return maxX;
}

function moveLeft(element, amtInPixels) {
    var position = element.position();
    var left = position.left;
    element.css({
        'left': (left - amtInPixels < minX ? getLastCardX() : left - amtInPixels)
    });
}

function moveAllLeft() {
    if (paused) return;
    for (const card of cardsArr) {
        moveLeft(card, 1);
    }
}

initialize();

setInterval(moveAllLeft, 1000 / 60);

$('.club-card').hover(function () {
    paused = true;
    $(this).find('.title').css({
        display: 'block'
    });
}, function () {
    paused = false;
    $(this).find('.title').css({
        display: 'none'
    });
});