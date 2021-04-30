import React, { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';
import { useAppSelector } from '../../../../store/hooks';
import { useActions } from '../../../../common/actionFactory/useActions';
import { MovieInfoActions } from '../../actions/actions';
import { MovieInfoUtils } from '../../utils/MovieInfoUtils';
import { ToastAndroid } from 'react-native';
import { FavoritesMoviesActions } from '../../../FavoritesMovies/actions/FavoritesMoviesActions';

/** Компонент кнопок в AppBar компонента карточки фильма. */
export const MovieInfoAppBarActions: React.FC = () => {
    const { result } = useAppSelector(state => state.movieInfo);
    const [selected, setSelected] = useState(false);
    const actions = useActions(actions => actions.movieInfo) as MovieInfoActions;
    const favoritesActions = useActions(actions => actions.favoritesMovies) as FavoritesMoviesActions;
    const utils = new MovieInfoUtils();

    useEffect(() => {
        getMoviesFromLocalStorage();
    }, [result]);

    /** Получение данных из локального хранилища и проверка текущего фильма. */
    const getMoviesFromLocalStorage = async () => {
        const movies = await actions.getMoviesFromLocalStorage();
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
                await actions.setMovieToLocalStorage(shortMovieInfo);
                await setSelected(true);
                await ToastAndroid.show('Фильм успешно добавлен в избранные', ToastAndroid.SHORT);
                await favoritesActions.getFavoritesMovies();
            } else {
                await actions.removeMovieFromLocalStorage(result);
                await setSelected(false);
                await ToastAndroid.show('Фильм удален из списка избранных', ToastAndroid.SHORT);
                await favoritesActions.getFavoritesMovies();
            }
        }
    };

    const getIcon = () => (selected ? 'heart' : 'heart-outline');

    return result && <IconButton icon={getIcon()} color={'#fff'} size={24} onPress={handleAddToFavourites} />;
};
