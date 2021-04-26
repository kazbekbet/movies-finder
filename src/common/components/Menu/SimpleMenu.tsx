import * as React from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { SortTypes, SortTypesLocalization } from '../../enums/sortTypes';

interface IOwnProps {
    children: React.ReactNode;
}

export const SimpleMenu: React.FC<IOwnProps> = ({ children }) => {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon='dots-vertical' size={24} onPress={openMenu} />}
        >
            {children}
        </Menu>
    );
};
