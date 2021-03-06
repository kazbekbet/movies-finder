import React from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { StyleSheet, View } from 'react-native';
import { Chip, Subheading } from 'react-native-paper';
import { capitalize } from 'lodash';
import { Genre } from '../../../../common/store/model';

/** Модель собственных свойств компонента. */
interface IOwnProps {
    selectedGenres: Genre[];
    setSelectedGenres: (genres: Genre[]) => void;
}

/** Компонент выбора жанров. */
export const ForEveningGenres: React.FC<IOwnProps> = ({ selectedGenres, setSelectedGenres }) => {
    const { genres } = useAppSelector(state => state.common);

    /** Поиск жанра по id. */
    function findGenre(id: number) {
        return selectedGenres.find(selected => selected.id === id);
    }

    /** Обработчик изменения массива жанров. */
    const handleSelectGenre = (genre: Genre) => () => {
        const foundGenre = findGenre(genre.id);

        if (foundGenre) {
            const newSelectedList = selectedGenres.filter(genres => genres.id !== foundGenre.id);
            setSelectedGenres(newSelectedList);
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    return (
        <View>
            <Subheading>Выберите подходящие жанры</Subheading>
            <View style={styles.genresContainer}>
                {genres &&
                    genres.map(genre => (
                        <Chip
                            selected={Boolean(findGenre(genre.id))}
                            style={styles.chip}
                            key={genre.id}
                            onPress={handleSelectGenre(genre)}
                        >
                            {capitalize(genre.name)}
                        </Chip>
                    ))}
            </View>
        </View>
    );
};

/** Стили компонента. */
const styles = StyleSheet.create({
    chip: {
        marginRight: 8,
        marginVertical: 4,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 8,
    },
});
