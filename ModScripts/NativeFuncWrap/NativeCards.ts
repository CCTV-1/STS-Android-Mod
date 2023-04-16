import { CardColor, CardGroupType, CardRarity, CardTarget, CardType, DamageType } from "../enums.js";
import { STSCardCtor } from "../NativeClassWrap/AbstractCard.js";
import { PatchHelper } from "../PatchHelper.js";
import { NativeFunctionInfo } from "./NativeFunctionInfo.js";
import { NativeSTDLib } from "./NativeSTDLib.js";

const Cards = {
    AbstractCard: {
        /**
         * ```c
         * STS::AbstractCard * Cards::AbstractCard::canUse(STS::AbstractCard * this, STS::AbstractPlayer* playerPtr, STS::AbstractMonster* monsterPtr)
         * ```
         */
        canUse: new NativeFunctionInfo(0x16DB091, 'bool', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * STS::AbstractCard * Cards::AbstractCard::Ctor(STS::AbstractCard * this, STS::JString* id, STS::JString* name, STS::JString* imgUrl, 
         * int32_t cost, STS::JString* rawDescription, STS::CardType type, STS::CardColor color, STS::CardRarity rarity, STS::CardTarget target, STS::DamageType dType)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x16D4FB5, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'int32', 'pointer', 'uint32', 'uint32', 'uint32', 'uint32', 'uint32']),
        /**
         * ```c
         * STS::AbstractCard * Cards::AbstractCard::makeStatEquivalentCopy(STS::AbstractCard * this)
         * ```
         */
        makeStatEquivalentCopy: new NativeFunctionInfo(0x16DA80D, 'pointer', ['pointer']),
    },
    CardGroup: {
        /**
         * ```c
         * CardGroup* CardGroup::Ctor(CardGroup* thisPtr, CardGroupType type)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x16F8B45, 'pointer', ['pointer', 'uint32']),
        /**
         * ```c
         * CardGroup* CardGroup::Ctor(CardGroup* thisPtr, CardGroup* sourceGroupPtr, CardGroupType type)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x16F8D85, 'pointer', ['pointer', 'pointer', 'uint32']),
    },
    CardQueueItem: {
        /**
         * ```c
         * CardQueueItem* CardQueueItem::Ctor(CardQueueItem* thisPtr)
         * ```
         */
        Ctor: new NativeFunctionInfo(0x170E879, 'pointer', ['pointer']),
        /**
         * ```c
         * CardQueueItem* CardQueueItem::Ctor(CardQueueItem* thisPtr, STS::AbstractCard* cardPtr, bool isEndTurnAutoPlay)
         * ```
         */
        Ctor2: new NativeFunctionInfo(0x170E8FD, 'pointer', ['pointer', 'pointer', 'bool']),
        /**
         * ```c
         * CardQueueItem* CardQueueItem::Ctor(CardQueueItem* thisPtr, STS::AbstractCard* cardPtr, STS::AbstractMonster* monsterPtr)
         * ```
         */
        Ctor3: new NativeFunctionInfo(0x170E985, 'pointer', ['pointer', 'pointer', 'pointer']),
        /**
         * ```c
         * CardQueueItem* CardQueueItem::Ctor(CardQueueItem* thisPtr, STS::AbstractCard* cardPtr, STS::AbstractMonster* monsterPtr, 
         *      int32_t setEnergyOnUse, bool ignoreEnergyTotal, bool autoplayCard)
         * ```
         */
        Ctor4: new NativeFunctionInfo(0x170EB41, 'pointer', ['pointer', 'pointer', 'pointer', 'int32', 'bool', 'bool']),
        /**
         * ```c
         * CardQueueItem* CardQueueItem::Ctor(CardQueueItem* thisPtr, STS::AbstractCard* cardPtr, bool randomTarget, 
         *      int32_t setEnergyOnUse, bool ignoreEnergyTotal, bool autoplayCard)
         * ```
         */
        Ctor5: new NativeFunctionInfo(0x170EBF1, 'pointer', ['pointer', 'pointer', 'bool', 'int32', 'bool', 'bool']),
    },
    DamageInfo: {
        /**
         * ```c
         * STS::DamageInfo* Cards::DamageInfo::Ctor(STS::DamageInfo* thisPtr, STS::AbstractCreature* damageSource, int dmgValue, DamageType type)
         * ```
         * 
         * Ctor2 just call ```Ctor(thisPtr, damageSource, dmgValue, DamageType.NORMAL);```
         */
        Ctor: new NativeFunctionInfo(0x1719A8D, 'pointer', ['pointer', 'pointer', 'int32', 'uint32']),
    },
    Red: {
        Bash: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Red::Bash::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x173AD4D, 'pointer', ['pointer']),
        },
        Clothesline: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Red::Clothesline::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x173DA49, 'pointer', ['pointer']),
        },
        DefendRed: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Red::Defend_Red::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x173E7DD, 'pointer', ['pointer']),
        },
        Feed: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Red::Feed::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1740309, 'pointer', ['pointer']),
        },
        HeavyBlade: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Red::HeavyBlade::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1741E25, 'pointer', ['pointer']),
        },
        PerfectedStrike: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Red::PerfectedStrike::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x17445DD, 'pointer', ['pointer']),
        },
        SearingBlow: {
            /**
             * ```c
             * void Cards::Red::SearingBlow::Use(STS::AbstractCard * this, STS::AbstractPlayer* castPlayer, STS::AbstractMonster* targetMonster)
             * ```
             */
            Use: new NativeFunctionInfo(0x17467A5, 'void', ['pointer', 'pointer', 'pointer']),
        },
        StrikeRed: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Red::Strike_Red::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1747E89, 'pointer', ['pointer']),
        },
        DemonForm: {
            /**
             * ```c
             * void Cards::Red::DemonForm::Use(STS::AbstractCard * this, STS::AbstractPlayer* castPlayer, STS::AbstractMonster* targetMonster)
             * ```
             */
            Use: new NativeFunctionInfo(0x173EC15, 'void', ['pointer', 'pointer', 'pointer']),
        },
        Thunderclap: {
            /**
             * ```c
             * void Cards::Red::Thunderclap::Use(STS::AbstractCard * this, STS::AbstractPlayer* castPlayer, STS::AbstractMonster* targetMonster)
             * ```
             */
            Use: new NativeFunctionInfo(0x17487FD, 'void', ['pointer', 'pointer', 'pointer']),
        },
    },
    Purple: {
        Alpha: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Purple::Alpha::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x172AE45, 'pointer', ['pointer'])
        }
    },
    Temp: {
        Omega: {
            /**
             * ```c
             * STS::AbstractCard * Cards::Temp::Omega::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1750CE9, 'pointer', ['pointer']),
        }
    },
    status: {
        Burn: {
            /**
             * ```c
             * STS::AbstractCard * Cards::status::Burn::Ctor(STS::AbstractCard * this)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x176BDCD, 'pointer', ['pointer']),
        }
    }
};

export const NativeCards = {
    AbstractCard: {
        canUse: (thisPtr: NativePointer, playerPtr: NativePointer, monsterPtr: NativePointer): boolean => {
            return PatchHelper.GetNativeFunction(Cards.AbstractCard.canUse)(thisPtr, playerPtr, monsterPtr);
        },

        Ctor(id: string, name: string, imgUrl: string, cost: number, rawDescription: string,
            type: CardType, color: CardColor, rarity: CardRarity, target: CardTarget, dType: DamageType): NativePointer {
            let nativeId = NativeSTDLib.JString.Ctor(id);
            let nativeName = NativeSTDLib.JString.Ctor(name);
            let nativeimgUrl = NativeSTDLib.JString.Ctor(imgUrl);
            let nativerawDescription = NativeSTDLib.JString.Ctor(rawDescription);
            return PatchHelper.GetNativeFunction(Cards.AbstractCard.Ctor)(NULL, nativeId, nativeName,
                nativeimgUrl, cost, nativerawDescription, Number(type), Number(color), Number(rarity), Number(target), Number(dType));
        },
        OverrideCtor(newCtor: (thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer,
            type: Number, color: Number, rarity: Number, target: Number, dType: Number) => NativePointer):
            (thisPtr: NativePointer, id: NativePointer, name: NativePointer, imgUrl: NativePointer, cost: number, rawDescription: NativePointer,
                type: Number, color: Number, rarity: Number, target: Number, dType: Number) => NativePointer {
            return PatchHelper.HookSTSFunction(Cards.AbstractCard.Ctor, newCtor);
        },

        makeStatEquivalentCopy(thisPtr: NativePointer) {
            return PatchHelper.GetNativeFunction(Cards.AbstractCard.makeStatEquivalentCopy)(thisPtr);
        },
        OverridemakeStatEquivalentCopy(newImplement: (thisPtr: NativePointer) => NativePointer): (thisPtr: NativePointer) => NativePointer {
            return PatchHelper.HookSTSFunction(Cards.AbstractCard.makeStatEquivalentCopy, newImplement);
        },
    },
    CardGroup: {
        Ctor(type: CardGroupType): NativePointer {
            return PatchHelper.GetNativeFunction(Cards.CardGroup.Ctor)(NULL, Number(type));
        },
        Ctor2(groupPtr: NativePointer, type: CardGroupType): NativePointer {
            return PatchHelper.GetNativeFunction(Cards.CardGroup.Ctor2)(NULL, groupPtr, Number(type));
        },
    },
    CardQueueItem: {
        Ctor(): NativePointer {
            return PatchHelper.GetNativeFunction(Cards.CardQueueItem.Ctor)(NULL);
        },
        Ctor2(cardPtr: NativePointer, isEndTurnAutoPlay: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Cards.CardQueueItem.Ctor2)(NULL, cardPtr, Number(isEndTurnAutoPlay));
        },
        Ctor3(cardPtr: NativePointer, monsterPtr: NativePointer): NativePointer {
            return PatchHelper.GetNativeFunction(Cards.CardQueueItem.Ctor3)(NULL, cardPtr, monsterPtr);
        },
        Ctor4(cardPtr: NativePointer, monsterPtr: NativePointer, setEnergyOnUse: number, ignoreEnergyTotal: boolean, autoplayCard: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Cards.CardQueueItem.Ctor4)(NULL, cardPtr, monsterPtr, setEnergyOnUse, Number(ignoreEnergyTotal), Number(autoplayCard));
        },
        Ctor5(cardPtr: NativePointer, randomTarget: boolean, setEnergyOnUse: number, ignoreEnergyTotal: boolean, autoplayCard: boolean): NativePointer {
            return PatchHelper.GetNativeFunction(Cards.CardQueueItem.Ctor5)(NULL, cardPtr, Number(randomTarget), setEnergyOnUse, Number(ignoreEnergyTotal), Number(autoplayCard));
        },
    },
    DamageInfo: {
        Ctor(damageSource: NativePointer, dmgValue: number, dmgTYpe: DamageType): NativePointer {
            return PatchHelper.GetNativeFunction(Cards.DamageInfo.Ctor)(NULL, damageSource, dmgValue, Number(dmgTYpe));
        }
    },
    Red: {
        Bash: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Red.Bash.Ctor)(NULL);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchHelper.HookSTSFunction(Cards.Red.Bash.Ctor, newCtor);
            },
        },
        Clothesline: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Red.Clothesline.Ctor)(NULL);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchHelper.HookSTSFunction(Cards.Red.Clothesline.Ctor, newCtor);
            },
        },
        DefendRed: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Red.DefendRed.Ctor)(NULL);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchHelper.HookSTSFunction(Cards.Red.DefendRed.Ctor, newCtor);
            },
        },
        Feed: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Red.Feed.Ctor)(NULL);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchHelper.HookSTSFunction(Cards.Red.Feed.Ctor, newCtor);
            },
        },
        HeavyBlade: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Red.HeavyBlade.Ctor)(NULL);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchHelper.HookSTSFunction(Cards.Red.HeavyBlade.Ctor, newCtor);
            },
        },
        PerfectedStrike: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Red.PerfectedStrike.Ctor)(NULL);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchHelper.HookSTSFunction(Cards.Red.PerfectedStrike.Ctor, newCtor);
            },
        },
        SearingBlow: {
            Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                PatchHelper.GetNativeFunction(Cards.Red.SearingBlow.Use)(thisPtr, caster, target);
            },
            /** return origin Use */
            OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                return PatchHelper.HookSTSFunction(Cards.Red.SearingBlow.Use, newUse);
            }
        },
        StrikeRed: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Red.StrikeRed.Ctor)(NULL);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchHelper.HookSTSFunction(Cards.Red.StrikeRed.Ctor, newCtor);
            },
        },
        DemonForm: {
            Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                PatchHelper.GetNativeFunction(Cards.Red.DemonForm.Use)(thisPtr, caster, target);
            },
            /** return origin Use */
            OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                return PatchHelper.HookSTSFunction(Cards.Red.DemonForm.Use, newUse);
            }
        },
        Thunderclap: {
            Use(thisPtr: NativePointer, caster: NativePointer, target: NativePointer): void {
                PatchHelper.GetNativeFunction(Cards.Red.Thunderclap.Use)(thisPtr, caster, target);
            },
            /** return origin Use */
            OverridUse(newUse: (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void): (thisPtr: NativePointer, caster: NativePointer, target: NativePointer) => void {
                return PatchHelper.HookSTSFunction(Cards.Red.Thunderclap.Use, newUse);
            }
        }
    },
    Purple: {
        Alpha: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Purple.Alpha.Ctor)(NULL);
            },
            /** return origin Ctor */
            OverrideCtor(newCtor: STSCardCtor): STSCardCtor {
                return PatchHelper.HookSTSFunction(Cards.Purple.Alpha.Ctor, newCtor);
            }
        }
    },
    Temp: {
        Omega: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.Temp.Omega.Ctor)(NULL);
            },
        }
    },
    status: {
        Burn: {
            Ctor(): NativePointer {
                return PatchHelper.GetNativeFunction(Cards.status.Burn.Ctor)(NULL);
            }
        },
    },
};