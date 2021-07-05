import React, { useContext, useEffect } from 'react';
import { Divider } from 'react-native-paper';
import { isFulfilled } from '../../../../common/statusCheckers/asyncStatusCheckers';
import { ActionsContext } from '../../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../../common/actionFactory/actionFactory';
import { ContentBlock } from '../../../../common/components/Content/ContentBlock';
import { useAppSelector } from '../../../../store/hooks';
import { SimilarMovieCard } from '../../../../common/components/MovieCard/SimilarMovieCard';
import { MovieCard } from '../../../../common/components/MovieCard/MovieCard';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouterPaths } from '../../../../router/routerPaths';

/** Модель собственных свойств. */
interface IOwnProps {
    id: number;
}

/** Компонент отображения похожих фильмов. */
export const MovieInfoSimilarMovies: React.FC<IOwnProps> = ({ id }) => {
    const { similarMoviesStatus, similarMovies } = useAppSelector(state => state.movieInfo);
    const navigation = useNavigation();

    /** Экшены компонента. */
    const { movieInfoActions } = useContext(ActionsContext) as ActionsFactory;

    useEffect(() => {
        movieInfoActions.getSimilarMovies(id);
    }, []);

    const isAllDataFetched = () => isFulfilled(similarMoviesStatus) && Boolean(similarMovies);

    /** Переход к детальной информации о фильме. */
    const handleNavigate = ({ id, title }: { id: number; title: string }) => () => {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    };

    return (
        <ContentBlock title={'Похожие фильмы'} condition={isAllDataFetched()}>
            <>
                {similarMovies && similarMovies.results && (
                    <FlatList
                        data={similarMovies.results}
                        keyExtractor={movie => (movie.id + movie.vote_average + movie.vote_count).toString()}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        renderItem={movie => (
                            <SimilarMovieCard
                                data={movie.item}
                                onPress={handleNavigate({
                                    id: movie.item.id,
                                    title: movie.item.title,
                                })}
                            />
                        )}
                    />
                )}
            </>
        </ContentBlock>
    );
};
