import {
    drawState,
    drawBlock,
    getMap,
    getBlock
} from './js/create.js';
import {
    CANVAS_PROPERTIES,
    START_BLOCK_NUMBERS,
    COLORS } from './js/const.js';
import {
    getRandomFrom,
    canBlockExists,
    clearCanvas,
    clearLines,
    saveBlock } from './js/utils.js';

const canvas1 = document.querySelector('#canvas1');
const canvas2 = document.querySelector('#canvas2');

const game1 = getGame(canvas1);
const game2 = getGame(canvas2);

game1.start();
game2.start();

// Прослушка событий
listen('KeyA', game1.moveBlockLeft);
listen('KeyD', game1.moveBlockRight);
listen('KeyW', game1.rotateBlock);
listen('KeyS', game1.moveBlockDown);

listen('ArrowLeft', game2.moveBlockLeft);
listen('ArrowRight', game2.moveBlockRight);
listen('ArrowUp', game2.rotateBlock);
listen('ArrowDown', game2.moveBlockDown);

function listen (code, handler) {
    document.body.addEventListener('keydown', function (e) {
        if (e.code === code) {
            e.preventDefault();
            handler();
        }
    })
}

game1.updateStatus = function updateState (scope, level, tertis) {
    const element =  document.querySelector('#status1');

    element.querySelector('[data-role="scope"]').textContent = scope;
    element.querySelector('[data-role="level"]').textContent = level;
    element.querySelector('[data-role="tetris"]').textContent = tertis;
}

game2.updateStatus = function updateState (scope, level, tertis) {
    const element =  document.querySelector('#status2');

    element.querySelector('[data-role="scope"]').textContent = scope;
    element.querySelector('[data-role="level"]').textContent = level;
    element.querySelector('[data-role="tetris"]').textContent = tertis;
}

function getGame (canvas) {
    const context = canvas.getContext('2d');

    const map = getMap();
    let block = getBlock(
        getRandomFrom(START_BLOCK_NUMBERS),
        getRandomFrom(COLORS)
    );

    let scope = 0;
    let level = 1;
    let tertis = 0;

    let downTime = getDownTime();

    canvas.width = CANVAS_PROPERTIES.WIDTH;
    canvas.height = CANVAS_PROPERTIES.HEIGHT;

    const game = {
        start,
        moveBlockLeft,
        moveBlockRight,
        rotateBlock,
        moveBlockDown,
        updateStatus
    };

    return game;

    function start () {
        requestAnimationFrame(tick)
    }

    function updateStatus () {}
    
    // tick - ф-я для обновления изображения
    function tick (timestamp) {
        if (timestamp >= downTime) {
            const blockCopy = block.getCopy();
            blockCopy.y = blockCopy.y + 1;
    
            if (canBlockExists(blockCopy, map)) {
                block = blockCopy;
            } else {
                saveBlock(block, map);
                const lines = clearLines(map);
    
                if (lines === 4) {
                    tertis++;
                }
    
                scope = scope + lines * 100;
                level = 1 + parseInt(scope / 300);
    
                block = getBlock(
                    getRandomFrom(START_BLOCK_NUMBERS),
                    getRandomFrom(COLORS)
                );
    
                game.updateStatus(scope, level, tertis);
    
                if (!canBlockExists(block, map)) {
                    alert('Конец игры!');
                    return;
                }
            }
    
            downTime = timestamp + getDownTime();
        }
    
        clearCanvas(context);
        drawBlock(block, context);
        drawState(map, context);
    
        requestAnimationFrame(tick)
    }
    
    function getDownTime () {
        return 100 + 900 / level;
    }
    
    function moveBlockLeft () {
        const blockCopy = block.getCopy();
    
        blockCopy.x = blockCopy.x - 1;
    
        checkCanBlockExists(blockCopy);
    }
    
    function moveBlockRight () {
        const blockCopy = block.getCopy();
    
        blockCopy.x = blockCopy.x + 1;
    
        checkCanBlockExists(blockCopy);
    }
    
    function rotateBlock () {
        const blockCopy = block.getNextBlock();
    
        checkCanBlockExists(blockCopy);
    }
    
    function moveBlockDown () {
        const blockCopy = block.getCopy();
    
        blockCopy.y = blockCopy.y + 1;
    
        checkCanBlockExists(blockCopy);
    }
    
    function checkCanBlockExists (blockCopy) {
        if (canBlockExists(blockCopy, map)) {
            block = blockCopy;
        }
    }  
}





