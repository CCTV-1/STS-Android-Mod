import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DiscardPileToTopOfDeckAction = {
    Ctor(sourceCreature: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.unique.DiscardPileToTopOfDeck.Ctor)(NULL, sourceCreature);
    },
};