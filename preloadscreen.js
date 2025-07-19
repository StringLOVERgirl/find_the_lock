
const percentageDisplay = document.getElementById('percentage');
const preloader = document.getElementById('preloader');
let currentPercentage = 0;
let interval;

function updatePercentage() {
    // Увеличиваем процент на случайное небольшое число,
    // чтобы создать эффект "прогресса".
    currentPercentage += Math.floor(Math.random() * 5)

    if (currentPercentage >= 99) {
        currentPercentage = 99;
        clearInterval(interval); // Останавливаем интервал, если достигли 99%
    }

    percentageDisplay.textContent = currentPercentage + '%';
}

interval = setInterval(updatePercentage, 520)

window.addEventListener('load', function() {
    clearInterval(interval)
    percentageDisplay.textContent = '100%';

    // Добавляем класс 'hidden' для плавного исчезновения прелоадера
    preloader.classList.add('hidden');


    preloader.addEventListener('transitionend', function() {
       
        preloader.style.display = 'none';
        
    }, { once: true }); // Убедимся, что слушатель удалится после первого срабатывания


})
