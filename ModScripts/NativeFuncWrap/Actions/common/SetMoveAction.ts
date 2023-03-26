import { MonsterIntent } from "../../../enums.js";
import { PatchHelper } from "../../../PatchHelper.js";
import { NativeSTSLib } from "../../NativeSTSLib.js";
import { NativeActionInfo } from "../NativeActionInfo.js";

export const SetMoveAction = {
    Ctor(monster: NativePointer, moveName: string, nextMove: boolean, intent: MonsterIntent, baseDamage: number, multiplierAmt: number, multiplier: boolean): NativePointer {
        let nativeMoveName = NativeSTSLib.JString.Ctor(moveName);
        return PatchHelper.GetNativeFunction(NativeActionInfo.common.SetMove.Ctor)(PatchHelper.nullptr, monster, nativeMoveName, Number(nextMove),
            Number(intent), baseDamage, multiplierAmt, Number(multiplier));
    },
};