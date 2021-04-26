import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { textColorsConfig } from '../../theme/themeConfig';
import { RippleEffect } from '../Ripple/RippleEffect';
import { ApiConfig } from '../../api/config';

/**
 * Модель пропсов для компонента карточки фильма.
 *
 * @prop {string} title - Наименование фильма.
 * @prop {string} description - Краткое описание.
 * @prop {string} posterUrl - Постер.
 * */
interface IOwnProps {
    title: string;
    description: string;
    posterPath: string;
}

/** Компонент карточки фильма в списке. */
export const MovieCard: React.FC<IOwnProps> = ({ title, description, posterPath }) => {
    const isShown = (title && description) || (posterPath && title);

    const handlePress = () => console.log('Card is pressed');

    const setDescription = () => {
        if (description) {
            if (description.length <= 140) {
                return description;
            } else {
                const slicedDescription = description.slice(0, 140);
                return `${slicedDescription}...`;
            }
        }
    };

    const setPoster = () => `${ApiConfig.POSTER_URL}${posterPath}`;

    return isShown ? (
        <Card style={styles.container} onPress={handlePress}>
            <RippleEffect onPress={handlePress}>
                <View>
                    {posterPath && <Card.Cover source={{ uri: setPoster() }} />}
                    <Card.Content style={styles.content}>
                        {title && <Title style={styles.textTitle}>{title}</Title>}
                        <Paragraph style={styles.textDescription}>{setDescription()}</Paragraph>
                    </Card.Content>
                </View>
            </RippleEffect>
        </Card>
    ) : (
        <></>
    );
};

const { HEADLINE, DESCRIPTION } = textColorsConfig.READ_CONTENT;

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    content: {
        marginVertical: 12,
    },
    textTitle: {
        color: HEADLINE,
    },
    textDescription: {
        color: DESCRIPTION,
    },
});
