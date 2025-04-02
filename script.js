// Инициализация переменных
let balance = 0;
let username = "";
let isLoggedIn = false;

// Проверяем, был ли пользователь уже авторизован
if (localStorage.getItem("balance") !== null) {
    balance = parseInt(localStorage.getItem("balance"));
    username = localStorage.getItem("username");
    isLoggedIn = true;
    updateUI();
}

// Обновление UI в зависимости от состояния
function updateUI() {
    if (isLoggedIn) {
        document.getElementById("balance").innerText = `Баланс: ${balance} кредитов`;
        document.getElementById("user-info").innerText = `Добро пожаловать, ${username}!`;
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("game-section").style.display = "block";
    } else {
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("game-section").style.display = "none";
    }
}

// Обработчик регистрации
function registerUser(event) {
    event.preventDefault();

    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;

    if (newUsername && newPassword) {
        if (localStorage.getItem(newUsername)) {
            alert("Пользователь с таким именем уже существует!");
        } else {
            localStorage.setItem(newUsername, newPassword);
            alert("Регистрация успешна! Теперь можете войти.");
            window.location.href = "login.html"; // Перенаправление на страницу входа
        }
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
}

// Обработчик входа
function loginUser(event) {
    event.preventDefault();

    const loginUsername = document.getElementById("login-username").value;
    const loginPassword = document.getElementById("login-password").value;

    const storedPassword = localStorage.getItem(loginUsername);

    if (storedPassword && storedPassword === loginPassword) {
        username = loginUsername;
        balance = parseInt(localStorage.getItem("balance") || "0");
        isLoggedIn = true;

        // Сохраняем данные в localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("balance", balance);

        updateUI();
    } else {
        alert("Неверное имя пользователя или пароль!");
    }
}

// Обработчик выхода
function logOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
    isLoggedIn = false;
    updateUI();
}

// Функция для получения бонуса
function claimBonus() {
    if (!isLoggedIn) {
        alert("Для получения бонуса необходимо войти!");
        return;
    }

    let bonus = Math.floor(Math.random() * 500) + 100;
    balance += bonus;

    localStorage.setItem("balance", balance);
    updateUI();
    alert(`Вы получили бонус в размере ${bonus} кредитов!`);
}

// Функция для игры в слот
function playSlot() {
    if (!isLoggedIn) {
        alert("Для игры необходимо войти!");
        return;
    }

    if (balance < 100) {
        alert("Недостаточно средств для игры!");
        return;
    }

    balance -= 100;
    localStorage.setItem("balance", balance);

    let result = ["🍒", "🍋", "🍉", "🍇", "⭐", "💎"];
    let slot1 = result[Math.floor(Math.random() * result.length)];
    let slot2 = result[Math.floor(Math.random() * result.length)];
    let slot3 = result[Math.floor(Math.random() * result.length)];

    if (slot1 === slot2 && slot2 === slot3) {
        let winAmount = 1000;
        balance += winAmount;
        localStorage.setItem("balance", balance);
        alert(`Вы выиграли ${winAmount} кредитов!`);
    } else {
        alert("Попробуйте снова!");
    }

    updateUI();
}

// Функция для игры в покер
function playPoker() {
    if (!isLoggedIn) {
        alert("Для игры необходимо войти!");
        return;
    }

    if (balance < 500) {
        alert("Недостаточно средств для игры!");
        return;
    }

    balance -= 500;
    localStorage.setItem("balance", balance);

    let playerHand = Math.floor(Math.random() * 21) + 10;
    let dealerHand = Math.floor(Math.random() * 21) + 10;

    if (playerHand > dealerHand) {
        let winAmount = 1000;
        balance += winAmount;
        localStorage.setItem("balance", balance);
        alert(`Вы выиграли ${winAmount} кредитов!`);
    } else {
        alert("Вы проиграли! Попробуйте снова.");
    }

    updateUI();
}
