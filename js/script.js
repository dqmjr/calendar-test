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

        // Смещение страницы (для учета прокрутки)
        var scrollLeft = $(window).scrollLeft();

        // Позиционирование всплывающего окна
        var top = e.pageY - (tooltipHeight / 2);
        var left = e.pageX + 15; // Окно появляется справа от курсора

        var arrowLeft = '-14px'; // Позиция треугольника по умолчанию
        var arrowRight = 'auto';

        // Проверка границ экрана по горизонтали с учетом прокрутки
        if (left + tooltipWidth > pageWidth + scrollLeft) {
            left = e.pageX - tooltipWidth - 15; // Окно перемещается слева от курсора

            // Корректируем положение треугольника для отображения справа
            arrowLeft = 'auto';
            arrowRight = '-14px';
        }

        // Проверка границ экрана по вертикали
        if (top < 0) {
            top = 0; // Если окно выходит за верхнюю границу экрана
        } else if (top + tooltipHeight > pageHeight) {
            top = pageHeight - tooltipHeight; // Если окно выходит за нижнюю границу экрана
        }

        // Обновление позиции треугольника на уровне мышки
        var arrowTop = e.pageY - top - 14; // "- 5" для коррекции положения треугольника по центру курсора

        tooltipArrow.css({
            top: arrowTop + 'px', // Устанавливаем треугольник на уровне мышки
            left: arrowLeft,
            right: arrowRight,
            transform: arrowLeft === '-14px' ? 'translateY(-50%) rotate(0deg)' : 'translateY(-50%) rotate(180deg)' // Поворачиваем треугольник
        });

        tooltip.css({ top: top + 'px', left: left + 'px' });
    }, function() {
        $(this).closest('.tooltip-container').find('.tooltip').hide();
    });
});