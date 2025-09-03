import { generateNumber } from "./items.js"

export const CanasMethods = (parentClass) => class extends parentClass {

 positiongenerator (game, item) {

    let maxX = game.width - item.clientWidth / 2
    let maxY = game.height - item.clientHeight / 2

    let offsetX = generateNumber(0, maxX)
    let offsetY = generateNumber(0, maxY)

    document.documentElement.style.setProperty('--left', offsetX + 'px')
    document.documentElement.style.setProperty('--top', offsetY + 'px')

}


 setTriggerDistance(item, canvasMetrics) {

    let itemrect = item.getBoundingClientRect()

    canvasMetrics.itemTrigger.x = itemrect.left
    canvasMetrics.itemTrigger.y = itemrect.top

}



 setCanvasSize(game) {
    game.width = window.innerWidth
    game.height = window.innerHeight
}
}