import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTDLib } from "./NativeSTDLib.js";

const Monsters = {
    Abstract: {
        /**
         * ```
         * AbstractMonster* AbstractMonster::Ctor(AbstractMonster* this, JString* name, JString* id, int32_t maxHealth, float hb_x, float hb_y, float hb_w, float hb_h, JString* imgUrl, float offsetX, float offsetY, bool ignoreBlights)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x18BFEC5, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'float', 'float', 'float', 'float', 'pointer',
            'float', 'float', 'bool']),
    },
}

export const NativeMonsters = {
    Abstract: {
        Ctor(name: string, id: string, maxHealth: number, hb_x: number, hb_y: number, hb_w: number, hb_h: number, imgUrl: string,
            offsetX: number, offsetY: number, ignoreBlights: boolean): NativePointer {
            const nativeName = NativeSTDLib.JString.Ctor(name);
            const nativeid = NativeSTDLib.JString.Ctor(id);
            const nativeimgUrl = NativeSTDLib.JString.Ctor(imgUrl);
            return PatchHelper.GetNativeFunction(Monsters.Abstract.Ctor)(NULL, nativeName, nativeid, maxHealth, hb_x, hb_y, hb_w, hb_h, nativeimgUrl,
                offsetX, offsetY, Number(ignoreBlights));
        }
    },
};