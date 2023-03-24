import { CardColor, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { PatchManager } from "../PatchManager.js";
import { NativeFunctionInfoMap } from "./NativeFunctionInfo.js";
import { NativeSTSLib } from "./NativeSTSLib.js";

export const NativeCards = {
    AbstractCard: {
        Ctor(id: string, name: string, imgUrl: string, cost: number, rawDescription: string,
            type: CardType, color: CardColor, rarity: CardRarity, target: CardTarget, dType: DamageType): NativePointer {
            let nativeId = NativeSTSLib.JString.Ctor(id);
            let nativeName = NativeSTSLib.JString.Ctor(name);
            let nativeimgUrl = NativeSTSLib.JString.Ctor(imgUrl);
            let nativerawDescription = NativeSTSLib.JString.Ctor(rawDescription);
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.AbstractCard.Ctor)(PatchManager.nullptr, nativeId, nativeName,
                nativeimgUrl, cost, nativerawDescription, Number(type), Number(color), Number(rarity), Number(target), Number(dType));
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer,
            type: Number, color: Number, rarity: Number, target: Number, dType: Number) => NativePointer):
            (thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer,
                type: Number, color: Number, rarity: Number, target: Number, dType: Number) => NativePointer {
            return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.AbstractCard.Ctor, newCtor);
        },
    },
    DamageInfo: {
        Ctor(damageSource: NativePointer, dmgValue: number, dmgTYpe: DamageType): NativePointer {
            return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.DamageInfo.Ctor)(PatchManager.nullptr, damageSource, dmgValue, Number(dmgTYpe));
        }
    },
    Red: {
        Bash: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.Bash.Ctor)(PatchManager.nullptr);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.Bash.Ctor, newCtor);
            },
        },
        Clothesline: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.Clothesline.Ctor)(PatchManager.nullptr);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.Clothesline.Ctor, newCtor);
            },
        },
        DefendRed: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.DefendRed.Ctor)(PatchManager.nullptr);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.DefendRed.Ctor, newCtor);
            },
        },
        Feed: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.Feed.Ctor)(PatchManager.nullptr);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.Feed.Ctor, newCtor);
            },
        },
        HeavyBlade: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.HeavyBlade.Ctor)(PatchManager.nullptr);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.HeavyBlade.Ctor, newCtor);
            },
        },
        PerfectedStrike: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.PerfectedStrike.Ctor)(PatchManager.nullptr);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.PerfectedStrike.Ctor, newCtor);
            },
        },
        SearingBlow: {
            Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.SearingBlow.Use)(thisPtr, caster, target);
            },
            /** return origin Use */
            OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.SearingBlow.Use, newUse);
            }
        },
        StrikeRed: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.StrikeRed.Ctor)(PatchManager.nullptr);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.StrikeRed.Ctor, newCtor);
            },
        },
        DemonForm: {
            Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.DemonForm.Use)(thisPtr, caster, target);
            },
            /** return origin Use */
            OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.DemonForm.Use, newUse);
            }
        },
        Thunderclap: {
            Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Red.Thunderclap.Use)(thisPtr, caster, target);
            },
            /** return origin Use */
            OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Red.Thunderclap.Use, newUse);
            }
        }
    },
    Purple: {
        Alpha: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Purple.Alpha.Ctor)(PatchManager.nullptr);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchManager.HookSTSFunction(NativeFunctionInfoMap.Cards.Purple.Alpha.Ctor, newCtor);
            }
        }
    },
    Temp: {
        Omega: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.Temp.Omega.Ctor)(PatchManager.nullptr);
            },
        }
    },
    status: {
        Burn: {
            Ctor(): NativePointer {
                return PatchManager.GetNativeFunction(NativeFunctionInfoMap.Cards.status.Burn.Ctor)(PatchManager.nullptr);
            }
        },
    },
};