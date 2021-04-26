import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SortTypes } from '../../../common/enums/sortTypes';
import { isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { Spinner } from '../../../common/components/Spinner/Spinner';
import { MovieListContent } from './components/MovieListContent';
import { MovieListPagination } from './components/MovieListPagination';
import { ChangePageTypes } from '../actions/types';
import { useAppSelector } from '../../../store/hooks';
import { useActions } from '../../../common/actionFactory/useActions';
import { NavigationModel } from '../../../router/types';
import { RouterPaths } from '../../../router/routerPaths';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel<RouterPaths.MOVIES_LIST> {}

/** Компонент списка фильмов. */
const MoviesList: React.FC<IOwnProps> = ({ route, navigation }) => {
    const { movies, status, page } = useAppSelector(state => state.moviesList);
    const actions = useActions(actions => actions.moviesList);

    useEffect(() => {
        getMovieList();
    }, [page]);

    /** Получение списка фильмов. */
    const getMovieList = async (sort: SortTypes = SortTypes.POPULARITY) => await actions.getMoviesList(sort, page);

    /** Изменение страницы списка. */
    const handleChangePage = (changeType: ChangePageTypes) => {
        actions.changePage({ type: changeType, currentPage: page });
    };

    /** Переход к детальной информации о фильме. */
    const handleSelectMovie = (id: number) => {
        navigation.navigate(RouterPaths.MOVIE_INFO, { id });
    };

    return (
        <>
            <ScrollView style={styles.container}>
                {isPending(status) && <Spinner />}
                <MovieListContent movies={movies} status={status} onPress={handleSelectMovie} />
                {!isPending(status) && movies && (
                    <MovieListPagination
                        currentPage={page}
                        onOpenNextPage={handleChangePage.bind(null, ChangePageTypes.INCREMENT)}
                        onOpenPreviousPage={handleChangePage.bind(null, ChangePageTypes.DECREMENT)}
                    />
                )}
            </ScrollView>
        </>
    );
};

/** Стили. */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 12,
    },
});

export default MoviesList;