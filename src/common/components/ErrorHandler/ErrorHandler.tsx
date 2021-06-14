import React, { useContext } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { SimpleDialog } from '../Dialogs/SimpleDialog';
import { ActionsContext } from '../CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../actionFactory/actionFactory';

/** Свойства компонента. */
interface IOwnProps {
    children: React.ReactNode;
}

/** Компонент обработки ошибок. */
export const ErrorHandler: React.FC<IOwnProps> = ({ children }) => {
    const { isError, errorText } = useAppSelector(state => state.common);
    const { commonActions } = useContext(ActionsContext) as ActionsFactory;

    return (
        <>
            <SimpleDialog
                isVisible={isError}
                title={'Ошибка'}
                description={errorText}
                onConfirm={commonActions.clearError}
                onDismiss={commonActions.clearError}
            />

            {children}
        </>
    );
};
