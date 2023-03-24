import { NativeFunctionInfo, NativeFunctionInfoMap } from "./NativeFuncWrap/NativeFunctionInfo.js"
import { AbstractPlayer } from "./NativeClassWrap/AbstractPlayer.js";
import { AttackEffect, CardColor, CardRarity, CardTarget, CardType, DamageType, LandingSound, RelicTier } from "./enums.js";
import { STSCardCtor } from "./NativeClassWrap/AbstractCard.js";
import { NativeSTSLib } from "./NativeFuncWrap/NativeSTSLib.js";

export class PatchManager {
    static readonly nullptr = new NativePointer(0);
    static readonly STSModuleBaseAddress = Module.findBaseAddress("libSpire_ANDROID.so") || PatchManager.nullptr;

    static readonly #STSLogger = new File("/sdcard/Android/data/com.humble.SlayTheSpire/files/ModScripts/ModLog.txt", "w+");
    static readonly RewriteVFuncMap = new Map<string, NativePointer>();
    static readonly #NativeFuncCache = new Map<string, NativeFunction<any, any>>();
    static readonly #GlobalVarCache = new Map<number, NativePointer>();

    static readonly Relics = {
        AbstractRelic: {
            Ctor(relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound): NativePointer {
                let nativeRelicId = NativeSTSLib.JString.Ctor(relicId);
                let nativeImgUrl = NativeSTSLib.JString.Ctor(imgName);
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.AbstractRelic.Ctor)(PatchManager.nullptr, nativeRelicId, nativeImgUrl, Number(tier), Number(sfx));
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer, relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer):
                (relicId: string, imgName: string, tier: RelicTier, sfx: LandingSound) => NativePointer {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.AbstractRelic.Ctor, newCtor);
            },
        },
        BurningBlood: {
            OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.BurningBlood.onVictory, newCallback);
            }
        },
        BlackBlood: {
            OverrideonVictory(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.BlackBlood.onVictory, newCallback);
            }
        },
        Ginger: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.Ginger.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.Ginger.Ctor, newCtor);
            }
        },
        SacredBark: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.SacredBark.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.SacredBark.Ctor, newCtor);
            },
        },
        CoffeeDripper: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.CoffeeDripper.Ctor, newCtor);
            },
        },
        MarkofPain: {
            OverrideatBattleStart(newCallback: (thisPtr: NativePointer) => void): (thisPtr: NativePointer) => void {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.MarkofPain.atBattleStart, newCallback);
            },
        },
        RunicPyramid: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Relics.RunicPyramid.Ctor)(PatchManager.nullptr);
            },
            OverrideCtor(newCtor: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Relics.RunicPyramid.Ctor, newCtor);
            },
        },
    };
    static readonly Potions = {
        PotionSlot: {
            Ctor(index: number): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Potions.PotionSlot.Ctor)(PatchManager.nullptr, index);
            }
        }
    };
    static readonly VFX = {
        ShowCardBrieflyEffect: {
            Ctor(cardPtr: NativePointer): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.VFX.ShowCardBrieflyEffect.Ctor)(PatchManager.nullptr, cardPtr);
            }
        },
        UpgradeShineEffect: {
            Ctor(x: number, y: number): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.VFX.UpgradeShineEffect.Ctor)(PatchManager.nullptr, x, y);
            }
        }
    };

    static readonly InstructionPtr = {
        /**
         * AbstractDungeon::getRewardCards
         * 
         * origin Instruction: ```0x17BE846 05 25 MOVS R5, #3```
         */
        get rewardCardNumber() {
            return PatchManager.#GetOffsetPtr(0x17BE846);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD89E 05 28 CMP R0, #5```
         */
        get VelvetChokerPlayCounter() {
            return PatchManager.#GetOffsetPtr(0x19AD89E);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD8E2 06 28 CMP R0, #6```
         */
        get VelvetChokerCanPlayCheck() {
            return PatchManager.#GetOffsetPtr(0x19AD8E2);
        },
        /**
         *  VelvetChoker::onPlayCard
         * 
         * origin Instruction: ```019AD904 06 21 MOVS R1, #6```
         */
        get VelvetChokerCanPlayStateValue() {
            return PatchManager.#GetOffsetPtr(0x19AD904);
        }
    };

    static readonly STSGlobalVars = {
        get STSSetting_WIDTH() {
            return PatchManager.#GetOffsetPtr(0x34987C0).readS32();
        },
        get STSSetting_HEIGHT() {
            return PatchManager.#GetOffsetPtr(0x34987C4).readS32();
        },
        get AbstractDungeon_player() {
            return new AbstractPlayer(PatchManager.#GetOffsetPtr(0x3498EDC).readPointer());
        },
        get AbstractDungeon_topLevelEffects() {
            return PatchManager.#GetOffsetPtr(0x3498F84).readPointer();
        },
    };

    static readonly fakeCodeGen = {
        V_PPP_Func(funcName: string) {
            return "void " + funcName + "(void * arg1, void* arg2, void* arg3) { return ; }";
        },
        V_P_Func(funcName: string) {
            return "void " + funcName + "(void * arg1) { return ; }";
        },
        P_P_Func(funcName: string) {
            return "void* " + funcName + "(void * arg1) { return (void *)0; }";
        },
        /**if int != int32_t, this func not work. */
        I32_PI32_Func(funcName: string) {
            return "int " + funcName + "(void * arg1, int arg2) { return 0; }";
        }
    };

    static #GetOffsetPtr(offset: number): NativePointer {
        if (!PatchManager.#GlobalVarCache.has(offset)) {
            PatchManager.#GlobalVarCache.set(offset, PatchManager.STSModuleBaseAddress.add(offset));
        }
        return PatchManager.#GlobalVarCache.get(offset) || PatchManager.nullptr;
    }

    static GetNativeFunction(origFuncInfo: NativeFunctionInfo): NativeFunction<any, any> {
        let funcAddressPtr = PatchManager.STSModuleBaseAddress.add(origFuncInfo.funcOffset);
        let funcAddress = funcAddressPtr.toString();
        let nativeFunc = PatchManager.#NativeFuncCache.get(funcAddress);
        if (nativeFunc === undefined) {
            nativeFunc = new NativeFunction(funcAddressPtr, origFuncInfo.retType, origFuncInfo.argTypes);
            PatchManager.#NativeFuncCache.set(funcAddress, nativeFunc);
        }

        return nativeFunc;
    }

    static GetNativeVFunction(funcPtr: NativePointer, returnType: NativeFunctionReturnType, argTypes: NativeFunctionArgumentType[]): NativeFunction<any, any> {
        let funcAddress = funcPtr.toString();
        let vFunc = PatchManager.#NativeFuncCache.get(funcAddress);
        if (vFunc === undefined) {
            vFunc = new NativeFunction(funcPtr, returnType, argTypes);
            PatchManager.#NativeFuncCache.set(funcAddress, vFunc);
        }
        return vFunc;
    }

    static HookSTSFunction(origFuncInfo: NativeFunctionInfo, fakeFunc: (...args: any) => any): NativeFunction<any, any> {
        let origFunc = PatchManager.GetNativeFunction(origFuncInfo)
        let fakeCallback = new NativeCallback(fakeFunc, origFuncInfo.retType, origFuncInfo.argTypes);
        Interceptor.replace(origFunc, fakeCallback);
        return origFunc;
    }

    static LogV(message: string) {
        let nowDate = new Date();
        let timeStr = nowDate.getHours() + "." + nowDate.getMinutes() + "." + nowDate.getSeconds() + "." + nowDate.getMilliseconds();
        PatchManager.#STSLogger.write(timeStr + " : " + message + "\n");
        PatchManager.#STSLogger.flush();
    }
}