import React, { useContext } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { SortTypes, SortTypesLocalization } from '../../../../common/enums/sortTypes';
import { useAppSelector } from '../../../../store/hooks';
import { ActionsContext } from '../../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../../common/actionFactory/actionFactory';

/** Компонент экшенов в AppBar списка фильмов. */
export const MovieListAppBarActions: React.FC = () => {
    const { sortBy } = useAppSelector(state => state.moviesList);
    const [showMenu, setShowMenu] = React.useState(false);

    /** Экшены компонента. */
    const { moviesListActions } = useContext(ActionsContext) as ActionsFactory;

    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);

    const handleNavigate = (sort: SortTypes) => () => {
        closeMenu();
        sortBy !== sort && moviesListActions.changeSort(sort);
    };

    return (
        <Menu
            visible={showMenu}
            onDismiss={closeMenu}
            anchor={<IconButton icon='filter-menu-outline' color={'#fff'} size={24} onPress={openMenu} />}
        >
            <Menu.Item
                icon='star-outline'
                onPress={handleNavigate(SortTypes.POPULARITY)}
                title={SortTypesLocalization[SortTypes.POPULARITY]}
            />
            <Menu.Item
                icon='currency-usd'
                onPress={handleNavigate(SortTypes.REVENUE)}
                title={SortTypesLocalization[SortTypes.REVENUE]}
            />
            <Menu.Item
                icon='account-group-outline'
                onPress={handleNavigate(SortTypes.VOTE_COUNT)}
                title={SortTypesLocalization[SortTypes.VOTE_COUNT]}
            />
            <Menu.Item
                icon='account-star-outline'
                onPress={handleNavigate(SortTypes.VOTE_AVERAGE)}
                title={SortTypesLocalization[SortTypes.VOTE_AVERAGE]}
            />
            <Menu.Item
                icon='calendar-range'
                onPress={handleNavigate(SortTypes.RELEASE_DATE)}
                title={SortTypesLocalization[SortTypes.RELEASE_DATE]}
            />
        </Menu>
    );
};
