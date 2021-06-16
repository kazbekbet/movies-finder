import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAppSelector } from '../../../../store/hooks';
import { isEmpty } from 'lodash';
import * as Linking from 'expo-linking';
import { ApiConfig } from '../../../../common/api/config';
import { ContentBlock } from '../../../../common/components/Content/ContentBlock';

export const MovieInfoLinks: React.FC = () => {
    const { result } = useAppSelector(state => state.movieInfo);

    const handleOpenHomepage = (url: string) => () => Linking.openURL(url);
    const handleOpenImdb = (id: string) => () => Linking.openURL(`${ApiConfig.IMDB_INFO}${id}`);

    return (
        result && (
            <ContentBlock title={'Ссылки'} condition={Boolean(result.imdb_id || result.homepage)}>
                <View style={styles.container}>
                    {result.homepage && !isEmpty(result.homepage) ? (
                        <Button style={styles.button} mode={'contained'} onPress={handleOpenHomepage(result.homepage)}>
                            Домашняя
                        </Button>
                    ) : (
                        <></>
                    )}
                    {result.imdb_id && !isEmpty(result.imdb_id) ? (
                        <Button mode={'outlined'} onPress={handleOpenImdb(result.imdb_id)}>
                            IMDB
                        </Button>
                    ) : (
                        <></>
                    )}
                </View>
            </ContentBlock>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    button: {
        marginRight: 8,
    },
});
