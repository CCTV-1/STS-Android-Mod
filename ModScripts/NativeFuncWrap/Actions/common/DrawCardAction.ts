import { PatchHelper } from "../../../PatchHelper.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const DrawCardAction = {
    Ctor(source: NativePointer, cardAmount: number, endTurnDraw: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.DrawCard.Ctor)(NULL, source, cardAmount, Number(endTurnDraw));
    },
    Ctor2(cardAmount: number): NativePointer {
        return DrawCardAction.Ctor(NULL, cardAmount, false);
    },
};