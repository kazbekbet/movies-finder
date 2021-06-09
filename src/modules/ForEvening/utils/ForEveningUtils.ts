import { Genre } from '../../../common/store/model';
import { isEmpty, random } from 'lodash';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { LocalStorage } from '../../../common/localStorage/LocalStorage';
import { ELocalStorage } from '../../../common/enums/localStorage';

/** Вспомогательный класс для компонента "Фильм на вечер". */
export class ForEveningUtils {
    localStorage = new LocalStorage();

    /** Возвращает объект с максимальным разбегом годов релиза. */
    getYearRange = (): { max: number; min: number } => {
        return {
            max: new Date().getFullYear(),
            min: 1930,
        };
    };

    /** Возвращает реквест поиска фильма на вечер. */
    getRequest = (genres: Genre[], year: string) => {
        const genresRequest = genres.map(genre => genre.id).toString();
        const yearRequest = (() => {
            if (isEmpty(year)) {
                const { max } = this.getYearRange();
                return random(1980, max);
            }
            return parseInt(year);
        })();

        return {
            genres: genresRequest,
            year: yearRequest,
        };
    };
}
