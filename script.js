// Этот код подключает Telegram Web App API
let tg = window.Telegram.WebApp;

// Получаем кнопку из HTML по ID. Убедитесь, что у вашей кнопки в HTML есть id="buyBtn"
let btn = document.getElementById("buyBtn");

// Вешаем обработчик события на нажатие кнопки
btn.addEventListener("click", function(){
    // Создаем объект с данными для отправки в бот
    // amount: 1 означает, что мы хотим купить 1 "укус" за 1 звезду.
    let data = {
        amount: 1 
    };
    
    // Отправляем данные в Telegram боту
    tg.sendData(JSON.stringify(data));
});