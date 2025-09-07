document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на элементы
    const balanceAmount = document.getElementById('balanceAmount');
    const caseGrid = document.getElementById('caseGrid');
    const caseModal = document.getElementById('caseModal');
    const modalCloseButtons = document.querySelectorAll('.modal-close-button');
    const modalCaseName = document.getElementById('modalCaseName');
    const modalCaseImage = document.getElementById('modalCaseImage');
    const modalCaseDescription = document.getElementById('modalCaseDescription');
    const modalCasePrice = document.getElementById('modalCasePrice');
    const modalOpenButton = document.getElementById('modalOpenButton');
    const modalCaseItems = document.getElementById('modalCaseItems');
    const modalResult = document.getElementById('modalResult');
    const addBalanceBtn = document.getElementById('addBalanceBtn');
    const purchaseModal = document.getElementById('purchaseModal');
    const purchaseButtons = document.querySelectorAll('.purchase-button');

    // Получаем объект Telegram Web Apps
    const WebApp = window.Telegram.WebApp;

    // --- Логика сохранения баланса ---
    function getBalance() {
        const savedBalance = localStorage.getItem('userBalance');
        return savedBalance !== null ? parseInt(savedBalance) : 1000;
    }

    function saveBalance(balance) {
        localStorage.setItem('userBalance', balance);
    }

    let currentBalance = getBalance();
    balanceAmount.textContent = currentBalance;

    // --- Список всех доступных подарков/NFT с твоими картинками ---
    const allGifts = {
        bear: { name: 'Мишка', value: 15, image: 'https://i.ibb.co/L5hY59n/bear.jpg' },
        giftBox: { name: 'Подарок', value: 25, image: 'https://i.ibb.co/37y4027/gift.jpg' },
        rocket: { name: 'Ракета', value: 50, image: 'https://i.ibb.co/BPL233B/rocket.jpg' },
        ring: { name: 'Кольцо', value: 100, image: 'https://i.ibb.co/P440f80/ring.jpg' },
        jesterHat: { name: 'Шутовской колпак', value: 200, image: 'https://i.ibb.co/m0fH4L3/Jester-Hat.jpg' },
        snoopCigar: { name: 'Snoop Cigar', value: 500, image: 'https://i.ibb.co/1n5b64S/Snoop-Cigar.jpg' },
        snakeBox: { name: 'Коробка со змеей', value: 750, image: 'https://i.ibb.co/F6bF9hP/Snake-Box.jpg' },
        lollipop: { name: 'Леденец', value: 300, image: 'https://i.ibb.co/m4xL27N/Lol-Pop.jpg' },
        calendar: { name: 'Календарь', value: 400, image: 'https://i.ibb.co/t4jT00y/Desk-Calendar.jpg' },
        lantern: { name: 'Нефритовый фонарь', value: 1000, image: 'https://i.ibb.co/PcgR6sP/Jade-Lantern.jpg' },
    };

    // Определение кейсов
    const cases = [
        {
            id: 1,
            name: 'Начинающий кейс',
            description: 'Шанс получить базовые подарки.',
            image: 'https://via.placeholder.com/100/388e3c/ffffff?text=Кейс+1',
            price: 25,
            items: [
                { gift: allGifts.bear, chance: 70 },
                { gift: allGifts.giftBox, chance: 30 }
            ]
        },
        {
            id: 2,
            name: 'Обычный кейс',
            description: 'Более ценные подарки.',
            image: 'https://via.placeholder.com/100/d32f2f/ffffff?text=Кейс+2',
            price: 75,
            items: [
                { gift: allGifts.rocket, chance: 60 },
                { gift: allGifts.ring, chance: 40 }
            ]
        },
        {
            id: 3,
            name: 'Редкий кейс',
            description: 'Очень хорошие подарки.',
            image: 'https://via.placeholder.com/100/fbc02d/ffffff?text=Кейс+3',
            price: 150,
            items: [
                { gift: allGifts.jesterHat, chance: 50 },
                { gift: allGifts.lollipop, chance: 50 }
            ]
        },
        {
            id: 4,
            name: 'Легендарный кейс',
            description: 'Шанс на самый ценный подарок!',
            image: 'https://via.placeholder.com/100/0288d1/ffffff?text=Кейс+4',
            price: 250,
            items: [
                { gift: allGifts.snoopCigar, chance: 20 },
                { gift: allGifts.snakeBox, chance: 30 },
                { gift: allGifts.calendar, chance: 25 },
                { gift: allGifts.lantern, chance: 25 }
            ]
        }
    ];

    function generateCaseBoxes() {
        caseGrid.innerHTML = '';
        cases.forEach(caseData => {
            const caseBox = document.createElement('div');
            caseBox.className = 'case-box';
            caseBox.dataset.caseId = caseData.id;
            caseBox.style.backgroundColor = `var(--case-bg-color-${caseData.id})`;
            caseBox.innerHTML = `
                <img src="${caseData.image}" alt="${caseData.name}">
                <h3>${caseData.name}</h3>
                <div class="case-price">${caseData.price}<span> ⭐</span></div>
            `;
            caseBox.addEventListener('click', () => openCaseModal(caseData));
            caseGrid.appendChild(caseBox);
        });
    }

    function openCaseModal(caseData) {
        modalCaseName.textContent = caseData.name;
        modalCaseImage.src = caseData.image;
        modalCaseDescription.textContent = caseData.description;
        modalCasePrice.textContent = caseData.price;
        modalOpenButton.dataset.caseId = caseData.id;
        modalResult.innerHTML = '';

        modalCaseItems.innerHTML = '';
        caseData.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'modal-item';
            itemElement.innerHTML = `
                <img src="${item.gift.image}" alt="${item.gift.name}">
                <p>${item.gift.name}</p>
                <p>Шанс: ${item.chance}%</p>
            `;
            modalCaseItems.appendChild(itemElement);
        });

        caseModal.style.display = 'flex';
    }

    modalOpenButton.addEventListener('click', () => {
        const caseId = parseInt(modalOpenButton.dataset.caseId);
        const selectedCase = cases.find(c => c.id === caseId);

        if (!selectedCase) return;

        if (currentBalance >= selectedCase.price) {
            currentBalance -= selectedCase.price;
            balanceAmount.textContent = currentBalance;
            saveBalance(currentBalance);
            modalResult.innerHTML = '<p>Открываем кейс...</p>';

            setTimeout(() => {
                const wonGift = getRandomGift(selectedCase.items);
                modalResult.innerHTML = `
                    <h3>🎉 Вы выиграли:</h3>
                    <h4>${wonGift.name}</h4>
                    <img src="${wonGift.image}" alt="${wonGift.name}" style="width: 100%; max-width: 100px; border-radius: 10px;">
                    <p>Стоимость: ${wonGift.value} укусов</p>
                `;
            }, 1500);
        } else {
            WebApp.showAlert('Недостаточно укусов для открытия этого кейса!');
        }
    });

    function getRandomGift(items) {
        const totalChance = items.reduce((sum, item) => sum + item.chance, 0);
        let randomNum = Math.random() * totalChance;

        for (const item of items) {
            if (randomNum < item.chance) {
                return item.gift;
            }
            randomNum -= item.chance;
        }
        return items[items.length - 1].gift;
    }

    // --- Логика покупки за "звезды" (реальная) ---
    addBalanceBtn.addEventListener('click', () => {
        purchaseModal.style.display = 'flex';
    });

    purchaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amountToAdd = parseInt(button.getAttribute('data-amount'));

            const data = { amount: amountToAdd };
            WebApp.sendData(JSON.stringify(data));

            purchaseModal.style.display = 'none';
        });
    });

    // --- Логика закрытия модальных окон ---
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            caseModal.style.display = 'none';
            purchaseModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === caseModal || event.target === purchaseModal) {
            event.target.style.display = 'none';
        }
    });

    generateCaseBoxes();
});