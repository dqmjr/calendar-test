$(document).ready(function() {
    $('.element').hover(function(e) {
        var container = $(this).closest('.tooltip-container');
        var tooltip = container.find('.tooltip');
        var tooltipArrow = container.find('.tooltip-arrow');
        tooltip.show();

        var tooltipWidth = tooltip.outerWidth();
        var tooltipHeight = tooltip.outerHeight();
        var pageWidth = $(window).width();
        var pageHeight = $(window).height();

        // Позиционирование всплывающего окна
        var top = e.pageY - (tooltipHeight / 2);
        var left = e.pageX + 15; // Окно появляется справа от курсора

        var arrowLeft = '-15px'; // Позиция треугольника по умолчанию
        var arrowRight = 'auto';
        var arrowBeforeLeft = '-6px'; // Позиция псевдоэлемента тени

        // Проверка границ экрана по горизонтали
        if (left + tooltipWidth > pageWidth) {
            left = e.pageX - tooltipWidth - 15; // Окно перемещается слева от курсора

            // Корректируем положение треугольника для отображения справа
            arrowLeft = 'auto';
            arrowRight = '-15px';
            arrowBeforeLeft = 'auto'; // Переносим псевдоэлемент
        }

        // Проверка границ экрана по вертикали
        if (top < 0) {
            top = 0; // Если окно выходит за верхнюю границу экрана
        } else if (top + tooltipHeight > pageHeight) {
            top = pageHeight - tooltipHeight; // Если окно выходит за нижнюю границу экрана
        }

        // Обновление позиции треугольника на уровне мышки
        var arrowTop = e.pageY - top - 15; // "- 5" для коррекции положения треугольника по центру курсора

        tooltipArrow.css({
            top: arrowTop + 'px', // Устанавливаем треугольник на уровне мышки
            left: arrowLeft,
            right: arrowRight,
            transform: arrowLeft === '-15px' ? 'translateY(-50%) rotate(0deg)' : 'translateY(-50%) rotate(180deg)' // Поворачиваем треугольник
        });

        tooltipArrow.find(':before').css({
            left: arrowBeforeLeft,
            right: arrowLeft === '-15px' ? 'auto' : '-6px' // Корректируем позицию тени
        });

        tooltip.css({ top: top + 'px', left: left + 'px' });
    }, function() {
        $(this).closest('.tooltip-container').find('.tooltip').hide();
    });
});
