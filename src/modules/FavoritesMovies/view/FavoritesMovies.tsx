import React, { useEffect } from "react";
import { NavigationModel } from "../../../router/types";
import { RouterPaths } from "../../../router/routerPaths";
import { useActions } from "../../../common/actionFactory/useActions";
import { CommonActions } from "../../../common/store/actions";
import { Paragraph } from "react-native-paper";

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel<RouterPaths.MOVIES_LIST> {
}

/** Компонент списка избранных фильмов. */
export const FavoritesMovies: React.FC<IOwnProps> = ({route}) => {
  const commonActions = useActions(actions => actions.common) as CommonActions;

  useEffect(() => {
	commonActions.setCurrentRoute(RouterPaths.FAVORITES_MOVIES);
  }, [route.name]);

  return (
	  <Paragraph>Избранные фильмы</Paragraph>
  )
}
