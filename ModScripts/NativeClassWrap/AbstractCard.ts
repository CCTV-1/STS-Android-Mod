import { CardColor, CardRarity, CardTarget, DamageType, CardType } from "../enums.js";
import { JString } from "./JString.js";
import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "../NativeFuncWrap/NativeFunctionInfo.js";
import { PatchManager } from "../PatchManager.js";

/**
 * thisPtr will is ```nullptr```.
 */
export type STSCardCtor = (thisPtr: NativePointer) => NativePointer;

interface NewCardVFuncType {
    use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => void,
    upgrade: (thisPtr: NativePointer) => void,
    makeCopy: (thisPtr: NativePointer) => NativePointer,
};

export class AbstractCard extends NativeClassWrapper {
    //NativePointer AbstractCard *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    /**
     * new card id => (v func name => v func)
     */
    static #rewriteVFuncMap = new Map<string, NewCardVFuncType>();

    static readonly #NewCardVFuncProxys: NewCardVFuncType = {
        use: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(wrapCard.cardID);
            if (cardVFuncMap !== undefined) {
                const useFunc = cardVFuncMap.use;
                if (useFunc !== undefined) {
                    useFunc(thisPtr, playerPtr, monsterPtr);
                }
            }
        },
        upgrade: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(wrapCard.cardID);
            if (cardVFuncMap !== undefined) {
                const upgradeFunc = cardVFuncMap.upgrade;
                if (upgradeFunc !== undefined) {
                    upgradeFunc(thisPtr);
                }
            }
        },
        makeCopy: (thisPtr: NativePointer) => {
            let wrapCard = new AbstractCard(thisPtr);
            let cardVFuncMap = AbstractCard.#rewriteVFuncMap.get(wrapCard.cardID);
            if (cardVFuncMap !== undefined) {
                const makeCopyFunc = cardVFuncMap.makeCopy;
                if (makeCopyFunc !== undefined) {
                    let copyObj = makeCopyFunc(thisPtr);
                    return copyObj;
                }
            }
            return PatchManager.nullptr;
        }
    }

    static readonly #vfunctionMap = {
        /**
         * ```c
         *  bool AbstractCard::canUpgrade(STS::AbstractCard* this)
         * ```
         */
        canUpgrade: new NativeFunctionInfo(0x50, 'bool', ['pointer']),
        /**
         * ```c
         *  void AbstractCard::upgrade(STS::AbstractCard* this)
         * ```
         */
        upgrade: new NativeFunctionInfo(0x58, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractCard::upgradeDamage(STS::AbstractCard* this, int32_t amount)
         * ```
         */
        upgradeDamage: new NativeFunctionInfo(0x68, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractCard::upgradeBlock(STS::AbstractCard* this, int32_t amount)
         * ```
         */
        upgradeBlock: new NativeFunctionInfo(0x70, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractCard::upgradeMagicNumber(STS::AbstractCard* this, int32_t amount)
         * ```
         */
        upgradeMagicNumber: new NativeFunctionInfo(0x78, 'void', ['pointer', 'int32']),
        /**
         * ```c
         * void AbstractCard::upgradeName(STS::AbstractCard* this)
         * ```
         */
        upgradeName: new NativeFunctionInfo(0x80, 'void', ['pointer']),
        /**
         * ```c
         * void AbstractCard::upgradeBaseCost(STS::AbstractCard* this, int32_t newCost)
         * ```
         */
        upgradeBaseCost: new NativeFunctionInfo(0x88, 'void', ['pointer', 'int32']),
        /**
         * ```c
         *  STS::AbstractCard* AbstractCard::makeStatEquivalentCopy(STS::AbstractCard* this)
         * ```
         */
        makeStatEquivalentCopy: new NativeFunctionInfo(0x98, 'pointer', ['pointer']),
        /**
         * ```c
         * void AbstractCard::use(STS::AbstractCard* this, STS::AbstractPlayer* p, STS::AbstractMonster* m)
         * ```
         */
        use: new NativeFunctionInfo(0xF0, 'pointer', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::addToTop(STS::AbstractCard* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToBot: new NativeFunctionInfo(0x2F8, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         *  void AbstractCard::addToTop(STS::AbstractCard* this, STS::AbstractGameAction* actionPtr)
         * ```
         */
        addToTop: new NativeFunctionInfo(0x300, 'void', ['pointer', 'pointer']),
        /**
         * ```c
         * STS::AbstractCard* AbstractCard::makeCopy(STS::AbstractCard* this)
         * ```
         */
        makeCopy: new NativeFunctionInfo(0x338, 'pointer', ['pointer']),
    }

    static #vFuncNamePrefix = "AbstractCard_";

    static NewCardCtor(id: string, name: string, imgUrl: string, cost: number, rawDescription: string,
        type: CardType, color: CardColor, rarity: CardRarity, target: CardTarget, dType: DamageType, newFuncs: NewCardVFuncType): AbstractCard {

        let origCardPtr = PatchManager.Cards.AbstractCard.Ctor(id, name, imgUrl, cost, rawDescription, type, color, rarity, target, dType);

        let wrapCard = new AbstractCard(origCardPtr);
        if (!AbstractCard.#rewriteVFuncMap.has(id)) {
            AbstractCard.#rewriteVFuncMap.set(id, newFuncs);
        }

        if (!AbstractCard.#rewriteVFuncMap.has("AbstractCardProxy")) {
            let funcName = "AbstractCard_BasicNewCard_use";
            wrapCard.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_PPP_Func(funcName), AbstractCard.#vfunctionMap.use, AbstractCard.#NewCardVFuncProxys.use);
            funcName = "AbstractCard_BasicNewCard_upgrade";
            wrapCard.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_P_Func(funcName), AbstractCard.#vfunctionMap.upgrade, AbstractCard.#NewCardVFuncProxys.upgrade);
            funcName = "AbstractCard_BasicNewCard_makeCopy";
            wrapCard.setVirtualFunction(funcName, PatchManager.fakeCodeGen.P_P_Func(funcName), AbstractCard.#vfunctionMap.makeCopy, AbstractCard.#NewCardVFuncProxys.makeCopy);
            AbstractCard.#rewriteVFuncMap.set("AbstractCardProxy", AbstractCard.#NewCardVFuncProxys);
        }

        return wrapCard;
    };

    canUpgrade(): boolean {
        let canUpgradeFunc = this.getVirtualFunction(AbstractCard.#vfunctionMap.canUpgrade);
        return canUpgradeFunc(this.rawPtr);
    }

    upgrade(): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgrade)(this.rawPtr);
    }
    Overrideupgrade(newVFunc: (thisPtr: NativePointer) => void) {
        let funcName = (AbstractCard.#vFuncNamePrefix + this.cardID + "_upgrade").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_P_Func(funcName), AbstractCard.#vfunctionMap.upgrade, newVFunc);
    }

    upgradeDamage(newDamage: number) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeDamage)(this.rawPtr, newDamage);
    }

    upgradeBlock(newBlock: number) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeBlock)(this.rawPtr, newBlock);
    }

    upgradeMagicNumber(newMagicNumber: number) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeMagicNumber)(this.rawPtr, newMagicNumber);
    }

    upgradeName() {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeName)(this.rawPtr);
    }

    upgradeBaseCost(newCost: number) {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgradeBaseCost)(this.rawPtr, newCost);
    }

    makeStatEquivalentCopy(): NativePointer {
        let makeStatEquivalentCopyFunc = this.getVirtualFunction(AbstractCard.#vfunctionMap.makeStatEquivalentCopy);
        return makeStatEquivalentCopyFunc(this.rawPtr);
    }
    OverridemakeStatEquivalentCopy(newVFunc: (thisPtr: NativePointer) => NativePointer) {
        let funcName = (AbstractCard.#vFuncNamePrefix + this.cardID + "_makeStatEquivalentCopy").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.P_P_Func(funcName), AbstractCard.#vfunctionMap.makeStatEquivalentCopy, newVFunc);
    }

    Overrideuse(newVFunc: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer) => void) {
        let funcName = (AbstractCard.#vFuncNamePrefix + this.cardID + "_use").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.V_PPP_Func(funcName), AbstractCard.#vfunctionMap.use, newVFunc);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    OverridemakeCopy(newVFunc: (thisPtr: NativePointer) => NativePointer) {
        let funcName = (AbstractCard.#vFuncNamePrefix + this.cardID + "_makeCopy").replace(/\s+/g, "");
        this.setVirtualFunction(funcName, PatchManager.fakeCodeGen.P_P_Func(funcName), AbstractCard.#vfunctionMap.makeCopy, newVFunc);
    }

    get type(): CardType {
        return this.readOffsetU32(0x8);
    }
    set type(value) {
        this.writeOffsetU32(0x8, value);
    }

    get cost() {
        return this.readOffsetS32(0xc);
    }
    set cost(value) {
        this.writeOffsetS32(0xc, value);
    }

    get costForTurn() {
        return this.readOffsetS32(0x10);
    }
    set costForTurn(value) {
        this.writeOffsetS32(0x10, value);
    }

    get price() {
        return this.readOffsetS32(0x14);
    }
    set price(value) {
        this.writeOffsetS32(0x14, value);
    }

    get chargeCost() {
        return this.readOffsetS32(0x18);
    }
    set chargeCost(value) {
        this.writeOffsetS32(0x18, value);
    }

    get isCostModified() {
        return this.readOffsetBool(0x1c);
    }
    set isCostModified(value) {
        this.writeOffsetBool(0x1c, value);
    }

    get isCostModifiedForTurn() {
        return this.readOffsetBool(0x1d);
    }
    set isCostModifiedForTurn(value) {
        this.writeOffsetBool(0x1d, value);
    }

    get retain() {
        return this.readOffsetBool(0x1e);
    }
    set retain(value) {
        this.writeOffsetBool(0x1e, value);
    }

    get selfRetain() {
        return this.readOffsetBool(0x1f);
    }
    set selfRetain(value) {
        this.writeOffsetBool(0x1f, value);
    }

    get dontTriggerOnUseCard() {
        return this.readOffsetBool(0x20);
    }
    set dontTriggerOnUseCard(value) {
        this.writeOffsetBool(0x20, value);
    }

    get rarity() {
        return this.readOffsetU32(0x24);
    }
    set rarity(value) {
        this.writeOffsetU32(0x24, value);
    }

    get color() {
        return this.readOffsetU32(0x28);
    }
    set color(value) {
        this.writeOffsetU32(0x28, value);
    }

    get isInnate() {
        return this.readOffsetBool(0x2c);
    }
    set isInnate(value) {
        this.writeOffsetBool(0x2c, value);
    }

    get isLocked() {
        return this.readOffsetBool(0x2d);
    }
    set isLocked(value) {
        this.writeOffsetBool(0x2d, value);
    }

    get showEvokeValue() {
        return this.readOffsetBool(0x2e);
    }
    set showEvokeValue(value) {
        this.writeOffsetBool(0x2e, value);
    }

    get showEvokeOrbCount() {
        return this.readOffsetS32(0x30);
    }
    set showEvokeOrbCount(value) {
        this.writeOffsetS32(0x30, value);
    }

    get isUsed() {
        return this.readOffsetBool(0x38);
    }
    set isUsed(value) {
        this.writeOffsetBool(0x38, value);
    }

    get upgraded() {
        return this.readOffsetBool(0x39);
    }
    set upgraded(value) {
        this.writeOffsetBool(0x39, value);
    }

    get timesUpgraded() {
        return this.readOffsetS32(0x3c);
    }
    set timesUpgraded(value) {
        this.writeOffsetS32(0x3c, value);
    }

    get misc() {
        return this.readOffsetS32(0x40);
    }
    set misc(value) {
        this.writeOffsetS32(0x40, value);
    }

    get energyOnUse() {
        return this.readOffsetS32(0x44);
    }
    set energyOnUse(value) {
        this.writeOffsetS32(0x44, value);
    }

    get ignoreEnergyOnUse() {
        return this.readOffsetBool(0x48);
    }
    set ignoreEnergyOnUse(value) {
        this.writeOffsetBool(0x48, value);
    }

    get isSeen() {
        return this.readOffsetBool(0x49);
    }
    set isSeen(value) {
        this.writeOffsetBool(0x49, value);
    }

    get upgradedCost() {
        return this.readOffsetBool(0x4a);
    }
    set upgradedCost(value) {
        this.writeOffsetBool(0x4a, value);
    }

    get upgradedDamage() {
        return this.readOffsetBool(0x4b);
    }
    set upgradedDamage(value) {
        this.writeOffsetBool(0x4b, value);
    }

    get upgradedBlock() {
        return this.readOffsetBool(0x4c);
    }
    set upgradedBlock(value) {
        this.writeOffsetBool(0x4c, value);
    }

    get upgradedMagicNumber() {
        return this.readOffsetBool(0x4d);
    }
    set upgradedMagicNumber(value) {
        this.writeOffsetBool(0x4d, value);
    }

    get isSelected() {
        return this.readOffsetBool(0x60);
    }
    set isSelected(value) {
        this.writeOffsetBool(0x60, value);
    }

    get exhaust() {
        return this.readOffsetBool(0x61);
    }
    set exhaust(value) {
        this.writeOffsetBool(0x61, value);
    }

    get returnToHand() {
        return this.readOffsetBool(0x62);
    }
    set returnToHand(value) {
        this.writeOffsetBool(0x62, value);
    }

    get shuffleBackIntoDrawPile() {
        return this.readOffsetBool(0x63);
    }
    set shuffleBackIntoDrawPile(value) {
        this.writeOffsetBool(0x63, value);
    }

    get isEthereal() {
        return this.readOffsetBool(0x64);
    }
    set isEthereal(value) {
        this.writeOffsetBool(0x64, value);
    }

    get baseDamage() {
        return this.readOffsetU32(0x74);
    }
    set baseDamage(value) {
        this.writeOffsetS32(0x74, value);
    }

    get baseBlock() {
        return this.readOffsetS32(0x78);
    }
    set baseBlock(value) {
        this.writeOffsetS32(0x78, value);
    }

    get baseMagicNumber() {
        return this.readOffsetS32(0x7c);
    }
    set baseMagicNumber(value) {
        this.writeOffsetS32(0x7c, value);
    }

    get baseHeal() {
        return this.readOffsetS32(0x80);
    }
    set baseHeal(value) {
        this.writeOffsetS32(0x80, value);
    }

    get baseDraw() {
        return this.readOffsetS32(0x84);
    }
    set baseDraw(value) {
        this.writeOffsetS32(0x84, value);
    }

    get baseDiscard() {
        return this.readOffsetS32(0x88);
    }
    set baseDiscard(value) {
        this.writeOffsetS32(0x88, value);
    }

    get damage() {
        return this.readOffsetS32(0x8c);
    }
    set damage(value) {
        this.writeOffsetS32(0x8c, value);
    }

    get block() {
        return this.readOffsetS32(0x90);
    }
    set block(value) {
        this.writeOffsetS32(0x90, value);
    }

    get magicNumber() {
        return this.readOffsetS32(0x94);
    }
    set magicNumber(value) {
        this.writeOffsetS32(0x94, value);
    }

    get heal() {
        return this.readOffsetS32(0x98);
    }
    set heal(value) {
        this.writeOffsetS32(0x98, value);
    }

    get draw() {
        return this.readOffsetS32(0x9c);
    }
    set draw(value) {
        this.writeOffsetS32(0x9c, value);
    }

    get discard() {
        return this.readOffsetS32(0xa0);
    }
    set discard(value) {
        this.writeOffsetS32(0xa0, value);
    }

    get isDamageModified() {
        return this.readOffsetBool(0xa4);
    }
    set isDamageModified(value) {
        this.writeOffsetBool(0xa4, value);
    }

    get isBlockModified() {
        return this.readOffsetBool(0xa5);
    }
    set isBlockModified(value) {
        this.writeOffsetBool(0xa5, value);
    }

    get isMagicNumberModified() {
        return this.readOffsetBool(0xa6);
    }
    set isMagicNumberModified(value) {
        this.writeOffsetBool(0xa6, value);
    }

    get damageType(): DamageType {
        return this.readOffsetU32(0xa8);
    }
    set damageType(value) {
        this.writeOffsetU32(0xa8, value);
    }

    get damageTypeForTurn(): DamageType {
        return this.readOffsetU32(0xac);
    }
    set damageTypeForTurn(value) {
        this.writeOffsetU32(0xac, value);
    }

    get target(): CardTarget {
        return this.readOffsetU32(0xb0);
    }
    set target(value) {
        this.writeOffsetU32(0xb0, value);
    }

    get purgeOnUse() {
        return this.readOffsetBool(0xb4);
    }
    set purgeOnUse(value) {
        this.writeOffsetBool(0xb4, value);
    }

    get exhaustOnUseOnce() {
        return this.readOffsetBool(0xb5);
    }
    set exhaustOnUseOnce(value) {
        this.writeOffsetBool(0xb5, value);
    }

    get exhaustOnFire() {
        return this.readOffsetBool(0xb6);
    }
    set exhaustOnFire(value) {
        this.writeOffsetBool(0xb6, value);
    }

    get freeToPlayOnce() {
        return this.readOffsetBool(0xb7);
    }
    set freeToPlayOnce(value) {
        this.writeOffsetBool(0xb7, value);
    }

    get isInAutoplay() {
        return this.readOffsetBool(0xb8);
    }
    set isInAutoplay(value) {
        this.writeOffsetBool(0xb8, value);
    }

    get assetUrl() {
        return this.readOffsetJString(0xc8).content;
    }
    set assetUrl(value) {
        this.writeOffsetJString(0xc8, JString.CreateJString(value));
    }

    get transparency() {
        return this.readOffsetFloat(0xd0);
    }
    set transparency(value) {
        this.writeOffsetFloat(0xd0, value);
    }

    get targetTransparency() {
        return this.readOffsetFloat(0xd4);
    }
    set targetTransparency(value) {
        this.writeOffsetFloat(0xd4, value);
    }

    get targetAngle() {
        return this.readOffsetFloat(0xd8);
    }
    set targetAngle(value) {
        this.writeOffsetFloat(0xd8, value);
    }

    get angle() {
        return this.readOffsetFloat(0xdc);
    }
    set angle(value) {
        this.writeOffsetFloat(0xdc, value);
    }

    get glowTimer() {
        return this.readOffsetFloat(0xf4);
    }
    set glowTimer(value) {
        this.writeOffsetFloat(0xf4, value);
    }

    get drawScale() {
        return this.readOffsetFloat(0x114);
    }
    set drawScale(value) {
        this.writeOffsetFloat(0x114, value);
    }

    get targetDrawScale() {
        return this.readOffsetFloat(0x118);
    }
    set targetDrawScale(value) {
        this.writeOffsetFloat(0x118, value);
    }

    get cardsToPreview() {
        return this.readOffsetPointer(0x134);
    }
    set cardsToPreview(value) {
        this.writeOffsetPointer(0x134, value);
    }

    get originalName() {
        return this.readOffsetJString(0x13c).content;
    }
    set originalName(value) {
        this.writeOffsetJString(0x13c, JString.CreateJString(value));
    }

    get name() {
        return this.readOffsetJString(0x140).content;
    }
    set name(value) {
        this.writeOffsetJString(0x140, JString.CreateJString(value));
    }

    get rawDescription() {
        return this.readOffsetJString(0x144).content;
    }
    set rawDescription(value) {
        this.writeOffsetJString(0x144, JString.CreateJString(value));
    }

    get cardID() {
        return this.readOffsetJString(0x148).content;
    }
    set cardID(value) {
        this.writeOffsetJString(0x148, JString.CreateJString(value));
    }
}