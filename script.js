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

    // --- Логика сохранения баланса ---
    function getBalance() {
        // Проверяем, есть ли баланс в памяти браузера
        const savedBalance = localStorage.getItem('userBalance');
        // Если есть, используем его, иначе устанавливаем начальное значение 1000
        return savedBalance !== null ? parseInt(savedBalance) : 1000;
    }

    function saveBalance(balance) {
        // Сохраняем текущий баланс в память браузера
        localStorage.setItem('userBalance', balance);
    }

    let currentBalance = getBalance();
    balanceAmount.textContent = currentBalance;

    // --- Остальная логика ---

    const allGifts = {
        bear: { name: 'Мишка', value: 15, image: 'https://via.placeholder.com/60/FFC0CB?text=🐻' },
        giftBox: { name: 'Подарок', value: 25, image: 'https://via.placeholder.com/60/FFA500?text=🎁' },
        rocket: { name: 'Ракета', value: 50, image: 'https://via.placeholder.com/60/87CEEB?text=🚀' },
        ring: { name: 'Кольцо', value: 100, image: 'https://via.placeholder.com/60/FFFF00?text=💍' }
    };

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
                { gift: allGifts.giftBox, chance: 60 },
                { gift: allGifts.rocket, chance: 40 }
            ]
        },
        {
            id: 3,
            name: 'Редкий кейс',
            description: 'Очень хорошие подарки.',
            image: 'https://via.placeholder.com/100/fbc02d/ffffff?text=Кейс+3',
            price: 150,
            items: [
                { gift: allGifts.rocket, chance: 50 },
                { gift: allGifts.ring, chance: 50 }
            ]
        },
        {
            id: 4,
            name: 'Легендарный кейс',
            description: 'Шанс на самый ценный подарок!',
            image: 'https://via.placeholder.com/100/0288d1/ffffff?text=Кейс+4',
            price: 250,
            items: [
                { gift: allGifts.ring, chance: 100 }
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
            saveBalance(currentBalance); // Сохраняем новый баланс
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
            alert('Недостаточно укусов для открытия этого кейса!');
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

    // --- Логика покупки за "звезды" ---
    addBalanceBtn.addEventListener('click', () => {
        // Открываем модальное окно для покупки
        purchaseModal.style.display = 'flex';
    });

    purchaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const amountToAdd = parseInt(button.getAttribute('data-amount'));
            currentBalance += amountToAdd;
            balanceAmount.textContent = currentBalance;
            saveBalance(currentBalance); // Сохраняем новый баланс
            purchaseModal.style.display = 'none';
            alert(`Укусы успешно куплены! Ваш баланс: ${currentBalance}`);
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