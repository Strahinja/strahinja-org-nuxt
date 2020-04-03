export const state = () => ({
    messages: {
        0: '',
        200: 'Успешно',
        404: 'Није пронађено',
        410: 'Уклоњено',
        500: 'Серверска грешка'
    },
    messageDescriptions: {
        0: '',
        404: 'Страница тренутно није доступна или је'
            + ' УРЛ који сте унели погрешан. Проверите'
            + ' УРЛ или покушајте поново касније.',
        410: 'Ова страница је премештена или уклоњена.',
        500: 'Догодила се серверска грешка. Покушајте поново касније.',
    },
});

export const getters = {
    messageByCode: state => code => state.messages[code],
    descriptionByCode: state => code => state.messageDescriptions[code],
};

