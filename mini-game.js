import { generateNumber, addItem } from "./items.js"

(()=> {
let game = document.querySelector('.mini-game')
let context = game.getContext('2d')


const canvasMetrics = {
    cursor: {
        x: 0,
        y: 0
    },

    trigger: false,

    itemTrigger: {
        x: 0,
        y: 0
    }
}


const positiongenerator = () => {

    let maxX = game.width - item.clientWidth / 2
    let maxY = game.height - item.clientHeight / 2

    let offsetX = generateNumber(0, maxX)
    let offsetY = generateNumber(0, maxY)

    document.documentElement.style.setProperty('--left', offsetX + 'px')
    document.documentElement.style.setProperty('--top', offsetY + 'px')

}


function setTriggerDistance() {

    let itemrect = item.getBoundingClientRect()

    canvasMetrics.itemTrigger.x = itemrect.left
    canvasMetrics.itemTrigger.y = itemrect.top

}



function setCanvasSize() {
    game.width = window.innerWidth
    game.height = window.innerHeight
}

function setMetrics() {
    positiongenerator()
    setTriggerDistance()
}

setCanvasSize()

let item = addItem()

setMetrics()

context.fillStyle = '#3A0519'

window.addEventListener('resize', () => {

    // // Сохраняем содержимое как изображение
    // const imageData = context.getImageData(0, 0, oldWidth, oldHeight);

    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    setCanvasSize()

    setMetrics()

    context.fillStyle = '#3A0519'

    // овтечает чтобы не было квадрата очищенного у гранциы
    canvasMetrics.cursor.x = undefined
    canvasMetrics.cursor.y = undefined

    context.fillRect(0, 0, newWidth, newHeight)

})

function restart() {
    context.fillStyle = 'mistyrose'
    item.remove()
    canvasMetrics.trigger = !canvasMetrics.trigger
    context.fillRect(0, 0, game.width, game.height)
    item = addItem()
    setMetrics()
}



game.addEventListener('mousemove', (e) => {
    canvasMetrics.cursor.x = e.clientX
    canvasMetrics.cursor.y = e.clientY
})


game.addEventListener('touchmove', (e) => {
    e.preventDefault(); // отключаем прокрутку при свайпе

    const touch = e.touches[0];

    canvasMetrics.cursor.x = touch.clientX;
    canvasMetrics.cursor.y = touch.clientY;
}, { passive: false });

context.fillRect(0, 0, game.width, game.height)


function fillField() {

    let cursor = canvasMetrics.cursor
    let itemTrigger = canvasMetrics.itemTrigger

    if (cursor.x) {
        context.clearRect(cursor.x - 30,
            cursor.y - 30,
            60, 60)
    }

    // логика перезапуска
    if (cursor.x > itemTrigger.x
        && cursor.y > itemTrigger.y
        && cursor.x < itemTrigger.x + item.clientWidth
        && cursor.y < itemTrigger.y + item.clientHeight
        && !canvasMetrics.trigger) {

        canvasMetrics.trigger = !canvasMetrics.trigger
        item.classList.add('showOn')
        setTimeout(restart, 4000)
    }

    requestAnimationFrame(fillField)

} fillField()
})()