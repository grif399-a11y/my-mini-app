document.addEventListener('DOMContentLoaded', () => {
    const balanceAmount = document.getElementById('balanceAmount');
    const caseGrid = document.getElementById('caseGrid');
    const caseModal = document.getElementById('caseModal');
    const modalCloseButton = document.querySelector('.modal-close-button');
    const modalCaseName = document.getElementById('modalCaseName');
    const modalCaseImage = document.getElementById('modalCaseImage');
    const modalCaseDescription = document.getElementById('modalCaseDescription');
    const modalCasePrice = document.getElementById('modalCasePrice');
    const modalOpenButton = document.getElementById('modalOpenButton');
    const modalCaseItems = document.getElementById('modalCaseItems');
    const modalResult = document.getElementById('modalResult');

    let currentBalance = 1000; // Начальный баланс укусов
    balanceAmount.textContent = currentBalance; // Отображаем баланс

    // Список всех доступных подарков/NFT
    const allGifts = {
        bear: { name: 'Мишка', value: 15, image: 'https://via.placeholder.com/60/FFC0CB?text=🐻' },
        giftBox: { name: 'Подарок', value: 25, image: 'https://via.placeholder.com/60/FFA500?text=🎁' },
        rocket: { name: 'Ракета', value: 50, image: 'https://via.placeholder.com/60/87CEEB?text=🚀' },
        ring: { name: 'Кольцо', value: 100, image: 'https://via.placeholder.com/60/FFFF00?text=💍' }
    };

    // Определение кейсов
    const cases = [
        {
            id: 1,
            name: 'Начинающий кейс',
            description: 'Шанс получить базовые подарки.',
            image: 'https://via.placeholder.com/100/388e3c/ffffff?text=Кейс+1', // Зеленый
            price: 25,
            items: [
                { gift: allGifts.bear, chance: 70 }, // 70% шанс
                { gift: allGifts.giftBox, chance: 30 } // 30% шанс
            ]
        },
        {
            id: 2,
            name: 'Обычный кейс',
            description: 'Более ценные подарки.',
            image: 'https://via.placeholder.com/100/d32f2f/ffffff?text=Кейс+2', // Красный
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
            image: 'https://via.placeholder.com/100/fbc02d/ffffff?text=Кейс+3', // Желтый
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
            image: 'https://via.placeholder.com/100/0288d1/ffffff?text=Кейс+4', // Голубой
            price: 250,
            items: [
                { gift: allGifts.ring, chance: 100 } // 100% шанс на кольцо
            ]
        }
    ];

    // Функция для генерации боксов с кейсами
    function generateCaseBoxes() {
        caseGrid.innerHTML = ''; // Очищаем сетку
        cases.forEach(caseData => {
            const caseBox = document.createElement('div');
            caseBox.className = 'case-box';
            caseBox.dataset.caseId = caseData.id;
            caseBox.style.backgroundColor = `var(--case-bg-color-${caseData.id})`; // Применяем цвет
            caseBox.innerHTML = `
                <img src="${caseData.image}" alt="${caseData.name}">
                <h3>${caseData.name}</h3>
                <div class="case-price">${caseData.price}<span> ⭐</span></div>
            `;
            caseBox.addEventListener('click', () => openCaseModal(caseData));
            caseGrid.appendChild(caseBox);
        });
    }

    // Открытие модального окна предпросмотра кейса
    function openCaseModal(caseData) {
        modalCaseName.textContent = caseData.name;
        modalCaseImage.src = caseData.image;
        modalCaseDescription.textContent = caseData.description;
        modalCasePrice.textContent = caseData.price;
        modalOpenButton.dataset.caseId = caseData.id; // Привязываем ID кейса к кнопке
        modalResult.innerHTML = ''; // Очищаем результат предыдущего открытия

        // Отображаем содержимое кейса
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
        
        caseModal.style.display = 'flex'; // Показываем модальное окно
    }

    // Закрытие модального окна
    modalCloseButton.addEventListener('click', () => {
        caseModal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target === caseModal) {
            caseModal.style.display = 'none';
        }
    });

    // Логика открытия кейса
    modalOpenButton.addEventListener('click', () => {
        const caseId = parseInt(modalOpenButton.dataset.caseId);
        const selectedCase = cases.find(c => c.id === caseId);

        if (!selectedCase) return;

        if (currentBalance >= selectedCase.price) {
            currentBalance -= selectedCase.price;
            balanceAmount.textContent = currentBalance;
            modalResult.innerHTML = '<p>Открываем кейс...</p>';

            setTimeout(() => {
                const wonGift = getRandomGift(selectedCase.items);
                modalResult.innerHTML = `
                    <h3>🎉 Вы выиграли:</h3>
                    <h4>${wonGift.name}</h4>
                    <img src="${wonGift.image}" alt="${wonGift.name}" style="width: 100%; max-width: 100px; border-radius: 10px;">
                    <p>Стоимость: ${wonGift.value} укусов</p>
                `;
                // Здесь можно добавить логику добавления в инвентарь
            }, 1500);
        } else {
            alert('Недостаточно укусов для открытия этого кейса!');
        }
    });

    // Функция для случайного выбора подарка с учетом шансов
    function getRandomGift(items) {
        const totalChance = items.reduce((sum, item) => sum + item.chance, 0);
        let randomNum = Math.random() * totalChance;

        for (const item of items) {
            if (randomNum < item.chance) {
                return item.gift;
            }
            randomNum -= item.chance;
        }
        return items[items.length - 1].gift; // Fallback, если что-то пошло не так
    }

    // Инициализация - генерируем боксы при загрузке страницы
    generateCaseBoxes();
});