import { NativeAbstractGameAction } from "./Actions/NativeAbstractGameAction.js";
import { NativeCommonActions } from "./Actions/NativeCommonActions.js";
import { NativeUniqueActions } from "./Actions/NativeUniqueActions.js";
import { NativeUtilityActions } from "./Actions/NativeUtilityActions.js";

export const NativeActions = {
    Abstract: NativeAbstractGameAction,
    common: NativeCommonActions,
    unique: NativeUniqueActions,
    utility: NativeUtilityActions
};