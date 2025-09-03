// в классах можно писать this от другиъ классов в цепочке и ошибки не будет 
// если на момент обращения к ним они есть 

// кроме того можно на любом уровне вложенности обращаться через this
// к любому свойству или мтеоду определенным где то в цепочке классов
// даже если из класса от которого наследуют обращаться через this
// к свойству которое у наследующего класса

// перекид через классы - называется миксины 
//  работают по принципу снежного кома - каждый класс на уровень выше 
// class Canvas extends CanasMethods(Playlogic) в этой цепочке 
// это сборище всех методов и свойств предыдущих классов
export class Playlogic {

    
fillField(canvasMetrics, item ,context) {
    console.log(canvasMetrics.clearingArea)
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
            setTimeout(() => this.restart(
                this.context, 
                this.canvasMetrics, 
                this.game
            ), 4000)
        }
    
        requestAnimationFrame(() => this.fillField(
            this.canvasMetrics, 
            this.item, 
            this.context
            ))
    
    } 
}