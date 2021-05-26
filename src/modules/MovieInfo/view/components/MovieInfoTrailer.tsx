import React from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { isFulfilled } from '../../../../common/statusCheckers/asyncStatusCheckers';
import { Divider, Paragraph, Subheading } from 'react-native-paper';
import { FetchedDataChecker } from '../../../../common/statusCheckers/FetchedDataChecker';
import { IMovieTrailerInfo } from '../../store/models';
import { MovieInfoUtils } from '../../utils/MovieInfoUtils';
import YoutubePlayer from 'react-native-youtube-iframe';

interface IOwnProps {
    utils: MovieInfoUtils
}

/** Компонент трейлера. */
export const MovieInfoTrailer: React.FC<IOwnProps> = ({ utils }) => {
        const { trailer, trailerStatus } = useAppSelector(state => state.movieInfo);

        /** Ключ YouTube трейлера. */
        const getTrailerKey = (trailer: IMovieTrailerInfo | null) => {
            if (trailer) return utils.getYouTubeKey(trailer);
        };

        return (
            <>{getTrailerKey(trailer) && (
                <FetchedDataChecker show={Boolean(isFulfilled(trailerStatus))}>
                    <Divider />
                    <Subheading>Трейлер</Subheading>

                </FetchedDataChecker>)}
            </>
        );
    }
;