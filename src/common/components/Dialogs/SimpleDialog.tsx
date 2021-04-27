import * as React from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

interface IOwnProps {
    title?: string;
    description: string;
    onConfirm: () => void;
    onDismiss: () => void;
}

export const SimpleDialog: React.FC<IOwnProps> = ({ title, description, onConfirm, onDismiss }) => {
    const [visible, setVisible] = React.useState(true);

    const handleConfirm = () => {
        setVisible(false);
        onConfirm();
    };

    const handleDismiss = () => {
        setVisible(false);
        onDismiss();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={handleDismiss}>
                {title && <Dialog.Title>{title}</Dialog.Title>}
                <Dialog.Content>
                    <Paragraph>{description}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleConfirm}>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
