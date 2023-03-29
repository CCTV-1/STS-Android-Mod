import { NativeAbstractPower } from "./Powers/NativeAbstractPower.js";
import { NativeCommonPowers } from "./Powers/NativeCommonPowers.js";
import { NativeDefectPowers } from "./Powers/NativeDefectPowers.js";
import { NativeIroncladPowers } from "./Powers/NativeIroncladPowers.js";
import { NativeWatcherPowers } from "./Powers/NativeWatcherPowers.js";

export const NativePowers = {
    Abstract: NativeAbstractPower,
    Common: NativeCommonPowers,
    Defect: NativeDefectPowers,
    Ironclad: NativeIroncladPowers,
    Watcher: NativeWatcherPowers,
};