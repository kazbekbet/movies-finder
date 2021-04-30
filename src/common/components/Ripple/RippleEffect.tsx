import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { effectsColorConfig, themeConfig } from '../../theme/themeConfig';
import { StyleSheet } from 'react-native';

interface IOwnProps {
    onPress: () => void;
    children: React.ReactElement;
    onLongPress?: () => void;
}

export const RippleEffect: React.FC<IOwnProps> = ({ onPress, children, onLongPress }) => {
    const { RIPPLE } = effectsColorConfig;

    const handleLongPress = () => onLongPress && onLongPress();

    return (
        <TouchableRipple
            onLongPress={handleLongPress}
            style={styles.container}
            onPress={onPress}
            rippleColor={RIPPLE}
            borderless
        >
            {children}
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: themeConfig.roundness,
    },
});
