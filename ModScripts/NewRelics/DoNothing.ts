import { AbstractRelic } from "../NativeClassWrap/AbstractRelic.js";
import { LandingSound, RelicTier } from "../enums.js";
import { PatchManager } from "../PatchManager.js";

export const DoNothing = (thisPtr: NativePointer): NativePointer => {
    const vfuncs = {
        getUpdatedDescription: (thisPtr: NativePointer) => {
            return PatchManager.STSLib.JString.Ctor("什么都不做");
        },
        makeCopy: (thisPtr: NativePointer) => {
            let copyObj = DoNothing(thisPtr);
            return copyObj;
        },
    };
    
    let relicObj = AbstractRelic.NewRelicCtor("DoNothing", "什么都不做", "确实什么都不做", "废物遗物一个", "burningBlood.png", RelicTier.STARTER, LandingSound.MAGICAL, vfuncs);

    return relicObj;
};