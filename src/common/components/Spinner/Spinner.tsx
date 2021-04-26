import React from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { themeConfig } from "../../theme/themeConfig";

export const Spinner: React.FC = () => <ActivityIndicator animating={true} color={themeConfig.colors.accent} size={32} />

