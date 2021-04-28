import React, { useEffect, useLayoutEffect } from 'react';
import { NavigationModel } from '../../../router/types';
import { RouterPaths } from '../../../router/routerPaths';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MovieInfoAppBarHeader } from './components/MovieInfoAppBarHeader';
import { useActions } from '../../../common/actionFactory/useActions';
import { MovieInfoActions } from '../actions/actions';
import { isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { Spinner } from '../../../common/components/Spinner/Spinner';
import { useAppSelector } from '../../../store/hooks';
import { Card, Chip, Paragraph, Title } from 'react-native-paper';
import { ApiConfig } from '../../../common/api/config';
import { textColorsConfig } from '../../../common/theme/themeConfig';
import { MovieInfoAppBarActions } from './components/MovieInfoAppBarActions';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel<RouterPaths.MOVIE_INFO> {}

/** Компонент детальной информации о фильме. */
export const MovieInfo: React.FC<IOwnProps> = ({ route, navigation }) => {
    const { result, status } = useAppSelector(state => state.movieInfo);
    const actions = useActions(actions => actions.movieInfo) as MovieInfoActions;

    /** Специальные опции для AppBar. */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <MovieInfoAppBarHeader title={route.params.title} />,
            headerRight: () => <MovieInfoAppBarActions />,
        });
    }, [navigation]);

    /** Действия при маунте компонента. */
    useEffect(() => {
        actions.getMovieInfo(route.params.id);
        return () => actions.clearMovieInfoData();
    }, []);

    const setPoster = () => `${ApiConfig.POSTER_URL}${result?.backdrop_path}`;
    const setDescription = () => (result?.overview ? result.overview : 'Без описания');
    const getGenres = () =>
        result?.genres?.map(genre => (
            <Chip key={genre.id} style={styles.chip}>
                {genre.name}
            </Chip>
        ));

    return (
        <>
            <ScrollView style={styles.container}>
                {isPending(status) && !result && <Spinner />}
                {!isPending(status) && result && (
                    <>
                        <Card.Cover source={{ uri: setPoster() }} />
                        <View style={styles.content}>
                            <Title>{result?.title}</Title>

                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                style={styles.genresContainer}
                            >
                                {getGenres()}
                            </ScrollView>

                            <Paragraph style={styles.textDescription}>{setDescription()}</Paragraph>
                        </View>
                    </>
                )}
            </ScrollView>
        </>
    );
};

const { HEADLINE, DESCRIPTION, PROPERTIES } = textColorsConfig.READ_CONTENT;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
    },
    content: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    textDescription: {
        color: DESCRIPTION,
    },
    genresContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    chip: {
        marginRight: 8,
    },
});
