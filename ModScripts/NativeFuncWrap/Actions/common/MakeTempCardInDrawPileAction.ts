import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const MakeTempCardInDrawPileAction = {
    Ctor(card: NativePointer, amount: number, randomSpot: boolean, autoPosition: boolean, toBottom: boolean, cardX: number, cardY: number): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.MakeTempCardInDrawPile.Ctor)(PatchHelper.nullptr, card, amount, Number(randomSpot),
            Number(autoPosition), Number(toBottom), cardX, cardY);
    },
    /**
     * just call `Ctor(card, amount, shuffleInto, autoPosition, false, Settings.WIDTH / 2.0f, Settings.HEIGHT / 2.0f);
     */
    Ctor2(card: NativePointer, amount: number, randomSpot: boolean, autoPosition: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.MakeTempCardInDrawPile.Ctor2)(PatchHelper.nullptr, card, amount, Number(randomSpot),
            Number(autoPosition));
    },
};