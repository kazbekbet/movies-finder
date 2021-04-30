import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { themeConfig } from '../../theme/themeConfig';

interface IOwnProps {
    setDefaultPaddingTop?: boolean;
    customSize?: number
}

export const Spinner: React.FC<IOwnProps> = ({ setDefaultPaddingTop, customSize }) => {
    return (
        <ActivityIndicator
            style={{ paddingTop: setDefaultPaddingTop ? 16 : 0 }}
            animating={true}
            color={themeConfig.colors.accent}
            size={customSize ?? 32}
        />
    );
};

