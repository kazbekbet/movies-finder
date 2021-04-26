import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

interface IOwnProps {
    currentPage: number;

    onOpenNextPage(): void;

    onOpenPreviousPage(): void;
}

export const MovieListPagination: React.FC<IOwnProps> = ({ onOpenNextPage, onOpenPreviousPage, currentPage }) => {
    return (
        <View style={styles.container}>
            {currentPage === 1 && (
                <Button mode={'outlined'} onPress={onOpenNextPage}>
                    Следующая страница
                </Button>
            )}
            {currentPage > 1 && (
                <View style={styles.pagination}>
                    <Button mode={'outlined'} onPress={onOpenPreviousPage}>
                        Назад
                    </Button>
                    <Button mode={'contained'} onPress={onOpenNextPage} icon="arrow-right-thick">
                        Вперед
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
        marginHorizontal: 16,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
