import { NativeClassWrapper } from "./NativeClassWrapper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

export class AbstractCard extends NativeClassWrapper {
    //NativePointer AbstractCard *
    constructor(CthisPtr: NativePointer) {
        super(CthisPtr);
    }

    static #vfunctionMap = {
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
         *  STS::AbstractCard* AbstractCard::makeStatEquivalentCopy(STS::AbstractCard* this)
         * ```
         */
        makeStatEquivalentCopy: new NativeFunctionInfo(0x98, 'pointer', ['pointer']),
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
    }

    canUpgrade(): boolean {
        let canUpgradeFunc = this.getVirtualFunction(AbstractCard.#vfunctionMap.canUpgrade);
        return canUpgradeFunc(this.rawPtr);
    }

    upgrade(): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.upgrade)(this.rawPtr);
    }

    makeStatEquivalentCopy(): NativePointer {
        let makeStatEquivalentCopyFunc = this.getVirtualFunction(AbstractCard.#vfunctionMap.makeStatEquivalentCopy);
        return makeStatEquivalentCopyFunc(this.rawPtr);
    }

    addToBot(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.addToBot)(this.rawPtr, actionPtr);
    }

    addToTop(actionPtr: NativePointer): void {
        this.getVirtualFunction(AbstractCard.#vfunctionMap.addToTop)(this.rawPtr, actionPtr);
    }

    get type() {
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

    get damageType() {
        return this.readOffsetU32(0xa8);
    }
    set damageType(value) {
        this.writeOffsetU32(0xa8, value);
    }

    get damageTypeForTurn() {
        return this.readOffsetU32(0xac);
    }
    set damageTypeForTurn(value) {
        this.writeOffsetU32(0xac, value);
    }

    get target() {
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
        return this.readOffsetJString(0xc8);
    }
    set assetUrl(value) {
        this.writeOffsetJString(0xc8, value);
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
        return this.readOffsetJString(0x13c);
    }
    set originalName(value) {
        this.writeOffsetJString(0x13c, value);
    }

    get name() {
        return this.readOffsetJString(0x140);
    }
    set name(value) {
        this.writeOffsetJString(0x140, value);
    }

    get rawDescription() {
        return this.readOffsetJString(0x144);
    }
    set rawDescription(value) {
        this.writeOffsetJString(0x144, value);
    }

    get cardID() {
        return this.readOffsetJString(0x148);
    }
    set cardID(value) {
        this.writeOffsetJString(0x148, value);
    }
}