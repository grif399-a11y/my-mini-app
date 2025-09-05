document.addEventListener('DOMContentLoaded', () => {
    // Получаем ссылки на элементы
    const rouletteBtn = document.getElementById('rouletteBtn');
    const inventoryBtn = document.getElementById('inventoryBtn');
    const rouletteSection = document.getElementById('rouletteSection');
    const inventorySection = document.getElementById('inventorySection');
    const balanceAmount = document.getElementById('balanceAmount');
    const spinButton = document.getElementById('spinButton');
    const resultDiv = document.getElementById('result');

    // Функция для переключения секций
    function showSection(sectionToShow, buttonToActivate) {
        // Скрываем все секции
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        // Деактивируем все кнопки меню
        document.querySelectorAll('.nav-menu button').forEach(button => {
            button.classList.remove('active');
        });

        // Показываем нужную секцию
        sectionToShow.classList.add('active');
        // Активируем нужную кнопку
        buttonToActivate.classList.add('active');
    }

    // Обработчики событий для кнопок меню
    rouletteBtn.addEventListener('click', () => {
        showSection(rouletteSection, rouletteBtn);
    });

    inventoryBtn.addEventListener('click', () => {
        showSection(inventorySection, inventoryBtn);
    });

    // Список твоих NFT (замени на свои)
    const nftList = [
        { name: 'Кровавый коготь', image: 'https://i.ibb.co/6P84gY2/nft1.png' },
        { name: 'Древний клык', image: 'https://i.ibb.co/3d5d78w/nft2.png' },
        { name: 'Теневой укус', image: 'https://i.ibb.co/5B2N0Lg/nft3.png' }
    ];

    let currentBalance = 1000;
    const spinCost = 100;

    // Функция для вращения рулетки
    spinButton.addEventListener('click', () => {
        if (currentBalance >= spinCost) {
            currentBalance -= spinCost;
            balanceAmount.textContent = currentBalance;
            resultDiv.innerHTML = '<p>Крутим рулетку...</p>';

            setTimeout(() => {
                const randomNFT = nftList[Math.floor(Math.random() * nftList.length)];
                resultDiv.innerHTML = `
                    <h3>🎉 Поздравляю! Ты выиграл:</h3>
                    <h4>${randomNFT.name}</h4>
                    <img src="${randomNFT.image}" alt="${randomNFT.name}" style="width: 100%; max-width: 300px; border-radius: 10px;">
                `;
            }, 1500); // Задержка для имитации "вращения"
        } else {
            alert('Недостаточно укусов для вращения!');
        }
    });
});