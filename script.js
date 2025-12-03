document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const siteLoader = document.getElementById('site-loader');
    const terminalContainer = document.getElementById('terminal-container');
    const screens = document.querySelectorAll('.screen');
    const buttons = document.querySelectorAll('.cyber-btn[data-target]');
    const backButtons = document.querySelectorAll('.back-btn');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const helpBtn = document.getElementById('help-btn');
    const modal = document.getElementById('consultation-modal');
    const modalClose = document.querySelector('.modal-close');
    const serviceDetailsBtns = document.querySelectorAll('.service-details-btn');
    
    // Тексты для печатающего эффекта
    const typingTexts = [
        "scanning network...",
        "checking security protocols...",
        "access granted",
        "welcome to RESCUERS terminal",
        "type 'help' for commands"
    ];
    
    // Через 2 секунды скрываем лоадер и показываем основной контейнер
    setTimeout(() => {
        if (siteLoader) {
            siteLoader.style.opacity = '0';
            siteLoader.style.transition = 'opacity 0.5s ease';
        }
        
        setTimeout(() => {
            if (siteLoader) {
                siteLoader.style.display = 'none';
            }
            if (terminalContainer) {
                terminalContainer.classList.remove('hidden');
                // Инициализация основного функционала
                initTypingEffect();
                initNavigation();
                initModal();
                initServiceDetails();
                switchScreen('screen-1');
            }
        }, 500);
    }, 2000);
    
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
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const targetScreenId = this.getAttribute('data-target');
                switchScreen(targetScreenId);
            });
        });
        
        backButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetScreenId = this.getAttribute('data-target');
                switchScreen(targetScreenId);
            });
        });
        
        if (helpBtn) {
            helpBtn.addEventListener('click', function() {
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
        indicatorDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === screenNumber - 1);
        });
    }
    
    // Инициализация модального окна
    function initModal() {
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
        serviceDetailsBtns.forEach(btn => {
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
