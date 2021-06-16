import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { NavigationModel } from '../../../router/types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MovieInfoAppBarHeader } from './components/MovieInfoAppBarHeader';
import { isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { useAppSelector } from '../../../store/hooks';
import { Caption, Card, Chip, Divider, Paragraph, Title } from 'react-native-paper';
import { textColorsConfig } from '../../../common/theme/themeConfig';
import { MovieInfoAppBarActions } from './components/MovieInfoAppBarActions';
import { capitalize, isEmpty } from 'lodash';
import { LoadingSpinner } from '../../../common/components/Spinner/LoadingSpinner';
import { FetchedDataChecker } from '../../../common/statusCheckers/FetchedDataChecker';
import { MovieInfoUtils } from '../utils/MovieInfoUtils';
import { MovieInfoTable } from './components/MovieInfoTable';
import { ActionsContext } from '../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../common/actionFactory/actionFactory';
import { MovieInfoLinks } from './components/MovieInfoLinks';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент детальной информации о фильме. */
export const MovieInfo: React.FC<IOwnProps> = ({ route, navigation }) => {
    const { result, status } = useAppSelector(state => state.movieInfo);
    const utils = new MovieInfoUtils();

    /** Экшены компонента. */
    const { movieInfoActions } = useContext(ActionsContext) as ActionsFactory;

    /** Специальные опции для AppBar. */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <MovieInfoAppBarHeader title={route.params?.title ?? 'Ошибка загрузки'} />,
            headerRight: () => <MovieInfoAppBarActions />,
        });
    }, [navigation]);

    /** Действия при маунте компонента. */
    useEffect(() => {
        if (route.params?.id) {
            movieInfoActions.getMovieInfo(route.params.id);
            movieInfoActions.getMovieTrailer(route.params.id);
        }

        return () => movieInfoActions.clearMovieInfoData();
    }, []);

    /** Путь постера. */
    const posterPath = utils.getMoviePoster(result?.backdrop_path);

    return (
        <>
            <ScrollView style={styles.container}>
                <LoadingSpinner status={status} />

                <FetchedDataChecker show={Boolean(!isPending(status) && result)}>
                    {result && (
                        <>
                            {posterPath && <Card.Cover source={{ uri: posterPath }} />}
                            <View style={styles.content}>
                                <Title>{result.title}</Title>
                                {!isEmpty(result.tagline) && <Caption>{result.tagline}</Caption>}
                                <View style={styles.genresContainer}>
                                    {result.genres?.map(genre => (
                                        <Chip key={genre.id} style={styles.chip}>
                                            {capitalize(genre.name)}
                                        </Chip>
                                    ))}
                                </View>
                                <Paragraph style={styles.textDescription}>
                                    {result.overview ?? 'Без описания'}
                                </Paragraph>
                                <Divider />
                                <MovieInfoTable movie={result} />
                                {/*<MovieInfoTrailer utils={utils} />*/}
                                <Divider />
                                <MovieInfoLinks />
                            </View>
                        </>
                    )}
                </FetchedDataChecker>
            </ScrollView>
        </>
    );
};

const { DESCRIPTION } = textColorsConfig.READ_CONTENT;

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
        paddingBottom: 8,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 8,
    },
    chip: {
        marginRight: 8,
        marginVertical: 4,
    },
});
