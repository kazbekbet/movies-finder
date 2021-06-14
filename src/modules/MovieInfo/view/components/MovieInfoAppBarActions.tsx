import React, { useContext, useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';
import { useAppSelector } from '../../../../store/hooks';
import { MovieInfoUtils } from '../../utils/MovieInfoUtils';
import { ToastAndroid } from 'react-native';
import { ActionsContext } from '../../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../../common/actionFactory/actionFactory';

/** Компонент кнопок в AppBar компонента карточки фильма. */
export const MovieInfoAppBarActions: React.FC = () => {
    const { result } = useAppSelector(state => state.movieInfo);
    const [selected, setSelected] = useState(false);
    const utils = new MovieInfoUtils();

    /** Экшены компонента. */
    const { movieInfoActions, favoritesMoviesActions } = useContext(ActionsContext) as ActionsFactory;

    useEffect(() => {
        getMoviesFromLocalStorage();
    }, [result]);

    /** Получение данных из локального хранилища и проверка текущего фильма. */
    const getMoviesFromLocalStorage = async () => {
        const movies = await movieInfoActions.getMoviesFromLocalStorage();
        if (movies && result) {
            const movieIsSaved = utils.findMovieFromLocalStorage(result, movies);

            if (movieIsSaved) {
                setSelected(true);
            }
        }
    };

    /** Обработка нажатия на кнопку. */
    const handleAddToFavourites = async () => {
        if (result) {
            if (!selected) {
                const shortMovieInfo = utils.getShortMovieInfo(result);
                await movieInfoActions.setMovieToLocalStorage(shortMovieInfo);
                await setSelected(true);
                await ToastAndroid.show('Фильм успешно добавлен в избранные', ToastAndroid.SHORT);
                await favoritesMoviesActions.getFavoritesMovies();
            } else {
                await movieInfoActions.removeMovieFromLocalStorage(result);
                await setSelected(false);
                await ToastAndroid.show('Фильм удален из списка избранных', ToastAndroid.SHORT);
                await favoritesMoviesActions.getFavoritesMovies();
            }
        }
    };

    const getIcon = () => (selected ? 'heart' : 'heart-outline');

    return result && <IconButton icon={getIcon()} color={'#fff'} size={24} onPress={handleAddToFavourites} />;
};
