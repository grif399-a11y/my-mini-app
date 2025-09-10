// Объект, содержащий все возможные подарки в приложении.
const allGifts = {
    // Ваши подарки
    bear: { name: 'Мишка', value: 15, image: 'https://i.ibb.co/L5hY59n/bear.jpg' }, 
    giftBox: { name: 'Подарок', value: 25, image: 'https://i.ibb.co/37y4027/gift.jpg' },
    rocket: { name: 'Ракета', value: 50, image: 'https://i.ibb.co/BPL233B/rocket.jpg' },
    ring: { name: 'Кольцо', value: 100, image: 'https://i.ibb.co/P440f80/ring.jpg' },
    // Здесь вы можете добавить свои подарки
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

document.addEventListener('DOMContentLoaded', () => {
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
    
    let currentBalance = 1000;
    balanceAmount.textContent = currentBalance;

    function switchPage(pageId) {
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

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            switchPage(item.dataset.page);
        });
    });

    function generateCaseBoxes() {
        caseGrid.innerHTML = '';
        cases.forEach(caseData => {
            const caseBox = document.createElement('div');
            caseBox.className = 'case-box';
            caseBox.innerHTML = `
                <div class="case-price">${caseData.price} <i class="fas fa-gem"></i></div>
                <img src="${caseData.image}" alt="${caseData.name}">
                <h3>${caseData.name}</h3>
            `;
            caseBox.addEventListener('click', () => openCaseModal(caseData));
            caseGrid.appendChild(caseBox);
        });
    }

    function openCaseModal(caseData) {
        modalCaseName.textContent = caseData.name;
        modalCaseDescription.textContent = caseData.description;
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

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            caseModal.style.display = 'none';
        });
    });

    modalOpenButton.addEventListener('click', () => {
        alert('Эта функция будет подключена к боту!');
        caseModal.style.display = 'none';
    });

    addBalanceBtn.addEventListener('click', () => {
        alert('Функция пополнения будет реализована на следующем шаге!');
    });

    generateCaseBoxes();
});