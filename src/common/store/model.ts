import { RouterPaths } from "../../router/routerPaths";

export interface CommonReducer {
    isError: boolean;
    errorText: string;
    currentRoute: RouterPaths | null;
}
