import React from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { SortTypesLocalization } from '../../../../common/enums/sortTypes';
import { AppBarHeader } from '../../../../common/components/AppBar/AppBarHeader';

export const MovieListAppBarHeader: React.FC = () => {
    const { page, sortBy } = useAppSelector(store => store.moviesList);

    const getSubheaderContent = () => {
        if (sortBy && page) {
            return `${SortTypesLocalization[sortBy]}, страница: ${page}`;
        } else return 'Ошибка данных';
    };

    return <AppBarHeader title='Список фильмов' subtitle={getSubheaderContent()} />;
};
