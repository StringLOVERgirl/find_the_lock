import { generateNumber } from "./items.js";


export const themes = [
    ['0f0c29', '302b63', '24243e', '767a9e'],
    ['654ea3', 'eaafc8', '1a1026'],
    ['ff5f6d', 'ffc371', '3A0519'],
    ['dd3e54', '6be585', '202824'],
    ['333333', 'dd1818', 'ff5151'],
    ['1e130c', '9a8478', '967062'],
    ['1F1C2C', '928DAB', '0f0d19']
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
