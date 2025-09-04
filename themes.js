import { generateNumber } from "./items.js";


export const themes = [
    ['0f0c29', '302b63', '24243e', '363951'],
    ['654ea3', 'eaafc8', 'a6859df5'],
    ['F7F8F8', 'ACBB78', 'd4fbc56e'],
    ['fffbd5', 'b20a2c', 'f6fed4ba'],
    ['333333', '863535', '984a4a'],
    ['1e130c', '9a8478', '967062'],
    ['1F1C2C', '928DAB', '676377f5']
]


export function setTheme(context, game, metrics){

    let theme = generateNumber(0,themes.length-1)

    let gradient = context.createLinearGradient(0, 0, game.width, 0);

    if (theme == 0){
        gradient.addColorStop(0,   '#'+themes[theme][0]); // цвет слева
        gradient.addColorStop(0.5, '#'+themes[theme][1]); // цвет справа
        gradient.addColorStop(1,   '#'+themes[theme][2]); // цвет справа

        document.body.style.setProperty('--bg', '#'+themes[theme][3]);
    }
    else {
        gradient.addColorStop(0,   '#'+themes[theme][0]); // цвет слева
        gradient.addColorStop(1,   '#'+themes[theme][1]); // цвет справа

        document.body.style.setProperty('--bg', '#'+themes[theme][2]);
    } 

    context.clearRect(0,0,game.width, game.height)
    context.fillStyle = gradient
    context.fillRect(0,0,game.width, game.height)
    metrics.gradient = gradient
    
}
