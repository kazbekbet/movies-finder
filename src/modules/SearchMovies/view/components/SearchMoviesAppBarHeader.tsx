import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../../../../store/hooks';
import { useActions } from '../../../../common/actionFactory/useActions';
import { SearchMoviesActions } from '../../actions/actions';

/** Компонент AppBar поиска фильмов. */
export const SearchMoviesAppBarHeader: React.FC = () => {
    const { query, page } = useAppSelector(state => state.searchMovies);
    const actions = useActions(actions => actions.searchMovies) as SearchMoviesActions;

    function handleChangeText(query: string) {
        actions.setQueryValue(query);
        if (query.length === 0) actions.clearData();
    }

    function handleSubmit() {
        if (query.length !== 0) {
            actions.submitQueryValue(query, page);
        }
    }

    function handleCancel() {
        actions.clearData();
    }

    return (
        <Searchbar
            placeholder='Поиск фильмов'
            style={styles.container}
            onChangeText={handleChangeText}
            value={query}
            onSubmitEditing={handleSubmit}
            onTouchCancel={handleCancel}
        />
    );
};

/** Стили. */
const styles = StyleSheet.create({
    container: {
        height: 40,
        elevation: 0,
    },
});
