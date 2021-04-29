import React from 'react';
import { AppBarHeader } from '../../../../common/components/AppBar/AppBarHeader';

interface IOwnProps {
    title: string;
}

export const MovieInfoAppBarHeader: React.FC<IOwnProps> = ({ title }) => {
    const getTitle = () => {
        if (!title) return 'Без названия';
        if (title && title.length > 16) return `${title.slice(0, 16)}...`;
        return title;
    };

    return <AppBarHeader title={getTitle()} />;
};
