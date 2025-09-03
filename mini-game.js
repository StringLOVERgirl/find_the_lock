    // let item = document.querySelector('.item')
    let game = document.querySelector('.mini-game')
    let context = game.getContext('2d')
    let h1 = document.querySelector('.task')
    let gamecont = document.querySelector('.gamecont')
// рефакторинг
// - собрать объект канвас и контекст 
// гейм конт вынести в функцию локальной 
// - убрать h1
// убрать ресайз флаг
// триггер флаг в объект с канвасом и контекстом

    let cursor = {
    x:0,
    y:0
}

const canvasMetrics = {
    x:undefined,
    y:undefined
}

    const flags = {
        trigger: false,
        resizeFlag: false
    }

    const itemTrigger = {
    
        x:0,
    y:0

}

    const items = [

        [
            './assets/bag.webm',
            './assets/beer.webm',
            './assets/clock.webm',
            './assets/dice.webm',
            './assets/drink.webm',
            './assets/gold.webm',
            './assets/lock.webm',
            './assets/phone.webm',
            './assets/tape.webm',

            './assets/Front(1).mp4',
            './assets/Front(2).mp4',
            './assets/Front(3).mp4',
            './assets/Front(4).mp4',
            './assets/Front.mp4'
        ],

       [
            './assets/06_3D_BTCFlower.png',
            './assets/08_3D_Receipt.png',
            './assets/11_3D_Column.png',
            './assets/Lifestyle_04.png'
        ]

]


function generateNumber(min,max){
    let number = Math.floor(Math.random() * (max - min + 1)) + min
    return number
}

    const positiongenerator = () => {

        let maxX = game.width - item.clientWidth/2
        let maxY = game.height - item.clientHeight/2
        let offsetX = generateNumber(0, maxX)
        // Math.floor(Math.random() * (maxX - 0 + 1)) + 0;
        let offsetY = generateNumber(0, maxY)
        // Math.floor(Math.random() * (maxY - 0 + 1))  0;
        document.documentElement.style.setProperty('--left',offsetX+'px')
        document.documentElement.style.setProperty('--top',offsetY+'px')

    }

    function addItem() {

        const types = ['video', 'img']
        let type = generateNumber(0, types.length - 1) // тип элемента

        let element = document.createElement(types[type])
        element.classList.add('item')

        if (type == 0) {
            let src = generateNumber(0, items[0].length - 1)
            element.src = items[0][src]
            element.autoplay = true;

// Отключаем звук (ОБЯЗАТЕЛЬНО для автовоспроизведения в большинстве браузеров)
element.muted = true;

// Зацикливаем видео
element.loop = true;
        } else {
            let src = generateNumber(0, items[1].length - 1)
            element.src = items[1][src]        }

        gamecont.append(element)

        return element

    }

    function setTriggerDistance(){

        let itemrect = item.getBoundingClientRect()
        
        itemTrigger.x = itemrect.left 
        itemTrigger.y = itemrect.top 

    }



    function setCanvasSize() {

game.width = window.innerWidth
game.height = window.innerHeight

} 

setCanvasSize()

// addItem()

let item = addItem()


positiongenerator()

setTriggerDistance()



window.addEventListener('resize', () => {
    const oldWidth = game.width;
    const oldHeight = game.height;

    // // Сохраняем содержимое как изображение
    const imageData = context.getImageData(0, 0, oldWidth, oldHeight);

    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;


    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = oldWidth;
    tempCanvas.height = oldHeight;
    tempCtx.putImageData(imageData, 0, 0);



    setCanvasSize()

    positiongenerator()
    

    setTriggerDistance()

    context.drawImage(tempCanvas, 0, 0, oldWidth, oldHeight,
     0, 0, newWidth , newHeight)

})



game.addEventListener('mousemove', (e)=>{
    let rect = game.getBoundingClientRect()
    canvasMetrics.x = e.clientX - rect.left
    canvasMetrics.y = e.clientY - rect.top

     cursor.x = e.clientX
     cursor.y = e.clientY
})


game.addEventListener('touchmove', (e) => {
    e.preventDefault(); // отключаем прокрутку при свайпе

    const touch = e.touches[0];
    let rect = game.getBoundingClientRect();

    canvasMetrics.x = touch.clientX - rect.left;
    canvasMetrics.y = touch.clientY - rect.top;

    cursor.x = touch.clientX;
    cursor.y = touch.clientY;
}, { passive: false });


context.fillRect(0,0, game.width, game.height)



function fillField() {

    if (canvasMetrics.x){
    context.clearRect(canvasMetrics.x - 30,
    canvasMetrics.y - 30,
    60, 60)}

    if (cursor.x > itemTrigger.x && 
    cursor.y > itemTrigger.y &&
    cursor.x < itemTrigger.x + item.clientWidth &&
    cursor.y < itemTrigger.y + item.clientHeight&&
      !flags.trigger) {
        flags.trigger = !flags.trigger
        item.classList.add('showOn')

        setTimeout(()=>{
            context.fillStyle = 'black'
            item.remove()
            flags.trigger = !flags.trigger
           context.fillRect(0,0, game.width, game.height)
           item = addItem()
           positiongenerator()
           setTriggerDistance()
        },5000)

    } 



    requestAnimationFrame(fillField)
} fillField()
    