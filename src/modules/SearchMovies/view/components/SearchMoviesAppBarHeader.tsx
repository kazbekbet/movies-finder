import React, { useContext } from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../../../../store/hooks';
import { ActionsContext } from '../../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../../common/actionFactory/actionFactory';

/** Компонент AppBar поиска фильмов. */
export const SearchMoviesAppBarHeader: React.FC = () => {
    const { query, page } = useAppSelector(state => state.searchMovies);

    /** Экшены компонента. */
    const { searchMoviesActions } = useContext(ActionsContext) as ActionsFactory;
    const { setQueryValue, clearData, submitQueryValue } = searchMoviesActions;

    function handleChangeText(query: string) {
        setQueryValue(query);
        if (query.length === 0) clearData();
    }

    function handleSubmit() {
        if (query.length !== 0) {
            submitQueryValue(query, page);
        }
    }

    function handleCancel() {
        clearData();
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
