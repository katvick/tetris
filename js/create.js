import { CANVAS_PROPERTIES } from './const.js';

// другие константы, которые зависят от глобальных
const fieldWidth = CANVAS_PROPERTIES.WIDTH / CANVAS_PROPERTIES.COLUMNS_NUMBERS;
const fieldHeight = CANVAS_PROPERTIES.HEIGHT / CANVAS_PROPERTIES.ROW_NUMBERS;

// ф-ия отрисовки квадратика
const drawField = (x, y, color, context) => {
    context.fillStyle = color;
    context. fillRect(
        x * fieldWidth + CANVAS_PROPERTIES.PADDING,
        y * fieldHeight + CANVAS_PROPERTIES.PADDING,
        fieldWidth - 2 * CANVAS_PROPERTIES.PADDING,
        fieldHeight - 2 * CANVAS_PROPERTIES.PADDING);
}

// ф-ия, которая рисует состояние map - все, что есть в map
const drawState = (map, context) => {
    for (let y = 0; y < CANVAS_PROPERTIES.ROW_NUMBERS; y++) {
        for (let x = 0; x < CANVAS_PROPERTIES.COLUMNS_NUMBERS; x++) {
            const field = map[y][x];

            if (field) {
                drawField(x, y, field, context);
            }
        }
    }
}

const drawBlock = (block, context) => {
    const parts = block.getIncludedParts();

    for (const part of parts) {
        drawField(part.x, part.y, block.color, context); 
    }
}

const getMap = () => {
    const map = [];

    for (let y = 0; y < CANVAS_PROPERTIES.ROW_NUMBERS; y++) {
        const row = [];

        for (let x = 0; x < CANVAS_PROPERTIES.COLUMNS_NUMBERS; x++) {
            row.push(null);
        }

        map.push(row);
    }

    return map;
}

const getBlock = (type, color = 'green', x = 4, y = 0) => {
    const block = { type, x, y, color };

    block.getIncludedParts = function () {
        const p = (dx, dy) => ({ x: block.x + dx, y: block.y + dy })

        switch(block.type) {
            case 1: return [p(0, 0), p(1, 0), p(0, 1), p(1, 1)];
            case 2: return [p(0, 0), p(-1, 0), p(1, 0), p(0, -1)];
            case 3: return [p(0, 0), p(-1, 0), p(1, 0), p(0, 1)];
            case 4: return [p(0, 0), p(1, 0), p(0, -1), p(0, 1)];
            case 5: return [p(0, 0), p(-1, 0), p(0, -1), p(0, 1)];
            case 6: return [p(0, 0), p(-1, 1), p(0, 1), p(1, 0)];
            case 7: return [p(0, 0), p(-1, 0), p(0, 1), p(1, 1)];
            case 8: return [p(0, 0), p(-1, -1), p(-1, 0), p(0, 1)];
            case 9: return [p(0, 0), p(-1, 0), p(-1, 1), p(0, -1)];
            case 10: return [p(0, 0), p(-1, 0), p(1, 0), p(2, 0)];
            case 11: return [p(0, 0), p(0, -1), p(0, 1), p(0, 2)];
            case 12: return [p(0, 0), p(0, 1), p(0, -1), p(1, -1)];
            case 13: return [p(0, 0), p(-1, 0), p(1, 0), p(1, 1)];
            case 14: return [p(0, 0), p(0, -1), p(0, 1), p(-1, 1)];
            case 15: return [p(0, 0), p(1, 0), p(-1, 0), p(-1, -1)];
            case 16: return [p(0, 0), p(0, -1), p(-1, -1), p(0, 1)];
            case 17: return [p(0, 0), p(-1, 0), p(1, 0), p(1, -1)];
            case 18: return [p(0, 0), p(0, -1), p(0, 1), p(1, 1)];
            case 19: return [p(0, 0), p(-1, 0), p(-1, 1), p(1, 0)];
        }

    }

    block.getNextBlock = function () {
        const p = n => getBlock(n, block.color, block.x, block.y);

        switch(block.type) {
            case 1: return p(1);
            case 2: return p(4);
            case 3: return p(5);
            case 4: return p(3);
            case 5: return p(2);
            case 6: return p(8);
            case 7: return p(9);
            case 8: return p(6);
            case 9: return p(7);
            case 10: return p(11);
            case 11: return p(10);
            case 12: return p(13);
            case 13: return p(14);
            case 14: return p(15);
            case 15: return p(12);
            case 16: return p(17);
            case 17: return p(18);
            case 18: return p(19);
            case 19: return p(16);
        }
    }

    block.getCopy = function () {
        return getBlock(block.type, block.color, block.x, block.y)
    }

    return block;
}

export {
    drawState,
    drawBlock,
    getMap,
    getBlock
};