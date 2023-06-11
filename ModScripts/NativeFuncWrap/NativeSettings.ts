import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const SettingsFuncsInfo = {
    /**
     * ```c
     * void Core::Settings::StaticCtor(void)
     * ```
     */
    StaticCtor: new NativeFunctionInfo(0x1799165, 'void', []),
}

export const NativeSettings = {
    StaticCtor() {
        PatchHelper.GetNativeFunction(SettingsFuncsInfo.StaticCtor)();
    },
    OverrideStaticCtor(newImp: () => void): () => void {
        return PatchHelper.HookSTSFunction(SettingsFuncsInfo.StaticCtor, newImp);
    },
};