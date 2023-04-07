import { NativeFunctionInfo } from "./NativeFuncWrap/NativeFunctionInfo.js"

export class PatchHelper {
    static readonly STSModuleBaseAddress = Module.findBaseAddress("libSpire_ANDROID.so") || NULL;
    static readonly ScriptDir = "/sdcard/Android/data/com.humble.SlayTheSpire/files/ModScripts/";
    static readonly ResourceDir = "/sdcard/Android/data/com.humble.SlayTheSpire/files/ModResources/";

    static readonly #STSLogger = new File(PatchHelper.ScriptDir + "ModLog.txt", "w+");
    static readonly RewriteVFuncMap = new Map<string, NativePointer>();
    static readonly #NativeFuncCache = new Map<string, NativeFunction<any, any>>();
    static readonly #GlobalVarCache = new Map<number, NativePointer>();

    static readonly InstructionPtr = {
        /**
         * AbstractDungeon::getRewardCards
         * 
         * origin Instruction: ```0x17BE846 05 25 MOVS R5, #3```
         */
        get rewardCardNumber() {
            return PatchHelper.#GetOffsetPtr(0x17BE846);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD89E 05 28 CMP R0, #5```
         */
        get VelvetChokerPlayCounter() {
            return PatchHelper.#GetOffsetPtr(0x19AD89E);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD8E2 06 28 CMP R0, #6```
         */
        get VelvetChokerCanPlayCheck() {
            return PatchHelper.#GetOffsetPtr(0x19AD8E2);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD904 06 21 MOVS R1, #6```
         */
        get VelvetChokerCanPlayStateValue() {
            return PatchHelper.#GetOffsetPtr(0x19AD904);
        }
    };

    static readonly STSGlobalVars = {
        get STSSetting_WIDTH() {
            return PatchHelper.#GetOffsetPtr(0x34987C0).readS32();
        },
        get STSSetting_HEIGHT() {
            return PatchHelper.#GetOffsetPtr(0x34987C4).readS32();
        },
        get AbstractDungeonInstancePtr() {
            return PatchHelper.STSModuleBaseAddress.add(0x3498EB0);
        },
        get EnergyPaneltotalCount() {
            return PatchHelper.#GetOffsetPtr(0x349ED34).readS32();
        }
    };

    static readonly fakeCodeGen = {
        V_PPP_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, void* arg2, void* arg3) { return ; }";
        },
        /** CModule compile don't support stdc20,if want use bool need include header file. */
        V_PB_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, char arg2) { return ; }";
        },
        /**if int != int32_t, this func not work. */
        V_PI32_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, int arg2) { return ; }";
        },
        /**if int != int32_t, this func not work. */
        V_PI32B_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, int arg2, char arg3) { return ; }";
        },
        /**if unsigned int != uint32_t, this func not work. */
        V_PU32_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, unsigned int arg2) { return ; }";
        },
        V_PF_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, float arg2) { return ; }";
        },
        V_PP_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, void* arg2) { return ; }";
        },
        V_P_Func(funcName: string) {
            return "void " + funcName + "(void * arg1) { return ; }";
        },
        /**if int != int32_t, this func not work. */
        V_PPI32_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, void * arg2, int arg3) { return ; }";
        },
        /**if int != int32_t, this func not work. */
        V_PPI32P_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, void * arg2, int arg3, void * arg4) { return ; }";
        },
        V_PPPP_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, void * arg2, void * arg3, void * arg4) { return ; }";
        },
        P_P_Func(funcName: string) {
            return "void* " + funcName + "(void * arg1) { return (void *)0; }";
        },
        B_P_Func(funcName: string) {
            return "char " + funcName + "(void * arg1) { return 0; }";
        },
        /**if int != int32_t, this func not work. */
        I32_P_Func(funcName: string) {
            return "int " + funcName + "(void * arg1) { return 0; }";
        },
        /** CModule compile don't support stdc20,if want use bool need include header file. */
        B_PP_Func(funcName: string) {
            return "char " + funcName + "(void * arg1, void * arg2) { return 0; }";
        },
        /**if int != int32_t, this func not work. */
        I32_PI32_Func(funcName: string) {
            return "int " + funcName + "(void * arg1, int arg2) { return 0; }";
        },
        /**if int != int32_t, this func not work. */
        I32_PF_Func(funcName: string) {
            return "int " + funcName + "(void * arg1, float arg2) { return 0; }";
        },
        /**if int != int32_t, this func not work. */
        I32_PP_Func(funcName: string) {
            return "int " + funcName + "(void * arg1, void * arg2) { return 0; }";
        },
        /**if int != int32_t, this func not work. */
        F_PI32_Func(funcName: string) {
            return "float " + funcName + "(void * arg1, int arg2) { return 0; }";
        },
        /**if int != int32_t, this func not work. */
        I32_PI32P_Func(funcName: string) {
            return "int " + funcName + "(void * arg1, int arg2, void * arg3) { return 0; }";
        },
        /**if int != int32_t, this func not work. */
        I32_PPI32_Func(funcName: string) {
            return "int " + funcName + "(void * arg1, void * arg2, int arg3) { return 0; }";
        },
    };

    static #GetOffsetPtr(offset: number): NativePointer {
        if (!PatchHelper.#GlobalVarCache.has(offset)) {
            PatchHelper.#GlobalVarCache.set(offset, PatchHelper.STSModuleBaseAddress.add(offset));
        }
        return PatchHelper.#GlobalVarCache.get(offset) || NULL;
    }

    static GetNativeFunction(origFuncInfo: NativeFunctionInfo): NativeFunction<any, any> {
        let funcAddressPtr = PatchHelper.STSModuleBaseAddress.add(origFuncInfo.funcOffset);
        let funcAddress = funcAddressPtr.toString();
        let nativeFunc = PatchHelper.#NativeFuncCache.get(funcAddress);
        if (nativeFunc === undefined) {
            nativeFunc = new NativeFunction(funcAddressPtr, origFuncInfo.retType, origFuncInfo.argTypes);
            PatchHelper.#NativeFuncCache.set(funcAddress, nativeFunc);
        }

        return nativeFunc;
    }

    static GetNativeVFunction(funcPtr: NativePointer, returnType: NativeFunctionReturnType, argTypes: NativeFunctionArgumentType[]): NativeFunction<any, any> {
        let funcAddress = funcPtr.toString();
        let vFunc = PatchHelper.#NativeFuncCache.get(funcAddress);
        if (vFunc === undefined) {
            vFunc = new NativeFunction(funcPtr, returnType, argTypes);
            PatchHelper.#NativeFuncCache.set(funcAddress, vFunc);
        }
        return vFunc;
    }

    static HookSTSFunction(origFuncInfo: NativeFunctionInfo, fakeFunc: (...args: any) => any): NativeFunction<any, any> {
        let origFunc = PatchHelper.GetNativeFunction(origFuncInfo)
        let fakeCallback = new NativeCallback(fakeFunc, origFuncInfo.retType, origFuncInfo.argTypes);
        Interceptor.replace(origFunc, fakeCallback);
        return origFunc;
    }

    static LogV(message: string) {
        let nowDate = new Date();
        let timeStr = nowDate.getHours() + "." + nowDate.getMinutes() + "." + nowDate.getSeconds() + "." + nowDate.getMilliseconds();
        PatchHelper.#STSLogger.write(timeStr + " : " + message + "\n");
        PatchHelper.#STSLogger.flush();
    }
}