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
import { MovieListActions } from '../actions/actions';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент списка фильмов. */
const MoviesList: React.FC<IOwnProps> = ({ }) => {
    const { movies, status, page, sortBy } = useAppSelector(state => state.moviesList);
    const actions = useActions(actions => actions.moviesList) as MovieListActions;

    useEffect(() => {
        if (sortBy) {
            getMovieList(sortBy);
        } else getMovieList();
    }, [page]);

    /** Получение списка фильмов. */
    const getMovieList = async (sortBy: SortTypes = SortTypes.POPULARITY) => await actions.getMoviesList(sortBy, page);

    /** Изменение страницы списка. */
    const handleChangePage = (changeType: ChangePageTypes) => {
        actions.changePage({ type: changeType, currentPage: page });
    };

    return (
        <>
            <ScrollView style={styles.container}>
                {isPending(status) && <Spinner setDefaultPaddingTop/>}
                <MovieListContent movies={movies} status={status} />
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
        backgroundColor: '#efefef',
    },
});

export default MoviesList;
