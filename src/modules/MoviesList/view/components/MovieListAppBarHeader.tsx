import React from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { StyleSheet, Text } from 'react-native';
import { SortTypesLocalization } from '../../../../common/enums/sortTypes';

export const MovieListAppBarHeader: React.FC = () => {
    const { page, sortBy } = useAppSelector(store => store.moviesList);

    const getSubheaderContent = () => {
        if (sortBy && page) {
            return `${SortTypesLocalization[sortBy]}, страница: ${page}`;
        } else return 'Ошибка данных';
    };

    return (
        <>
            <Text style={styles.header}>Список фильмов</Text>
            <Text style={styles.subheader}>{getSubheaderContent()}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    subheader: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
    },
});
