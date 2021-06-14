import React, { createContext, useEffect } from 'react';
import { useActions } from '../../actionFactory/useActions';

/** Свойства компонента. */
interface IOwnProps {
    children: React.ReactNode;
}

export const ActionsContext = createContext({});

/** Враппер общих экшенов. */
export const CommonEffectWrapper: React.FC<IOwnProps> = ({ children }) => {
    const appActions = useActions(actions => actions);
    const { commonActions } = appActions;

    useEffect(() => {
        commonActions.getUSDCurrencyRate();
        commonActions.getGenres();
    }, []);

    return <ActionsContext.Provider value={appActions}>{children}</ActionsContext.Provider>;
};
