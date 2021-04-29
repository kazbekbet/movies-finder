import * as React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

interface IOwnProps {
    title?: string;
    description: string;
    onConfirm: () => void;
    onDismiss: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const SimpleDialog: React.FC<IOwnProps> = props => {
    const { title, description, onConfirm, onDismiss, confirmText, cancelText } = props;

    const handleConfirm = () => {
        onConfirm();
    };

    const handleDismiss = () => {
        onDismiss();
    };

    return (
        <Portal>
            <Dialog visible={true} onDismiss={handleDismiss}>
                {title && <Dialog.Title>{title}</Dialog.Title>}
                <Dialog.Content>
                    <Paragraph>{description}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    {cancelText && <Button onPress={handleDismiss}>{cancelText}</Button>}
                    <Button onPress={handleConfirm}>{confirmText ?? 'OK'}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
