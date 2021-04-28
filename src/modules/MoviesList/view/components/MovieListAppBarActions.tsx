import React from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { SortTypes, SortTypesLocalization } from '../../../../common/enums/sortTypes';
import { useActions } from '../../../../common/actionFactory/useActions';
import { useAppSelector } from '../../../../store/hooks';
import { MovieListActions } from '../../actions/actions';

/** Компонент экшенов в AppBar списка фильмов. */
export const MovieListAppBarActions: React.FC = () => {
    const actions = useActions(actions => actions.moviesList) as MovieListActions;
    const { sortBy } = useAppSelector(state => state.moviesList);
    const [showMenu, setShowMenu] = React.useState(false);

    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);

    const handleNavigate = (sort: SortTypes) => {
        closeMenu();
        sortBy !== sort && actions.changeSort(sort);
    };

    return (
        <Menu
            visible={showMenu}
            onDismiss={closeMenu}
            anchor={<IconButton icon='filter-menu-outline' color={'#fff'} size={24} onPress={openMenu} />}
        >
            <Menu.Item
                onPress={handleNavigate.bind(null, SortTypes.POPULARITY)}
                title={SortTypesLocalization[SortTypes.POPULARITY]}
            />
            <Menu.Item
                onPress={handleNavigate.bind(null, SortTypes.REVENUE)}
                title={SortTypesLocalization[SortTypes.REVENUE]}
            />
            <Menu.Item
                onPress={handleNavigate.bind(null, SortTypes.VOTE_COUNT)}
                title={SortTypesLocalization[SortTypes.VOTE_COUNT]}
            />
            <Menu.Item
                onPress={handleNavigate.bind(null, SortTypes.VOTE_AVERAGE)}
                title={SortTypesLocalization[SortTypes.VOTE_AVERAGE]}
            />
            <Menu.Item
                onPress={handleNavigate.bind(null, SortTypes.RELEASE_DATE)}
                title={SortTypesLocalization[SortTypes.RELEASE_DATE]}
            />
        </Menu>
    );
};
