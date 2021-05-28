import numbro from 'numbro';
import { isEmpty } from 'lodash';
import { IEndingWordConfig } from '../models/additional';

export const getMovieReleaseYear = (releaseDate: string) => {
    if (releaseDate && releaseDate.length > 4) {
        return releaseDate.slice(0, 4);
    }
    return 'неизвестно';
};

export const getMovieStatusLocalization = (status: string) => {
    switch (status) {
        case 'Rumored':
            return 'Слухи';
        case 'Planned':
            return 'Запланировано';
        case 'In Production':
            return 'В производстве';
        case 'Post Production':
            return 'Постобработка';
        case 'Released':
            return 'Выпущено';
        case 'Canceled':
            return 'Отменено';
        default:
            return 'неизвестно';
    }
};

/** Приводит формат суммы к общему виду. */
const setCurrencyFormat = (value: number): { symbol: string; round: number } => {
    const thousand = 1000;
    const million = 1000000;
    const billion = 1000000000;

    if (value >= thousand && value < million) {
        return { symbol: 'тыс.', round: thousand };
    }
    if (value >= million && value < billion) {
        return { symbol: 'млн.', round: million };
    }
    if (value >= billion) {
        return { symbol: 'млрд.', round: billion };
    }
    return { symbol: '', round: 1 };
};

/** Форматирует в формат долларов. */
export const usdFormatter = (value: number) => {
    return numbro(value)
        .formatCurrency({
            average: true,
            mantissa: 1,
            spaceSeparated: true,
        })
        .split(',')
        .join(' ');
};

/** Форматирует в формат рублей. */
export const rubFormatter = (value: number) => {
    const config = setCurrencyFormat(value);

    return numbro(value)
        .formatCurrency({
            mantissa: 1,
            optionalMantissa: true,
            currencySymbol: `${config.symbol} руб.`,
            thousandSeparated: true,
            spaceSeparatedCurrency: true,
            currencyPosition: 'postfix',
            spaceSeparated: true,
            roundingFunction: num => num / config.round,
        })
        .split(',')
        .join(' ');
};

export const getCorrectEndingWord = ({ value, one, two_four, five_nine }: IEndingWordConfig): string => {
    if (value && !isEmpty(value)) {
        const stringValue = value.toString();
        const lastSymbol = parseInt(stringValue[stringValue.length - 1]);

        if (lastSymbol === 1) return one;
        if (lastSymbol > 1 && lastSymbol < 5) return two_four;
        if (lastSymbol >= 5 && lastSymbol <= 9) return five_nine;
        return five_nine;
    }
    return five_nine;
};
