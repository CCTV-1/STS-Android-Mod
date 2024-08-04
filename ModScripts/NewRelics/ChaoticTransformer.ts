
import { AbstractDungeon } from "../NativeClassWrap/AbstractDungeon.js";
import { AbstractRelic, NewRelicVFuncType } from "../NativeClassWrap/AbstractRelic.js";
import { Random } from "../NativeClassWrap/Random.js";
import { LandingSound, PlayerClass, RelicTier } from "../enums.js";

const vfuncs: NewRelicVFuncType = {
    onEquip(thisPtr) {
        const wrapRelic = new AbstractRelic(thisPtr);
        wrapRelic.flash();
        let gameInstance = AbstractDungeon.getInstance();
        let currentPlayer = gameInstance.player;
        let randGen = new Random(gameInstance.miscRng);
        currentPlayer.chosenClass = randGen.randomI32_2(PlayerClass.IRONCLAD, PlayerClass.WATCHER)
    },
    makeCopy: (thisPtr: NativePointer) => {
        let copyObj = ChaoticTransformer(thisPtr);
        return copyObj;
    },
};

export const ChaoticTransformer = (thisPtr: NativePointer): NativePointer => {
    let relicObj = AbstractRelic.NewRelicCtor("ChaoticTransformer", "混沌转换器", "拾取时，你随便变为新的角色(也可能不变)。", "拥有无限不可能的道具(拾取后保存游戏将闪退一次)。", "ChaoticTransformer.png", RelicTier.BOSS, LandingSound.HEAVY, vfuncs);

    return relicObj;
};
