import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface IOwnProps {
    title: string;
}

export const MovieInfoAppBarHeader: React.FC<IOwnProps> = ({ title }) => {
    const getTitle = () => {
        if (!title) return 'Без названия';
        if (title && title.length > 16) return `${title.slice(0, 16)}...`;
        return title;
    };

    return <Text style={styles.header}>{getTitle()}</Text>;
};

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
});
