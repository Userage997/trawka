document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
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
    
    // Инициализация
    setTimeout(initSite, 100); // Небольшая задержка для показа loader
    
    function initSite() {
        // Показываем loader на 2 секунды
        showLoader();
        
        // После loader инициализируем остальное
        setTimeout(() => {
            hideLoader();
            initTypingEffect();
            initNavigation();
            initModal();
            initServiceDetails();
        }, 2000);
    }
    
    // Функция показа loader
    function showLoader() {
        const loaderHTML = `
            <div class="site-loader">
                <div class="loader-text">ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ БЕЗОПАСНОСТИ...</div>
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    }
    
    // Функция скрытия loader
    function hideLoader() {
        const loader = document.querySelector('.site-loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.remove();
                document.body.style.opacity = '1';
            }, 500);
        }
    }
    
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
        
        // Кнопка запроса помощи
        if (helpBtn) {
            helpBtn.addEventListener('click', function() {
                modal.classList.add('active');
            });
        }
    }
    
    // Переключение экранов с анимацией
    function switchScreen(screenId) {
        // Находим целевой экран
        const targetScreen = document.getElementById(screenId);
        if (!targetScreen) return;
        
        // Находим активный экран
        const activeScreen = document.querySelector('.screen.active');
        
        if (activeScreen) {
            // Добавляем класс для анимации выхода
            activeScreen.classList.add('fade-out');
            
            setTimeout(() => {
                // Убираем активный класс и класс анимации
                activeScreen.classList.remove('active', 'fade-out');
                
                // Добавляем активный класс целевому экрану
                targetScreen.classList.add('active', 'fade-in');
                
                // Убираем класс анимации после завершения
                setTimeout(() => {
                    targetScreen.classList.remove('fade-in');
                }, 300);
                
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
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
        
        // Закрытие по клику вне окна
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
        
        // Закрытие по Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Инициализация кнопок подробностей услуг
    function initServiceDetails() {
        serviceDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceType = this.getAttribute('data-service');
                let message = '';
                
                if (serviceType === 'basic') {
                    message = 'БАЗОВЫЙ АНАЛИЗ ($1-3):\n\n• Проверка цифрового следа\n• Базовый OSINT-анализ\n• Отчет в течение 1 часа\n• Цена зависит от анонимности жертвы\n\nДля заказа: @usertrawka';
                } else if (serviceType === 'full') {
                    message = 'ПОЛНОЕ РАССЛЕДОВАНИЕ ($6):\n\n• Глубокий OSINT-анализ\n• Отчет активности аккаунта\n• Детальный отчет + рекомендации\n• Обучение анонимности\n• Вне зависимости от анонимности\n\nДля заказа: @usertrawka';
                }
                
                alert(message);
            });
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
    
    // Эффект мерцания для статуса
    setInterval(() => {
        const statusIndicator = document.querySelector('.status-indicator.active');
        if (statusIndicator) {
            statusIndicator.style.opacity = statusIndicator.style.opacity === '0.5' ? '1' : '0.5';
        }
    }, 2000);
    
    // Инициализируем первый экран как активный
    setTimeout(() => {
        switchScreen('screen-1');
    }, 2500);
});
