// Объект, содержащий все возможные подарки в приложении.
const allGifts = {
    // ЗАМЕНИТЕ ЭТИ URL-АДРЕСА НА ВАШИ РЕАЛЬНЫЕ ССЫЛКИ НА ИЗОБРАЖЕНИЯ
    wineBottle_1: { name: 'Вино "Классическое"', value: 10, image: 'https://i.ibb.co/37y4027/gift.jpg' },
    wineBottle_2: { name: 'Вино "Пино Нуар"', value: 12, image: 'https://i.ibb.co/L5hY59n/bear.jpg' },
    wineBottle_3: { name: 'Вино "Совиньон"', value: 15, image: 'https://i.ibb.co/P440f80/ring.jpg' },
    wineBottle_4: { name: 'Вино "Каберне"', value: 18, image: 'https://i.ibb.co/BPL233B/rocket.jpg' },
    wineBottle_5: { name: 'Вино "Мерло"', value: 20, image: 'https://i.ibb.co/m0fH4L3/Jester-Hat.jpg' },
    wineBottle_6: { name: 'Вино "Розе"', value: 22, image: 'https://i.ibb.co/1n5b64S/Snoop-Cigar.jpg' },
    wineBottle_7: { name: 'Вино "Рислинг"', value: 25, image: 'https://i.ibb.co/F6bF9hP/Snake-Box.jpg' },
    wineBottle_8: { name: 'Вино "Шардоне"', value: 30, image: 'https://i.ibb.co/m4xL27N/Lol-Pop.jpg' },
    wineBottle_9: { name: 'Вино "Порто"', value: 35, image: 'https://i.ibb.co/t4jT00y/Desk-Calendar.jpg' },
    wineBottle_10: { name: 'Вино "Красное полусладкое"', value: 40, image: 'https://i.ibb.co/PcgR6sP/Jade-Lantern.jpg' },
    
    // Ваши подарки
    heart: { name: 'Сердце', value: 15, image: 'https://i.ibb.co/P440f80/ring.jpg' }, 
    bear: { name: 'Мишка', value: 14, image: 'https://i.ibb.co/L5hY59n/bear.jpg' },
    giftBox: { name: 'Подарок', value: 25, image: 'https://i.ibb.co/37y4027/gift.jpg' },
    rose: { name: 'Роза', value: 25, image: 'https://i.ibb.co/BPL233B/rocket.jpg' },
    cake: { name: 'Торт', value: 50, image: 'https://i.ibb.co/m0fH4L3/Jester-Hat.jpg' },
    bouquet: { name: 'Букет', value: 50, image: 'https://i.ibb.co/1n5b64S/Snoop-Cigar.jpg' },
    rocket: { name: 'Ракета', value: 50, image: 'https://i.ibb.co/F6bF9hP/Snake-Box.jpg' },
    trophy: { name: 'Кубок', value: 100, image: 'https://i.ibb.co/m4xL27N/Lol-Pop.jpg' },
    ring: { name: 'Кольцо', value: 100, image: 'https://i.ibb.co/P440f80/ring.jpg' },
    diamond: { name: 'Бриллиант', value: 100, image: 'https://i.ibb.co/PcgR6sP/Jade-Lantern.jpg' },
    champagne: { name: 'Шампанское', value: 50, image: 'https://i.ibb.co/PcgR6sP/Jade-Lantern.jpg' },
    birthdayCake: { name: 'Праздничный торт', value: 500, image: 'https://i.ibb.co/m0fH4L3/Jester-Hat.jpg' },
    calendarBday: { name: 'Календарь B-DAY', value: 50, image: 'https://i.ibb.co/F6bF9hP/Snake-Box.jpg' },
    happyBday: { name: 'Happy B-Day', value: 50, image: 'https://i.ibb.co/1n5b64S/Snoop-Cigar.jpg' },
    newYear: { name: 'Новый год 2023', value: 50, image: 'https://i.ibb.co/PcgR6sP/Jade-Lantern.jpg' },
};

// Массив, содержащий все кейсы.
const cases = [
    {
        id: 1,
        name: 'Бомж деп',
        description: 'Кейс для самых скромных.',
        // ЗАМЕНИТЕ ЭТОТ URL-АДРЕС НА ВАШ РЕАЛЬНЫЙ
        image: 'https://i.ibb.co/P440f80/ring.jpg',
        price: 25,
        items: [
            { gift: allGifts.wineBottle_1, chance: 15 },
            { gift: allGifts.wineBottle_2, chance: 15 },
            { gift: allGifts.wineBottle_3, chance: 15 },
            { gift: allGifts.wineBottle_4, chance: 15 },
            { gift: allGifts.wineBottle_5, chance: 10 },
            { gift: allGifts.giftBox, chance: 10 },
            { gift: allGifts.heart, chance: 5 },
            { gift: allGifts.bear, chance: 5 },
            { gift: allGifts.cake, chance: 5 },
            { gift: allGifts.trophy, chance: 2.5 }, 
            { gift: allGifts.ring, chance: 2.5 },   
            { gift: allGifts.diamond, chance: 0.5 }, 
            { gift: allGifts.birthdayCake, chance: 0.5 }, 
        ]
    },
    // Здесь вы можете добавить другие кейсы по аналогии
];

document.addEventListener('DOMContentLoaded', () => {
    const caseGrid = document.getElementById('caseGrid');
    const balanceAmount = document.getElementById('balanceAmount');
    const caseModal = document.getElementById('caseModal');
    const purchaseModal = document.getElementById('purchaseModal');
    const modalCaseName = document.getElementById('modalCaseName');
    const modalCaseImage = document.getElementById('modalCaseImage');
    const modalCaseDescription = document.getElementById('modalCaseDescription');
    const modalCasePrice = document.getElementById('modalCasePrice');
    const modalOpenButton = document.getElementById('modalOpenButton');
    const modalCaseItems = document.getElementById('modalCaseItems');
    const addBalanceBtn = document.getElementById('addBalanceBtn');
    const modalCloseButtons = document.querySelectorAll('.modal-close-button');
    const purchaseButtons = document.querySelectorAll('.purchase-button');

    let selectedCase = null;

    // Инициализация Web App
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.ready();
    }

    function generateCaseBoxes() {
        caseGrid.innerHTML = '';
        cases.forEach(caseData => {
            const caseBox = document.createElement('div');
            caseBox.className = 'case-box';
            caseBox.dataset.caseId = caseData.id;
            caseBox.innerHTML = `
                <img src="${caseData.image}" alt="${caseData.name}">
                <h3>${caseData.name}</h3>
                <div class="case-price">
                    ${caseData.price} <span>⭐</span>
                </div>
            `;
            caseBox.addEventListener('click', () => {
                openCaseModal(caseData);
            });
            caseGrid.appendChild(caseBox);
        });
    }

    function openCaseModal(caseData) {
        selectedCase = caseData;
        modalCaseName.textContent = caseData.name;
        modalCaseImage.src = caseData.image;
        modalCaseDescription.textContent = caseData.description;
        modalCasePrice.textContent = caseData.price;
        modalOpenButton.textContent = `Открыть кейс за ${caseData.price} ⭐`;

        modalCaseItems.innerHTML = '';
        caseData.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'modal-item';
            itemElement.innerHTML = `
                <img src="${item.gift.image}" alt="${item.gift.name}">
                <p>${item.gift.name}</p>
                <p>${item.chance}%</p>
            `;
            modalCaseItems.appendChild(itemElement);
        });

        caseModal.style.display = 'flex';
    }

    function closeAllModals() {
        caseModal.style.display = 'none';
        purchaseModal.style.display = 'none';
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

    modalOpenButton.addEventListener('click', () => {
        if (!selectedCase) return;

        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.sendData) {
            window.Telegram.WebApp.sendData(JSON.stringify({ 
                type: 'openCase', 
                price: selectedCase.price,
                // Генерация и отправка выигрыша
                wonGift: getRandomItem(selectedCase.items) 
            }));
        }
        closeAllModals();
    });

    addBalanceBtn.addEventListener('click', () => {
        purchaseModal.style.display = 'flex';
    });
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amount = button.dataset.amount;
            if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.sendData) {
                window.Telegram.WebApp.sendData(JSON.stringify({ 
                    type: 'purchase', 
                    amount: amount 
                }));
            }
            closeAllModals();
        });
    });

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });

    generateCaseBoxes();
});