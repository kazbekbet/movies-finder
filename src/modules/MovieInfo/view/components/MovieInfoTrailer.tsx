import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { isFulfilled } from '../../../../common/statusCheckers/asyncStatusCheckers';
import { Divider, Paragraph, Subheading } from 'react-native-paper';
import { FetchedDataChecker } from '../../../../common/statusCheckers/FetchedDataChecker';
import { MovieInfoUtils } from '../../utils/MovieInfoUtils';
import { WebView } from 'react-native-webview';

/** Модель пропсов компонента. */
interface IOwnProps {
    utils: MovieInfoUtils
}

/** Компонент трейлера. */
export const MovieInfoTrailer: React.FC<IOwnProps> = ({ utils }) => {
        const { trailer, trailerStatus } = useAppSelector(state => state.movieInfo);
        const [trailerKey, setTrailerKey] = useState<string>('');

        /** Сеттим значение ключа в стейт. */
        useEffect(() => {
            if (trailer) {
                const trailerKey = utils.getYouTubeKey(trailer);
                trailerKey && setTrailerKey(trailerKey);
            }
        }, [trailerStatus]);

        return (
            <>
                {
                    trailerKey && (
                        <FetchedDataChecker show={Boolean(isFulfilled(trailerStatus))}>
                            <Divider />
                            <Subheading>Трейлер</Subheading>
                            <Paragraph>{trailerKey}</Paragraph>
                            <WebView source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }} />;
                        </FetchedDataChecker>)
                }
            </>
        );
    }
;