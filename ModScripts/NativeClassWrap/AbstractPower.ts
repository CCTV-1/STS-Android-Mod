import { PowerType } from "../enums.js";
import { ArrayList } from "./ArrayList.js";
import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";

export interface NewPowerVFuncType {
    updateParticles?: (thisPtr: NativePointer) => void,
    updateDescription?: (thisPtr: NativePointer) => void,
    atStartOfTurn?: (thisPtr: NativePointer) => void,
    duringTurn?: (thisPtr: NativePointer) => void,
    atStartOfTurnPostDraw?: (thisPtr: NativePointer) => void,
    atEndOfTurn?: (thisPtr: NativePointer, isPlayer: boolean) => void,
    atEndOfTurnPreEndTurnCards?: (thisPtr: NativePointer, isPlayer: boolean) => void,
    atEndOfRound?: (thisPtr: NativePointer) => void,
    onScry?: (thisPtr: NativePointer) => void,
    /**
     * damageArray type is JObjectArray\<int32_t\>
     */
    onDamageAllEnemies?: (thisPtr: NativePointer, damageArray: NativePointer) => void,
    onHeal?: (thisPtr: NativePointer, healAmount: number) => number,
    onAttacked?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onAttack?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number, targetCreature: NativePointer) => void,
    onAttackedToChangeDamage?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onAttackToChangeDamage?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => number,
    onInflictDamage?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number, targetCreature: NativePointer) => void,
    onEvokeOrb?: (thisPtr: NativePointer, orbPtr: NativePointer) => void,
    onCardDraw?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onPlayCard?: (thisPtr: NativePointer, cardPtr: NativePointer, monsterPtr: NativePointer) => void,
    onUseCard?: (thisPtr: NativePointer, cardPtr: NativePointer, useCardActionPtr: NativePointer) => void,
    onAfterUseCard?: (thisPtr: NativePointer, cardPtr: NativePointer, useCardActionPtr: NativePointer) => void,
    wasHPLost?: (thisPtr: NativePointer, dmgInfo: NativePointer, damageAmount: number) => void,
    onSpecificTrigger?: (thisPtr: NativePointer) => void,
    triggerMarks?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onDeath?: (thisPtr: NativePointer) => void,
    onChannel?: (thisPtr: NativePointer, orbPtr: NativePointer) => void,
    atEnergyGain?: (thisPtr: NativePointer) => void,
    onExhaust?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onChangeStance?: (thisPtr: NativePointer, oldStance: NativePointer, newStance: NativePointer) => void,
    modifyBlock?: (thisPtr: NativePointer, blockAmount: number) => number,
    modifyBlock2?: (thisPtr: NativePointer, blockAmount: number, cardPtr: NativePointer) => number,
    modifyBlockLast?: (thisPtr: NativePointer, blockAmount: number) => number,
    onGainedBlock?: (thisPtr: NativePointer, blockAmount: number) => void,
    /**`int (*func)(float)` `int (*func)(int)` */
    onPlayerGainedBlock?: (thisPtr: NativePointer, blockAmount: number) => number,
    onGainCharge?: (thisPtr: NativePointer, chargeAmount: number) => void,
    onRemove?: (thisPtr: NativePointer) => void,
    onEnergyRecharge?: (thisPtr: NativePointer) => void,
    onDrawOrDiscard?: (thisPtr: NativePointer) => void,
    onAfterCardPlayed?: (thisPtr: NativePointer, cardPtr: NativePointer) => void,
    onInitialApplication?: (thisPtr: NativePointer) => void,
    onApplyPower?: (thisPtr: NativePointer, powerPtr: NativePointer, targetCreature: NativePointer, sourceCreature: NativePointer) => void,
    onLoseHp?: (thisPtr: NativePointer, damageAmount: number) => number,
    onVictory?: (thisPtr: NativePointer) => void,
    canPlayCard?: (thisPtr: NativePointer, cardPtr: NativePointer) => boolean,
};

export class AbstractPower extends NativeClassWrapper {
    //NativePointer AbstractPower *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new Power id => (v func name => v func)
     */
    static #rewriteVFuncMap = new Map<string, NewPowerVFuncType>();
    static readonly #NewRelicVFuncProxys: NewPowerVFuncType = {
    };

    static readonly #vfunctionMap = {
    };

    static readonly #vFuncNamePrefix = "AbstractPower_";

    get region48() {
        return this.readOffsetPointer(0x8);
    }

    get region128() {
        return this.readOffsetPointer(0xC);
    }

    get fontScale() {
        return this.readOffsetFloat(0x10);
    }
    set fontScale(value) {
        this.writeOffsetFloat(0x10, value);
    }

    get color() {
        return this.readOffsetPointer(0x14);
    }

    get redColor() {
        return this.readOffsetPointer(0x18);
    }

    get greenColor() {
        return this.readOffsetPointer(0x1C);
    }

    /**
     * effect type is ArrayList\<AbstractGameEffect\>
     */
    get effect() {
        return new ArrayList(this.readOffsetPointer(0x20));
    }

    /**
     * ```c
     * STS::AbstractCreature* owner
     * ```
     */
    get owner() {
        return this.readOffsetPointer(0x24);
    }

    get name() {
        return this.readOffsetJString(0x28).content;
    }
    set name(value) {
        this.writeOffsetJString(0x28, JString.CreateJString(value));
    }

    get description() {
        return this.readOffsetJString(0x2C).content;
    }
    set description(value) {
        this.writeOffsetJString(0x2C, JString.CreateJString(value));
    }

    get ID() {
        return this.readOffsetJString(0x30).content;
    }
    set ID(value) {
        this.writeOffsetJString(0x30, JString.CreateJString(value));
    }

    get img() {
        return this.readOffsetPointer(0x34);
    }
    set img(value) {
        this.writeOffsetPointer(0x34, value);
    }

    get amount() {
        return this.readOffsetS32(0x38);
    }
    set amount(value) {
        this.writeOffsetS32(0x38, value);
    }

    get priority() {
        return this.readOffsetS32(0x3C);
    }
    set priority(value) {
        this.writeOffsetS32(0x3C, value);
    }

    get type(): PowerType {
        return this.readOffsetU32(0x40);
    }
    set type(value) {
        this.writeOffsetU32(0x40, value);
    }

    get isTurnBased() {
        return this.readOffsetBool(0x44);
    }
    set isTurnBased(value) {
        this.writeOffsetBool(0x44, value);
    }

    get isPostActionPower() {
        return this.readOffsetBool(0x45);
    }
    set isPostActionPower(value) {
        this.writeOffsetBool(0x45, value);
    }

    get canGoNegative() {
        return this.readOffsetBool(0x46);
    }
    set canGoNegative(value) {
        this.writeOffsetBool(0x46, value);
    }
}