import React, { useEffect, useState } from 'react';
import { NavigationModel } from '../../../router/types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ForEveningGenres } from './components/ForEveningGenres';
import { Genre } from '../../../common/store/model';
import { Button, Caption } from 'react-native-paper';
import { ForEveningSearchRequest } from '../store/models';
import { useActions } from '../../../common/actionFactory/useActions';
import { useAppSelector } from '../../../store/hooks';
import { isEmpty, random, findLastIndex } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { RouterPaths } from '../../../router/routerPaths';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { LoadingSpinner } from '../../../common/components/Spinner/LoadingSpinner';
import { ForEveningYearInput } from './components/ForEveningYearInput';
import { isFulfilled } from '../../../common/statusCheckers/asyncStatusCheckers';
import { ForEveningUtils } from '../utils/ForEveningUtils';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент "Фильм на вечер". */
export const ForEvening: React.FC<IOwnProps> = () => {
    const { getMovies, getHistory, setMovieToHistory } = useActions(actions => actions.forEvening);
    const { movies, status } = useAppSelector(state => state.forEvening);
    const utils = new ForEveningUtils();
    const navigation = useNavigation();

    /** Локальное состояние. */
    const [genres, setGenres] = useState<Genre[]>([]);
    const [year, setYear] = useState<string>('');
    const [inputError, setInputError] = useState<boolean>(false);
    const [randomMovie, setRandomMovie] = useState<IMovieShortInfo>();

    useEffect(() => {
        getHistory();
    }, []);

    useEffect(() => {
        getRandomMovie();
    }, [movies]);

    useEffect(() => {
        if (randomMovie) {
            handleNavigate(randomMovie.id, randomMovie.title);
        }
    }, [randomMovie]);

    async function handleSearch() {
        const request: ForEveningSearchRequest = utils.getRequest(genres, year);
        await getMovies(request);
    }

    async function getRandomMovie() {
        if (movies && movies.results && !isEmpty(movies.results)) {
            const randomIndex = random(0, findLastIndex(movies.results));
            const randomMovie = movies.results[randomIndex];

            setRandomMovie(randomMovie);
            await setMovieToHistory(randomMovie);
        }
    }

    function handleNavigate(id: number, title: string) {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    }

    const handleSetInputError = (state: boolean) => setInputError(state);
    const isButtonDisabled = (isEmpty(genres) && isEmpty(year)) || inputError;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View>
                    <ForEveningGenres selectedGenres={genres} setSelectedGenres={setGenres} />
                    <ForEveningYearInput setError={handleSetInputError} value={year} setValue={setYear} utils={utils} />
                    <Button
                        disabled={isButtonDisabled}
                        mode={'contained'}
                        onPress={handleSearch}
                        icon='arrow-right-thick'
                    >
                        Найти фильм на вечер
                    </Button>
                </View>
                <LoadingSpinner status={status} />
                {isFulfilled(status) && isEmpty(movies?.results) && (
                    <Caption style={styles.notFoundText}>По заданным критериям не найдено результатов.</Caption>
                )}
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
    notFoundText: {
        textAlign: 'center',
        paddingTop: 16,
    },
});
