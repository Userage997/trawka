document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const screens = document.querySelectorAll('.screen');
    const buttons = document.querySelectorAll('.cyber-btn[data-target]');
    const backButtons = document.querySelectorAll('.back-btn');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    const consultationBtn = document.getElementById('consultation-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const modal = document.getElementById('consultation-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Тексты для печатающего эффекта
    const typingTexts = [
        "scanning network...",
        "checking security protocols...",
        "access granted",
        "welcome to RESCUERS terminal",
        "type 'help' for commands"
    ];
    
    // Инициализация
    initTypingEffect();
    initNavigation();
    initModal();
    
    // Функция печатающего текста в футере
    function initTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = typingTexts[textIndex];
            
            if (isDeleting) {
                // Удаление текста
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Набор текста
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                // Пауза в конце текста
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && charIndex === 0) {
                // Переход к следующему тексту
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Запуск эффекта
        setTimeout(type, 1000);
    }
    
    // Функция навигации между экранами
    function initNavigation() {
        // Обработка основных кнопок навигации
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const targetScreenId = this.getAttribute('data-target');
                switchScreen(targetScreenId);
            });
        });
        
        // Обработка кнопок "Назад"
        backButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetScreenId = this.getAttribute('data-target');
                switchScreen(targetScreenId);
            });
        });
        
        // Кнопка консультации
        if (consultationBtn) {
            consultationBtn.addEventListener('click', function() {
                modal.classList.add('active');
            });
        }
        
        // Кнопка расчета
        if (calculateBtn) {
            calculateBtn.addEventListener('click', function() {
                alert('Для расчета стоимости вашей ситуации свяжитесь с нами в Telegram: @usertrawka\nУкажите код "CALC-WEB" для быстрого ответа.');
            });
        }
    }
    
    // Переключение экранов
    function switchScreen(screenId) {
        // Находим целевой экран
        const targetScreen = document.getElementById(screenId);
        if (!targetScreen) return;
        
        // Находим активный экран
        const activeScreen = document.querySelector('.screen.active');
        
        // Анимация перехода
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
        
        // Прокрутка вверх
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Обновление индикатора экрана
    function updateIndicator(screenId) {
        // Получаем номер экрана из id
        const screenNumber = parseInt(screenId.split('-')[1]);
        
        // Обновляем точки индикатора
        indicatorDots.forEach((dot, index) => {
            if (index === screenNumber - 1) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Инициализация модального окна
    function initModal() {
        // Закрытие модального окна
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
        });
        
        // Закрытие по клику вне окна
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Добавляем обработчики для дополнительных кнопок
    document.querySelectorAll('[data-action="examples"]').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Примеры работ доступны в Telegram-канале: @rescuersrescuersrescuers\nИли по запросу у специалиста.');
        });
    });
    
    document.querySelectorAll('[data-action="testimonials"]').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Отзывы клиентов предоставляются по запросу для подтверждения легитимности.\nСвяжитесь с нами для получения информации.');
        });
    });
    
    // Добавляем эффект наведения на все кнопки услуг
    document.querySelectorAll('.service-card .cyber-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            alert(`Подробная информация об услуге "${serviceName}" отправлена в Telegram: @priceusertrawka`);
        });
    });
    
    // Эффект мерцания для статуса (дополнительная анимация)
    setInterval(() => {
        const statusIndicator = document.querySelector('.status-indicator.active');
        if (statusIndicator) {
            statusIndicator.style.opacity = statusIndicator.style.opacity === '0.5' ? '1' : '0.5';
        }
    }, 2000);
    
    // Инициализируем первый экран как активный
    switchScreen('screen-1');
});
