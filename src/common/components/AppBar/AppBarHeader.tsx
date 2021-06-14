import * as React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IOwnProps {
    title: string;
    subtitle?: string;
}

export const AppBarHeader: React.FC<IOwnProps> = ({ title, subtitle }) => {
    return (
        <>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.8)',
    },
});
