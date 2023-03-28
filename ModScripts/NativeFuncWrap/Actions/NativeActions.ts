import { NativeAbstractGameAction } from "./NativeAbstractGameAction.js";
import { NativeCommonActions } from "./NativeCommonActions.js";
import { NativeUniqueActions } from "./NativeUniqueActions.js";
import { NativeUtilityActions } from "./NativeUtilityActions.js";

export const NativeActions = {
    Abstract: NativeAbstractGameAction,
    common: NativeCommonActions,
    unique: NativeUniqueActions,
    utility: NativeUtilityActions
};