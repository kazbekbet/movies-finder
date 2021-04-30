import * as React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

/** Модель свойств. */
interface IOwnProps {
    isVisible: boolean;
    title?: string;
    description: string;
    onConfirm: () => void;
    onDismiss: () => void;
    confirmText?: string;
    cancelText?: string;
}

/** Компонент простого диалога. */
export const SimpleDialog: React.FC<IOwnProps> = props => {
    const { isVisible, title, description, onConfirm, onDismiss, confirmText, cancelText } = props;

    return (
        <Portal>
            <Dialog visible={isVisible} onDismiss={onDismiss}>
                {title && <Dialog.Title>{title}</Dialog.Title>}
                <Dialog.Content>
                    <Paragraph style={styles.description}>{description}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    {cancelText && (
                        <Button color={'rgba(0,0,0,0.6)'} style={styles.button} onPress={onDismiss}>
                            {cancelText}
                        </Button>
                    )}
                    <Button onPress={onConfirm}>{confirmText ?? 'OK'}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

/** Стили. */
const styles = StyleSheet.create({
    title: {
        color: 'rgba(0,0,0,0.87)',
    },
    button: {
        marginRight: 8
    },
    description: {
        color: 'rgba(0,0,0,0.6)',
    },
});
