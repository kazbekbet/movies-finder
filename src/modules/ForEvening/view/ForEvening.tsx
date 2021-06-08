import React, { useEffect, useState } from 'react';
import { NavigationModel } from '../../../router/types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ForEveningGenres } from './components/ForEveningGenres';
import { Genre } from '../../../common/store/model';
import { Button } from 'react-native-paper';
import { ForEveningSearchRequest } from '../store/models';
import { useActions } from '../../../common/actionFactory/useActions';
import { useAppSelector } from '../../../store/hooks';
import { isEmpty, random } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { RouterPaths } from '../../../router/routerPaths';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { LoadingSpinner } from '../../../common/components/Spinner/LoadingSpinner';
import { ForEveningYearInput } from './components/ForEveningYearInput';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент "Фильм на вечер". */
export const ForEvening: React.FC<IOwnProps> = () => {
    const { getMovies } = useActions(actions => actions.forEvening);
    const { movies, status } = useAppSelector(state => state.forEvening);

    const navigation = useNavigation();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [year, setYear] = useState<string>('');
    const [randomMovie, setRandomMovie] = useState<IMovieShortInfo>();

    useEffect(() => {
        getRandomMovie();
    }, [movies]);

    useEffect(() => {
        if (randomMovie) {
            handleNavigate(randomMovie.id, randomMovie.title);
        }
    }, [randomMovie]);

    async function handleSearch() {
        const request: ForEveningSearchRequest = {
            genres: genres.map(genre => genre.id).toString(),
            year: parseInt(year),
        };
        await getMovies(request);
    }

    function getRandomMovie() {
        if (movies && movies.results && !isEmpty(movies.results)) {
            const randomIndex = random(0, movies.results.length - 1);
            const randomMovie = movies.results[randomIndex];
            setRandomMovie(randomMovie);
        }
    }

    function handleNavigate(id: number, title: string) {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View>
                    <ForEveningGenres selectedGenres={genres} setSelectedGenres={setGenres} />
                    <ForEveningYearInput value={year} setValue={setYear} />
                    <Button mode={'contained'} onPress={handleSearch} icon='arrow-right-thick'>
                        Найти фильм на вечер
                    </Button>
                </View>
                <LoadingSpinner status={status} />
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
