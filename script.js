// Объект, содержащий все возможные подарки в приложении.
const allGifts = {
    bear: { name: 'Мишка', value: 15, image: 'https://i.ibb.co/L5hY59n/bear.jpg' }, 
    giftBox: { name: 'Подарок', value: 25, image: 'https://i.ibb.co/37y4027/gift.jpg' },
    rocket: { name: 'Ракета', value: 50, image: 'https://i.ibb.co/BPL233B/rocket.jpg' },
    ring: { name: 'Кольцо', value: 100, image: 'https://i.ibb.co/P440f80/ring.jpg' },
};

// Массив, содержащий все кейсы.
const cases = [
    {
        id: 1,
        name: 'Бомж деп',
        description: 'Кейс для самых скромных.',
        image: 'https://via.placeholder.com/150/FFC0CB/000000?text=Бомж_деп',
        price: 25,
        items: [
            { gift: allGifts.bear, chance: 70 },
            { gift: allGifts.giftBox, chance: 30 },
        ]
    },
    {
        id: 2,
        name: 'Мини деп',
        description: 'Шанс на более ценные подарки.',
        image: 'https://via.placeholder.com/150/87CEEB/000000?text=Мини_деп',
        price: 75,
        items: [
            { gift: allGifts.giftBox, chance: 60 },
            { gift: allGifts.rocket, chance: 40 },
        ]
    },
    {
        id: 3,
        name: 'Просто деп',
        description: 'Для тех, кто готов рискнуть.',
        image: 'https://via.placeholder.com/150/9370DB/000000?text=Просто_деп',
        price: 150,
        items: [
            { gift: allGifts.rocket, chance: 50 },
            { gift: allGifts.ring, chance: 50 },
        ]
    },
    {
        id: 4,
        name: 'Мега деп',
        description: 'Шанс на самый ценный подарок!',
        image: 'https://via.placeholder.com/150/FFD700/000000?text=Мега_деп',
        price: 250,
        items: [
            { gift: allGifts.ring, chance: 100 },
        ]
    },
];

// Текущий баланс пользователя
let currentBalance = 0;
let userInventory = [];

// Инициализация Telegram WebApp
document.addEventListener('DOMContentLoaded', () => {
    initializeTelegramWebApp();
    setupEventListeners();
    generateCaseBoxes();
    loadUserData();
});

// Инициализация Telegram WebApp
function initializeTelegramWebApp() {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
        
        // Получаем данные пользователя
        const user = Telegram.WebApp.initDataUnsafe.user;
        if (user) {
            document.querySelector('h3').textContent = `@${user.username}`;
        }
    }
}

// Загрузка данных пользователя
function loadUserData() {
    // В реальном приложении здесь будет запрос к боту
    // Пока используем заглушку
    updateBalanceDisplay();
}

// Настройка обработчиков событий
function setupEventListeners() {
    const caseGrid = document.getElementById('caseGrid');
    const balanceAmount = document.getElementById('balanceAmount');
    const caseModal = document.getElementById('caseModal');
    const modalCaseName = document.getElementById('modalCaseName');
    const modalCaseDescription = document.getElementById('modalCaseDescription');
    const modalOpenButton = document.getElementById('modalOpenButton');
    const modalCaseItems = document.getElementById('modalCaseItems');
    const modalCloseButtons = document.querySelectorAll('.modal-close-button');
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.main-content');
    const addBalanceBtn = document.getElementById('addBalanceBtn');
    
    // Обработчик для кнопок меню
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            switchPage(item.dataset.page);
        });
    });

    // Закрытие модального окна
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            caseModal.style.display = 'none';
        });
    });

    // Кнопка пополнения баланса
    addBalanceBtn.addEventListener('click', () => {
        requestBalanceTopUp();
    });

    // Клик по области вокруг модального окна
    window.addEventListener('click', (e) => {
        if (e.target === caseModal) {
            caseModal.style.display = 'none';
        }
    });
}

// Переключение страниц
function switchPage(pageId) {
    const pages = document.querySelectorAll('.main-content');
    const navItems = document.querySelectorAll('.nav-item');
    
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) {
            item.classList.add('active');
        }
    });
}

// Генерация кейсов
function generateCaseBoxes() {
    const caseGrid = document.getElementById('caseGrid');
    caseGrid.innerHTML = '';
    
    cases.forEach(caseData => {
        const caseBox = document.createElement('div');
        caseBox.className = 'case-box';
        caseBox.innerHTML = `
            <div class="case-price">${caseData.price} <i class="fas fa-gem"></i></div>
            <img src="${caseData.image}" alt="${caseData.name}" onerror="this.src='https://via.placeholder.com/150/333/fff?text=Кейс'">
            <h3>${caseData.name}</h3>
        `;
        caseBox.addEventListener('click', () => openCaseModal(caseData));
        caseGrid.appendChild(caseBox);
    });
}

// Открытие модального окна кейса
function openCaseModal(caseData) {
    const caseModal = document.getElementById('caseModal');
    const modalCaseName = document.getElementById('modalCaseName');
    const modalCaseDescription = document.getElementById('modalCaseDescription');
    const modalOpenButton = document.getElementById('modalOpenButton');
    const modalCaseItems = document.getElementById('modalCaseItems');
    
    modalCaseName.textContent = caseData.name;
    modalCaseDescription.textContent = caseData.description;
    modalOpenButton.textContent = `Открыть за ${caseData.price} ⭐`;
    modalOpenButton.onclick = () => openCase(caseData);
    
    // Отображаем содержимое кейса
    modalCaseItems.innerHTML = '';
    caseData.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'modal-item';
        itemElement.innerHTML = `
            <img src="${item.gift.image}" alt="${item.gift.name}" onerror="this.src='https://via.placeholder.com/60/333/fff?text=Приз'">
            <p>${item.gift.name}</p>
            <p>${item.chance}%</p>
        `;
        modalCaseItems.appendChild(itemElement);
    });
    
    caseModal.style.display = 'flex';
}

// Открытие кейса
function openCase(caseData) {
    if (currentBalance >= caseData.price) {
        // Отправляем данные в бота
        sendDataToBot({
            type: 'openCase',
            caseId: caseData.id,
            price: caseData.price
        });
        
        // Закрываем модальное окно
        document.getElementById('caseModal').style.display = 'none';
    } else {
        showAlert('Недостаточно звёзд! Пополните баланс.');
    }
}

// Продажа подарка
function sellGift(giftValue) {
    sendDataToBot({
        type: 'sellGift',
        value: giftValue
    });
}

// Запрос пополнения баланса
function requestBalanceTopUp() {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        // Открываем меню пополнения в боте
        Telegram.WebApp.openTelegramLink('https://t.me/your_bot_username?start=topup');
    } else {
        showAlert('Откройте приложение через Telegram бота для пополнения баланса');
    }
}

// Отправка данных в бота
function sendDataToBot(data) {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.sendData(JSON.stringify(data));
    } else {
        // Режим разработки - эмулируем ответ
        simulateBotResponse(data);
    }
}

// Эмуляция ответа бота (для разработки)
function simulateBotResponse(data) {
    if (data.type === 'openCase') {
        const caseData = cases.find(c => c.id === data.caseId);
        if (caseData) {
            // Случайный выбор приза
            const randomItem = caseData.items[Math.floor(Math.random() * caseData.items.length)];
            const wonGift = randomItem.gift;
            
            // Обновляем баланс
            currentBalance -= caseData.price;
            userInventory.push(wonGift);
            
            updateBalanceDisplay();
            updateInventoryDisplay();
            
            showAlert(`🎉 Вы выиграли: ${wonGift.name} (${wonGift.value} ⭐)`);
        }
    } else if (data.type === 'sellGift') {
        currentBalance += data.value;
        updateBalanceDisplay();
        showAlert(`✅ Получено ${data.value} ⭐`);
    }
}

// Обновление отображения баланса
function updateBalanceDisplay() {
    const balanceAmount = document.getElementById('balanceAmount');
    const profileBalance = document.getElementById('profileBalance');
    
    if (balanceAmount) balanceAmount.textContent = currentBalance;
    if (profileBalance) profileBalance.textContent = currentBalance;
}

// Обновление отображения инвентаря
function updateInventoryDisplay() {
    const inventoryElement = document.getElementById('inventory');
    if (!inventoryElement) return;
    
    if (userInventory.length === 0) {
        inventoryElement.innerHTML = '<p>Вы ещё не открывали кейсы</p>';
        return;
    }
    
    let inventoryHTML = '<div class="inventory-grid">';
    userInventory.forEach((item, index) => {
        inventoryHTML += `
            <div class="inventory-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60/333/fff?text=Приз'">
                <p>${item.name}</p>
                <p>${item.value} ⭐</p>
                <button onclick="sellGift(${item.value})">Продать</button>
            </div>
        `;
    });
    inventoryHTML += '</div>';
    
    inventoryElement.innerHTML = inventoryHTML;
}

// Показать уведомление
function showAlert(message) {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.showAlert(message);
    } else {
        alert(message);
    }
}

// Запрос баланса у бота
function requestBalance() {
    sendDataToBot({
        type: 'getBalance'
    });
}

// Обработка входящих сообщений от бота
if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
    Telegram.WebApp.onEvent('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.balance !== undefined) {
                currentBalance = data.balance;
                updateBalanceDisplay();
            }
            if (data.inventory) {
                userInventory = data.inventory;
                updateInventoryDisplay();
            }
        } catch (e) {
            console.error('Error parsing message:', e);
        }
    });
}

// Автоматически запрашиваем баланс при загрузке
setTimeout(requestBalance, 1000);