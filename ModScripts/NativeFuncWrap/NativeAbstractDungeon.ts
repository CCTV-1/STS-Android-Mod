import { PatchHelper } from "../PatchHelper.js";
import { CardRarity, CardType, PotionRarity, RelicTier } from "../enums.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";

const AbstractDungeonFuncInfo = {
    /**
     * ```c
     * bool AbstractDungeon::isPlayerInDungeon()
     * ```
     */
    isPlayerInDungeon: new NativeFunctionInfo(0x17B0229, 'bool', []),
    /**
     * ```c
     * MapRoomNode* AbstractDungeon::getCurrMapNode()
     * ```
     */
    getCurrMapNode: new NativeFunctionInfo(0x17B59C9, 'pointer', []),
    /**
     * ```c
     * AbstractRoom* AbstractDungeon::getCurrRoom()
     * ```
     */
    getCurrRoom: new NativeFunctionInfo(0x17B59A9, 'pointer', []),
    /**
     * ```c
     * AbstractRelic* AbstractDungeon::returnRandomRelic(RelicTier tier)
     * ```
     */
    returnRandomRelic: new NativeFunctionInfo(0x17B62F1, 'pointer', ['uint32']),
    /**
     * ```c
     * AbstractPotion* AbstractDungeon::returnRandomPotion(PotionRarity rarity, bool limited)
     * ```
     */
    returnRandomPotion: new NativeFunctionInfo(0x17B755D, 'pointer', ['uint32', 'bool']),
    /**
     * ```c
     * AbstractCard* AbstractDungeon::returnTrulyRandomCard()
     * ```
     */
    returnTrulyRandomCard: new NativeFunctionInfo(0x17B91B9, 'pointer', []),
    /**
     * ```c
     * AbstractCard* AbstractDungeon::returnTrulyRandomCardInCombat(CardType type)
     * ```
     */
    returnTrulyRandomCardInCombat: new NativeFunctionInfo(0x17B98AD, 'pointer', ['uint32']),
    /**
     * ```c
     * AbstractCard* AbstractDungeon::returnTrulyRandomColorlessCardInCombat()
     * ```
     */
    returnTrulyRandomColorlessCardInCombat: new NativeFunctionInfo(0x17B9DA9, 'pointer', []),
    /**
     * ```c
     * AbstractCard* AbstractDungeon::returnRandomCurse()
     * ```
     */
    returnRandomCurse: new NativeFunctionInfo(0x17BA951, 'pointer', []),
    /**
     * ```c
     * void AbstractDungeon::transformCard(AbstractCard* transformCardPtr)
     * ```
     */
    transformCard: new NativeFunctionInfo(0x17B7635, 'void', ['pointer']),
    /**
     * ```c
     * void AbstractDungeon::transformCard(AbstractCard* transformCardPtr, bool autoUpgrade)
     * ```
     */
    transformCard2: new NativeFunctionInfo(0x17B764D, 'void', ['pointer', 'bool']),
    /**
     * ```c
     * void AbstractDungeon::transformCard(AbstractCard* transformCardPtr, bool autoUpgrade, STS::Random* rngPtr)
     * ```
     */
    transformCard3: new NativeFunctionInfo(0x17B7669, 'void', ['pointer', 'bool', 'pointer']),
    /**
     * ```c
     * AbstractCard* AbstractDungeon::getCard(CardRarity rarity)
     * ```
     */
    getCard: new NativeFunctionInfo(0x17BEF19, 'pointer', ['uint32']),
    /**
     * ```c
     * AbstractCard* AbstractDungeon::getCard(CardRarity rarity, Random * rngPtr)
     * ```
     */
    getCard2: new NativeFunctionInfo(0x17BF03D, 'pointer', ['uint32', 'pointer'])
    
};

export const NativeAbstractDungeon = {
    isPlayerInDungeon(): boolean {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.isPlayerInDungeon)();
    },
    /** MapRoomNode* */
    getCurrMapNode(): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.getCurrMapNode)();
    },
    /** AbstractRoom* */
    getCurrRoom(): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.getCurrRoom)();
    },
    returnRandomRelic(tier: RelicTier): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.returnRandomRelic)(Number(tier));
    },
    returnRandomPotion(rarity: PotionRarity, limited: boolean): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.returnRandomPotion)(Number(rarity), Number(limited));
    },
    returnTrulyRandomCard(): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.returnTrulyRandomCard)();
    },
    returnTrulyRandomCardInCombat(type: CardType): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.returnTrulyRandomCardInCombat)(Number(type));
    },
    returnTrulyRandomColorlessCardInCombat(): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.returnTrulyRandomColorlessCardInCombat)();
    },
    returnRandomCurse(): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.returnRandomCurse)();
    },
    transformCard(targetCard: NativePointer) {
        PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.transformCard)(targetCard);
    },
    transformCard2(targetCard: NativePointer, autoUpgrade: boolean) {
        PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.transformCard2)(targetCard, Number(autoUpgrade));
    },
    transformCard3(targetCard: NativePointer, autoUpgrade: boolean, STSRngPtr: NativePointer) {
        PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.transformCard3)(targetCard, Number(autoUpgrade), STSRngPtr);
    },
    getCard(cardRarity: CardRarity): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.getCard)(Number(cardRarity));
    },
    /** Random * rngPtr */
    getCard2(cardRarity: CardRarity, rngPtr: NativePointer): NativePointer {
        return PatchHelper.GetNativeFunction(AbstractDungeonFuncInfo.getCard2)(Number(cardRarity), rngPtr);
    },
};