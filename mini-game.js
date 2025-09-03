import { generateNumber, addItem } from "./items.js"
import { CanasMethods } from "./metrics_logic.js"
import { Playlogic } from "./playlogic.js"


class Canvas extends CanasMethods(Playlogic) {

    constructor(){
        super()
        this.game = document.querySelector('.mini-game')
        this.context = this.game.getContext('2d')
    
        this.item = undefined


 this.canvasMetrics = {
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
    }
}

    }



 setMetrics() {
    console.log(1)
    super.positiongenerator(this.game, this.item)
    super.setTriggerDistance(this.item , this.canvasMetrics)
}


init(context, game){
    super.setCanvasSize(this.game)

    this.item = addItem()
    
    this.setMetrics()

    context.fillStyle = '#3A0519'

    context.fillRect(0, 0, game.width, game.height)


}


setListeners(context, canvasMetrics, game){

window.addEventListener('resize', () => {

    // // Сохраняем содержимое как изображение
    // const imageData = context.getImageData(0, 0, oldWidth, oldHeight);

    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    super.setCanvasSize(this.game)

    this.setMetrics()

    context.fillStyle = '#3A0519'

    // овтечает чтобы не было квадрата очищенного у гранциы
    canvasMetrics.cursor.x = undefined
    canvasMetrics.cursor.y = undefined

    context.fillRect(0, 0, newWidth, newHeight)

})


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

}

 restart(context, canvasMetrics, game) {
    context.fillStyle = 'mistyrose'
    this.item.remove()
    canvasMetrics.trigger = !canvasMetrics.trigger
    context.fillRect(0, 0, game.width, game.height)
    this.item = addItem()
    this.setMetrics()
}


}

let start = new Canvas()
console.log(start.context)
start.init(start.context, start.game, start.item)
start.setListeners(start.context, start.canvasMetrics, start.game)
start.fillField(start.canvasMetrics, start.item, start.context)
