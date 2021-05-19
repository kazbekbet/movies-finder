import numbro from 'numbro';
import { isEmpty } from 'lodash';
import { IEndingWordConfig } from '../models/additional';

export const getMovieReleaseYear = (releaseDate: string) => {
    if (releaseDate.length > 4) {
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

export const usdFormatter = (value: number) =>
    numbro(value).formatCurrency({
        thousandSeparated: true,
        spaceSeparated: true,
    });

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
