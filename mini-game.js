import { generateNumber, addItem } from "./items.js"
import { setTheme } from "./themes.js"

(()=> {

let game = document.querySelector('.mini-game')
let context = game.getContext('2d')
let counter = document.querySelector('.counter')


const canvasMetrics = {
    cursor: {
        x: 0,
        y: 0
    },

    trigger: false,

    itemTrigger: {
        x: 0,
        y: 0
    },

    clearingArea: {
        offset: 30,
        width: 60
    },

    gradient: null,

    gameSize: {
        width: game.width,
        height: game.height,
        gameCenterX: game.width/2,
        gameCenterY: game.height/2
    },

    counter: 0
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
    canvasMetrics.gameSize.width = game.width
    canvasMetrics.gameSize.height = game.height
    canvasMetrics.gameSize.centerX = game.width / 2
    canvasMetrics.gameSize.centerY = game.height / 2
}

function setMetrics() {
    positiongenerator()
    setTriggerDistance()
}

setCanvasSize()

let item = addItem()

setMetrics()

setTheme(context, game, canvasMetrics)


window.addEventListener('resize', () => {
console.log(canvasMetrics.gameSize)
    // // Сохраняем содержимое как изображение
    // const imageData = context.getImageData(0, 0, oldWidth, oldHeight);
    context.clearRect(0, 0, game.width, game.height)

    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    setCanvasSize()

    setMetrics()

    // овтечает чтобы не было квадрата очищенного у гранциы
    cleanUpCursor()

    context.fillStyle = canvasMetrics.gradient
    context.fillRect(0, 0, newWidth, newHeight)

})


function rotate(event){
    let x = (event.clientX - canvasMetrics.gameSize.centerX) * 0.008
    let y = (event.clientY - canvasMetrics.gameSize.centerY) * 0.008
    document.documentElement.style.setProperty('--rotateX', x + 'deg')
    document.documentElement.style.setProperty('--rotateY', y + 'deg')

}


game.addEventListener('mousemove', (e) => {
    canvasMetrics.cursor.x = e.clientX
    canvasMetrics.cursor.y = e.clientY
    rotate(e)
})


if (window.innerHeight < 500 || window.innerWidth < 600){
game.addEventListener('touchmove', (e) => {
    e.preventDefault(); // отключаем прокрутку при свайпе

    const touch = e.touches[0];
    rotate(e)

    canvasMetrics.cursor.x = touch.clientX;
    canvasMetrics.cursor.y = touch.clientY;
}, { passive: false });
}

function cleanUpCursor(){
    canvasMetrics.cursor.x = undefined
    canvasMetrics.cursor.y = undefined
}


function restart() { 
    item.remove() 
    canvasMetrics.trigger = !canvasMetrics.trigger 
    cleanUpCursor()
    context.fillRect(0, 0, game.width, game.height)
     item = addItem() 
     setMetrics()
     setTheme(context, game, canvasMetrics) }



function fillField() {

    let offset = canvasMetrics.clearingArea.offset
    let width = canvasMetrics.clearingArea.width

    let cursor = canvasMetrics.cursor
    let itemTrigger = canvasMetrics.itemTrigger

    if (cursor.x) {
        context.clearRect(
            cursor.x - offset,
            cursor.y - offset,
            width, 
            width
            )
    }

    // логика перезапуска
    if (cursor.x > itemTrigger.x
        && cursor.y > itemTrigger.y
        && cursor.x < itemTrigger.x + item.clientWidth
        && cursor.y < itemTrigger.y + item.clientHeight
        && !canvasMetrics.trigger) {

        canvasMetrics.counter++
        canvasMetrics.trigger = !canvasMetrics.trigger
        item.classList.add('showOn')
        cleanUpCursor()
        setTimeout(()=>{
            cleanUpCursor()
            restart()
            counter.textContent = canvasMetrics.counter
        }, 4000)
    }

    requestAnimationFrame(fillField)

} 
fillField()

})()

