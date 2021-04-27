import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';

export const MovieInfoAppBarActions: React.FC = () => {
    const [selected, setSelected] = useState(false);

    const handlePress = () => {
        setSelected(!selected);
    };
    const getIcon = () => (selected ? 'heart' : 'heart-outline');

    return <IconButton icon={getIcon()} color={'#fff'} size={24} onPress={handlePress}/>;
};
