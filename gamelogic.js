export function fillField(canvasMetrics, context, item) {
console.log(canvasMetrics)
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

        canvasMetrics.trigger = !canvasMetrics.trigger
        item.classList.add('showOn')
        setTimeout(restart, 4000)
    }

    requestAnimationFrame(()=>fillField(canvasMetrics, cozz))

} 