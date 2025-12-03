// Простое решение: скрыть лоадер через 2 секунды
setTimeout(function() {
    const loader = document.querySelector('.site-loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Показать первый экран
    document.getElementById('screen-1').classList.add('active');
    
    // Инициализировать печатающий эффект
    initTypingEffect();
    
    // Инициализировать навигацию
    initNavigation();
    
    // Инициализировать модальное окно
    initModal();
    
    // Инициализировать кнопки услуг
    initServiceDetails();
}, 2000);

// Тексты для печатающего эффекта
const typingTexts = [
    "scanning network...",
    "checking security protocols...",
    "access granted",
    "welcome to RESCUERS terminal",
    "type 'help' for commands"
];

// Функция печатающего текста в футере
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = typingTexts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Функция навигации между экранами
function initNavigation() {
    // Кнопки навигации
    document.querySelectorAll('.cyber-btn[data-target]').forEach(button => {
        button.addEventListener('click', function() {
            const targetScreenId = this.getAttribute('data-target');
            switchScreen(targetScreenId);
        });
    });
    
    // Кнопки "Назад"
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetScreenId = this.getAttribute('data-target');
            switchScreen(targetScreenId);
        });
    });
    
    // Кнопка запроса помощи
    const helpBtn = document.getElementById('help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            const modal = document.getElementById('consultation-modal');
            if (modal) modal.classList.add('active');
        });
    }
}

// Переключение экранов
function switchScreen(screenId) {
    const targetScreen = document.getElementById(screenId);
    if (!targetScreen) return;
    
    const activeScreen = document.querySelector('.screen.active');
    
    if (activeScreen) {
        activeScreen.classList.remove('active');
        setTimeout(() => {
            targetScreen.classList.add('active');
            updateIndicator(screenId);
        }, 300);
    } else {
        targetScreen.classList.add('active');
        updateIndicator(screenId);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Обновление индикатора экрана
function updateIndicator(screenId) {
    const screenNumber = parseInt(screenId.split('-')[1]);
    document.querySelectorAll('.indicator-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === screenNumber - 1);
    });
}

// Инициализация модального окна
function initModal() {
    const modal = document.getElementById('consultation-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (!modal || !modalClose) return;
    
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.classList.remove('active');
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Инициализация кнопок услуг
function initServiceDetails() {
    document.querySelectorAll('.service-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            let message = serviceType === 'basic' 
                ? 'БАЗОВЫЙ АНАЛИЗ ($1-3):\n\n• Проверка цифрового следа\n• Базовый OSINT-анализ\n• Отчет в течение 1 часа\n• Цена зависит от анонимности жертвы\n\nДля заказа: @usertrawka'
                : 'ПОЛНОЕ РАССЛЕДОВАНИЕ ($6):\n\n• Глубокий OSINT-анализ\n• Отчет активности аккаунта\n• Детальный отчет + рекомендации\n• Обучение анонимности\n• Вне зависимости от анонимности\n\nДля заказа: @usertrawka';
            alert(message);
        });
    });
}

// Дополнительные обработчики
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-action="examples"]').forEach(btn => {
        btn.addEventListener('click', () => alert('Примеры работ доступны в Telegram-канале: @rescuersrescuersrescuers'));
    });
    
    document.querySelectorAll('[data-action="testimonials"]').forEach(btn => {
        btn.addEventListener('click', () => alert('Отзывы клиентов предоставляются по запросу'));
    });
    
    // Эффект мерцания для статуса
    setInterval(() => {
        const statusIndicator = document.querySelector('.status-indicator.active');
        if (statusIndicator) {
            statusIndicator.style.opacity = statusIndicator.style.opacity === '0.5' ? '1' : '0.5';
        }
    }, 2000);
});
