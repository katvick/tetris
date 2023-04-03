import { CANVAS_PROPERTIES } from "./const.js";

function getRandomFrom (array) {
    const index = Math.floor(Math.random() * array.length);
    return  array[index];
}

function getField (x, y, map) {
    if (map[y] === undefined || map[y][x] === undefined) {
        return 'black';
    }

    return map[y][x];
}

function setField (x, y, value, map) {
    if (map[y] === undefined || map[y][x] === undefined) {
        return;
    }

    return map[y][x] = value;
}

function canBlockExists (block, map) {
    for (const part of block.getIncludedParts()) {
        if (getField(part.x, part.y, map)) {
            return false;
        }
    }

    return true;
}

function clearCanvas(context) { 
    context.fillStyle = CANVAS_PROPERTIES.BACKGROUND;
    context.strokeStyle = 'grey';

    context.rect(0, 0, CANVAS_PROPERTIES.WIDTH, CANVAS_PROPERTIES.HEIGHT);
    context.fill();
    context.stroke();
}

// функция поиска заполненных линий, их удаление и опускание всех остальных элементов на ячейку вниз
function clearLines (map) {
    let lines = 0; 

    for (let y = CANVAS_PROPERTIES.ROW_NUMBERS - 1; y >= 0; y--) {
        let flag = true;

        for (let x = 0; x < CANVAS_PROPERTIES.COLUMNS_NUMBERS; x++) {
            if (!getField(x, y, map)) {
                flag = false;
                break;
            }
        }

        if (flag) {
            lines = lines + 1;
            for (let t = y; t >= 1; t--) {
                for (let x = 0; x < CANVAS_PROPERTIES.COLUMNS_NUMBERS; x++) {
                    map[t][x] = map[t - 1][x];
                    map[t - 1][x] = null;
                }
            }

            y = y + 1;
        }

    }

    return lines;
}

function saveBlock (block, map) {
    for (const part of block.getIncludedParts()) {
        setField(part.x, part.y, block.color, map)
    }
} 

export {
    getRandomFrom,
    canBlockExists,
    clearCanvas,
    clearLines,
    setField,
    saveBlock
};