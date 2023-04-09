import { EnemyType } from "../enums.js";
import { AbstractCreature } from "./AbstractCreature.js";

export interface NewMonsterVFuncType {
    takeTurn: (thisPtr: NativePointer) => void,
    getMove: (thisPtr: NativePointer, index: number) => void,
};

export class AbstractMonster extends AbstractCreature {
    //NativePointer AbstractMonster *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr)
    }

    static readonly #vfunctionMap = {

    };

    get deathTimer() {
        return this.readOffsetFloat(0x104);
    }

    get nameColor() {
        return this.readOffsetPointer(0x108);
    }

    /** GDX::Texture* */
    get img() {
        return this.readOffsetPointer(0x110);
    }

    get escaped() {
        return this.readOffsetBool(0x11C);
    }

    get escapeNext() {
        return this.readOffsetBool(0x11D);
    }

    /** PowerTip* */
    get intentTip() {
        return this.readOffsetPointer(0x120);
    }

    get type(): EnemyType {
        return this.readOffsetU32(0x124);
    }

    get cannotEscape() {
        return this.readOffsetBool(0x12C);
    }

    get nextMove() {
        return this.readOffsetU8(0x148);
    }

    /** GDX::Texture* */
    get intentImg() {
        return this.readOffsetPointer(0x168);
    }

    /** GDX::Texture* */
    get intentBg() {
        return this.readOffsetPointer(0x16C);
    }

    get intentDmg() {
        return this.readOffsetS32(0x170);
    }

    get intentBaseDmg() {
        return this.readOffsetS32(0x174);
    }

    get intentMultiAmt() {
        return this.readOffsetS32(0x178);
    }

    get isMultiDmg() {
        return this.readOffsetBool(0x17C);
    }
}