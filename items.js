
export const items = [

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

export function generateNumber(min, max) {
    let number = Math.floor(Math.random() * (max - min + 1)) + min
    return number
}

export function addItem() {

    let gamecont = document.querySelector('.gamecont')

    const types = ['video', 'img']
    let type = generateNumber(0, types.length - 1) // тип элемента

    let element = document.createElement(types[type])
    element.classList.add('item')

    if (type == 0) {

        let src = generateNumber(0, items[0].length - 1)
        element.src = items[0][src]
        element.autoplay = true;
        element.muted = true;
        element.loop = true;

    } else {

        let src = generateNumber(0, items[1].length - 1)
        element.src = items[1][src]
    }

    gamecont.append(element)

    return element

}
