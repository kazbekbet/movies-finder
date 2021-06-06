import React, { useEffect, useState } from 'react';
import { NavigationModel } from '../../../router/types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ForEveningGenres } from './components/ForEveningGenres';
import { Genre } from '../../../common/store/model';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент "Фильм на вечер". */
export const ForEvening: React.FC<IOwnProps> = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [year, setYear] = useState<number>();

    useEffect(() => {
        console.log(genres)
    }, [genres])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <ForEveningGenres selectedGenres={genres} setSelectedGenres={setGenres} />
            </View>
        </ScrollView>
    );
};

/** Стили компонента. */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
    },
    content: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
});
