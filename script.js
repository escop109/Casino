window.onload = function() {
    // Получаем состояние входа
    const loggedIn = localStorage.getItem('loggedIn');
    const loggedInUser = localStorage.getItem('loggedInUser');

    // Страница Главная (index.html)
    if (window.location.pathname.includes('index.html')) {
        const welcomeMessage = document.getElementById('welcome-message');
        const loginButton = document.getElementById('login-button');
        const logoutButton = document.getElementById('logout-button');
        
        if (loggedIn === 'true') {
            welcomeMessage.innerText = `Добро пожаловать, ${loggedInUser}!`;
            loginButton.style.display = 'none';
            logoutButton.style.display = 'inline-block';
        } else {
            welcomeMessage.innerText = 'Добро пожаловать в онлайн казино!';
            loginButton.style.display = 'inline-block';
            logoutButton.style.display = 'none';
        }
    }

    // Страница Контакты (contact.html)
    if (window.location.pathname.includes('contact.html')) {
        document.getElementById('contact-email').innerText = 'iuosford@gmail.com';
    }

    // Страница О нас (about.html)
    if (window.location.pathname.includes('about.html')) {
        document.getElementById('about-text').innerText = 'Мы предоставляем лучшие игры и бонусы для наших игроков!';
    }

    // Страница Регистрация (register.html)
    if (window.location.pathname.includes('register.html')) {
        document.getElementById('register-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (localStorage.getItem(username)) {
                alert('Пользователь с таким именем уже существует!');
                return;
            }

            const user = {
                password: password,
                balance: 1000 // Начальный баланс
            };
            localStorage.setItem(username, JSON.stringify(user));
            alert('Регистрация прошла успешно! Вы можете войти.');
            window.location.href = 'login.html'; // Перенаправление на страницу входа
        });
    }

    // Страница Вход (login.html)
    if (window.location.pathname.includes('login.html')) {
        document.getElementById('login-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = JSON.parse(localStorage.getItem(username));

            if (user && user.password === password) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('loggedInUser', username);
                window.location.href = 'index.html';
            } else {
                alert('Неверные данные для входа!');
            }
        });
    }

    // Страница Игры (games.html)
    if (window.location.pathname.includes('games.html')) {
        let balance = 1000;

        // Обновляем баланс
        function updateBalance(amount) {
            balance += amount;
            document.getElementById('balance').innerText = `Баланс: ${balance} кредитов`;
        }

        // Функция для получения бонуса
        document.getElementById('bonus-button').addEventListener('click', function() {
            let bonus = Math.floor(Math.random() * 500) + 100;
            updateBalance(bonus);
            alert(`Вы получили бонус: ${bonus} кредитов!`);
        });

        // Логика для слота
        document.getElementById('slot-button').addEventListener('click', function() {
            let bet = 100;
            if (balance < bet) {
                alert("Недостаточно средств!");
                return;
            }
            updateBalance(-bet);

            let result = ["🍒", "🍋", "🍉", "🍇", "⭐", "💎", "🍀", "🍊"];
            let slot1 = result[Math.floor(Math.random() * result.length)];
            let slot2 = result[Math.floor(Math.random() * result.length)];
            let slot3 = result[Math.floor(Math.random() * result.length)];

            document.getElementById("game-result").innerText = `${slot1} | ${slot2} | ${slot3}`;

            if (slot1 === slot2 && slot2 === slot3) {
                let winAmount = bet * 10;
                updateBalance(winAmount);
                alert(`Поздравляем! Вы выиграли ${winAmount} кредитов!`);
            } else {
                alert("Попробуйте еще раз!");
            }
        });

        // Логика для покера
        document.getElementById('poker-button').addEventListener('click', function() {
            let bet = 500;
            if (balance < bet) {
                alert("Недостаточно средств!");
                return;
            }
            updateBalance(-bet);

            let playerHand = Math.floor(Math.random() * 21) + 10;
            let dealerHand = Math.floor(Math.random() * 21) + 10;

            document.getElementById("game-result").innerText = `Вы: ${playerHand}, Казино: ${dealerHand}`;

            if (playerHand > dealerHand) {
                let winAmount = bet * 2;
                updateBalance(winAmount);
                alert(`Вы выиграли ${winAmount} кредитов!`);
            } else {
                alert("Вы проиграли. Попробуйте снова!");
            }
        });
    }

    // Страница Админ Панель (admin.html)
    if (window.location.pathname.includes('admin.html')) {
        let users = {}; // Пример хранилища пользователей

        document.getElementById('update-balance-button').addEventListener('click', function() {
            const username = document.getElementById('username').value;
            const balanceChange = parseFloat(document.getElementById('balanceChange').value);

            if (!username || isNaN(balanceChange)) {
                showAlert('Ошибка! Пожалуйста, заполните все поля.', true);
                return;
            }

            if (!users[username]) {
                users[username] = { balance: 0 };
            }

            users[username].balance += balanceChange;
            showAlert(`Баланс пользователя ${username} был обновлён! Новый баланс: ${users[username].balance}`, false);
        });

        document.getElementById('update-win-chance-button').addEventListener('click', function() {
            const slotChance = parseInt(document.getElementById('slotWinChance').value);
            const pokerChance = parseInt(document.getElementById('pokerWinChance').value);

            if (isNaN(slotChance) || isNaN(pokerChance) || slotChance < 0 || pokerChance < 0 || slotChance > 100 || pokerChance > 100) {
                showAlert('Ошибка! Шанс должен быть от 0 до 100.', true);
                return;
            }

            showAlert(`Шансы на выигрыш обновлены! Слот: ${slotChance}%, Покер: ${pokerChance}%`, false);
        });

        document.getElementById('add-bonus-button').addEventListener('click', function() {
            const bonusAmount = parseFloat(document.getElementById('bonusAmount').value);

            if (isNaN(bonusAmount) || bonusAmount <= 0) {
                showAlert('Ошибка! Введите корректную сумму бонуса.', true);
                return;
            }

            for (const user in users) {
                users[user].balance += bonusAmount;
            }

            showAlert(`Бонус в ${bonusAmount} был добавлен всем пользователям!`, false);
        });

        function showAlert(message, isError) {
            const alertBox = document.getElementById('alert');
            alertBox.textContent = message;
            alertBox.classList.remove('error');
            if (isError) {
                alertBox.classList.add('error');
            }
        }
    }
}

// Функция для выхода (для главной страницы)
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
