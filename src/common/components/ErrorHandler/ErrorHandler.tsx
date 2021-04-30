import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { SimpleDialog } from '../Dialogs/SimpleDialog';
import { useActions } from '../../actionFactory/useActions';
import { CommonActions } from '../../store/actions';

/** Свойства компонента. */
interface IOwnProps {
    children: React.ReactNode;
}

/** Компонент обработки ошибок. */
export const ErrorHandler: React.FC<IOwnProps> = ({ children }) => {
    const { isError, errorText } = useAppSelector(state => state.common);
    const actions = useActions(actions => actions.common) as CommonActions;

    return (
        <>
            <SimpleDialog
                isVisible={isError}
                title={'Ошибка'}
                description={errorText}
                onConfirm={actions.clearError}
                onDismiss={actions.clearError}
            />

            {children}
        </>
    );
};
