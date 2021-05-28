import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { MovieInfoUtils } from '../../utils/MovieInfoUtils';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View } from 'react-native';
import { Paragraph } from "react-native-paper";

/** Модель пропсов компонента. */
interface IOwnProps {
    utils: MovieInfoUtils;
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

    /*return (
	<>
		{
			trailerKey && (
				<FetchedDataChecker show={Boolean(isFulfilled(trailerStatus))}>
					<Divider />
					{/!*<Subheading>Трейлер</Subheading>*!/}
					{/!*<Paragraph>{trailerKey}</Paragraph>*!/}
					{/!*<WebView source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }} />;*!/}
				</FetchedDataChecker>)
		}
	</>
);*/
    return (
        <>
            {trailerKey && (
                <View>
                    <Paragraph>{trailerKey}</Paragraph>
                   {/* <YoutubePlayer height={300} play={false} videoId={trailerKey} />*/}
                </View>
            )}
        </>
    );
};
