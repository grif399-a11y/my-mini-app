// Объект, содержащий все возможные подарки в приложении.
// Это центральный "склад" подарков.
const allGifts = {
    wineBottle_1: { name: 'Вино "Классическое"', value: 10, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_1.png' },
    wineBottle_2: { name: 'Вино "Пино Нуар"', value: 12, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_2.png' },
    wineBottle_3: { name: 'Вино "Совиньон"', value: 15, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_3.png' },
    wineBottle_4: { name: 'Вино "Каберне"', value: 18, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_4.png' },
    wineBottle_5: { name: 'Вино "Мерло"', value: 20, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_5.png' },
    wineBottle_6: { name: 'Вино "Розе"', value: 22, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_6.png' },
    wineBottle_7: { name: 'Вино "Рислинг"', value: 25, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_7.png' },
    wineBottle_8: { name: 'Вино "Шардоне"', value: 30, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_8.png' },
    wineBottle_9: { name: 'Вино "Порто"', value: 35, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_9.png' },
    wineBottle_10: { name: 'Вино "Красное полусладкое"', value: 40, image: 'ВАША_ССЫЛКА_НА_ИЗОБРАЖЕНИЕ_ВИНА_10.png' },
    
    // Ваши подарки
    heart: { name: 'Сердце', value: 15, image: 'https://i.ibb.co/L5hY59n/bear.jpg' }, 
    bear: { name: 'Мишка', value: 14, image: 'https://i.ibb.co/37y4027/gift.jpg' },
    giftBox: { name: 'Подарок', value: 25, image: 'https://i.ibb.co/P440f80/ring.jpg' },
    rose: { name: 'Роза', value: 25, image: 'https://i.ibb.co/BPL233B/rocket.jpg' },
    cake: { name: 'Торт', value: 50, image: 'https://i.ibb.co/m0fH4L3/Jester-Hat.jpg' },
    bouquet: { name: 'Букет', value: 50, image: 'https://i.ibb.co/1n5b64S/Snoop-Cigar.jpg' },
    rocket: { name: 'Ракета', value: 50, image: 'https://i.ibb.co/F6bF9hP/Snake-Box.jpg' },
    trophy: { name: 'Кубок', value: 100, image: 'https://i.ibb.co/m4xL27N/Lol-Pop.jpg' },
    ring: { name: 'Кольцо', value: 100, image: 'https://i.ibb.co/t4jT00y/Desk-Calendar.jpg' },
    diamond: { name: 'Бриллиант', value: 100, image: 'https://i.ibb.co/PcgR6sP/Jade-Lantern.jpg' },
    champagne: { name: 'Шампанское', value: 50, image: 'https://i.ibb.co/PcgR6sP/Jade-Lantern.jpg' },
    birthdayCake: { name: 'Праздничный торт', value: 500, image: 'https://i.ibb.co/m0fH4L3/Jester-Hat.jpg' },
    calendarBday: { name: 'Календарь B-DAY', value: 50, image: 'https://i.ibb.co/F6bF9hP/Snake-Box.jpg' },
    happyBday: { name: 'Happy B-Day', value: 50, image: 'https://i.ibb.co/1n5b64S/Snoop-Cigar.jpg' },
    newYear: { name: 'Новый год 2023', value: 50, image: 'https://i.ibb.co/PcgR6sP/Jade-Lantern.jpg' },
};

// Массив, содержащий все кейсы.
// Кейсы могут содержать любые подарки из allGifts.
const cases = [
    {
        id: 1,
        name: 'Бомж деп',
        description: 'Кейс для самых скромных.',
        image: 'ВАША_ССЫЛКА_НА_КАРТИНКУ_КЕЙСА_БОМЖ_ДЕП.png',
        price: 25, // Цена за открытие кейса
        items: [
            // Шансы распределены так, что дорогие подарки имеют очень маленький шанс.
            { gift: allGifts.wineBottle_1, chance: 15 },
            { gift: allGifts.wineBottle_2, chance: 15 },
            { gift: allGifts.wineBottle_3, chance: 15 },
            { gift: allGifts.wineBottle_4, chance: 15 },
            { gift: allGifts.wineBottle_5, chance: 10 },
            { gift: allGifts.giftBox, chance: 10 },
            { gift: allGifts.heart, chance: 5 },
            { gift: allGifts.bear, chance: 5 },
            { gift: allGifts.cake, chance: 5 },
            { gift: allGifts.trophy, chance: 2.5 }, // Редкий
            { gift: allGifts.ring, chance: 2.5 },   // Редкий
            { gift: allGifts.diamond, chance: 0.5 }, // Очень редкий
            { gift: allGifts.birthdayCake, chance: 0.5 }, // Очень редкий
        ]
    },
    // Здесь вы можете добавить другие кейсы по аналогии
];


document.addEventListener('DOMContentLoaded', () => {
    const caseContainer = document.getElementById('caseContainer');
    const balanceSpan = document.getElementById('balance');
    const openCaseButton = document.getElementById('openCaseButton');
    const caseModal = document.getElementById('caseModal');
    const closeCaseModalButton = document.getElementById('closeCaseModal');
    const modalCaseTitle = document.getElementById('modalCaseTitle');
    const modalCaseDescription = document.getElementById('modalCaseDescription');
    const modalCaseImage = document.getElementById('modalCaseImage');
    const modalItemsList = document.getElementById('modalItemsList');
    const modalOpenCaseButton = document.getElementById('modalOpenCaseButton');
    const winningModal = document.getElementById('winningModal');
    const winningItemImage = document.getElementById('winningItemImage');
    const winningItemName = document.getElementById('winningItemName');
    const winningItemValue = document.getElementById('winningItemValue');
    const closeWinningModalButton = document.getElementById('closeWinningModal');
    
    // Новая кнопка "Продать"
    const sellButton = document.getElementById('sellButton');

    let userBalance = 0;
    let selectedCase = null;
    let lastWonGift = null;

    // Инициализация Web App
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
    }

    function generateCaseBoxes() {
        caseContainer.innerHTML = '';
        cases.forEach(caseData => {
            const caseBox = document.createElement('div');
            caseBox.className = 'case-box';
            caseBox.innerHTML = `
                <img src="${caseData.image}" alt="${caseData.name}">
                <h3>${caseData.name}</h3>
                <p>${caseData.description}</p>
                <button class="open-case-btn" data-case-id="${caseData.id}">Открыть за ${caseData.price} ⭐</button>
            `;
            caseBox.querySelector('.open-case-btn').addEventListener('click', () => {
                openCaseModal(caseData);
            });
            caseContainer.appendChild(caseBox);
        });
    }

    function openCaseModal(caseData) {
        selectedCase = caseData;
        modalCaseTitle.textContent = caseData.name;
        modalCaseDescription.textContent = caseData.description;
        modalCaseImage.src = caseData.image;
        modalOpenCaseButton.textContent = `Открыть за ${caseData.price} ⭐`;

        modalItemsList.innerHTML = '';
        caseData.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <img src="${item.gift.image}" alt="${item.gift.name}">
                <span>${item.gift.name}</span>
                <span class="item-value">${item.gift.value} ⭐</span>
                <span class="item-chance">${item.chance}%</span>
            `;
            modalItemsList.appendChild(listItem);
        });

        caseModal.style.display = 'block';
    }

    function closeCaseModal() {
        caseModal.style.display = 'none';
        selectedCase = null;
    }

    function closeWinningModal() {
        winningModal.style.display = 'none';
    }

    function getRandomItem(items) {
        const totalChance = items.reduce((sum, item) => sum + item.chance, 0);
        let randomNum = Math.random() * totalChance;
        for (const item of items) {
            randomNum -= item.chance;
            if (randomNum <= 0) {
                return item.gift;
            }
        }
        return items[items.length - 1].gift;
    }

    modalOpenCaseButton.addEventListener('click', () => {
        if (!selectedCase) return;

        // Отправляем запрос боту на открытие кейса
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.sendData) {
            window.Telegram.WebApp.sendData(JSON.stringify({ type: 'openCase', price: selectedCase.price }));
        }

        // Логика открытия кейса
        const wonGift = getRandomItem(selectedCase.items);
        lastWonGift = wonGift; // Сохраняем выигранный подарок
        
        // Обновление модального окна с выигрышем
        winningItemImage.src = wonGift.image;
        winningItemName.textContent = wonGift.name;
        winningItemValue.textContent = `${wonGift.value} ⭐`;
        winningModal.style.display = 'block';
        closeCaseModal();
    });

    // Новая логика для кнопки "Продать"
    sellButton.addEventListener('click', () => {
        if (lastWonGift) {
            const sellValue = lastWonGift.value;
            if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.sendData) {
                // Отправляем боту данные о продаже
                window.Telegram.WebApp.sendData(JSON.stringify({ type: 'sellGift', value: sellValue }));
            }
            // Закрываем модальное окно после продажи
            closeWinningModal();
        }
    });

    closeCaseModalButton.addEventListener('click', closeCaseModal);
    closeWinningModalButton.addEventListener('click', closeWinningModal);

    generateCaseBoxes();
});