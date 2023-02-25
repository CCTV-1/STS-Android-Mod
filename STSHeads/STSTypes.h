#pragma once
#ifndef BASE_STSTYPES_H
#define BASE_STSTYPES_H

#include <stdint.h>

namespace STS
{
    enum class CardTarget:uint32_t
    {
        ENEMY = 0x0,
        ALL_ENEMY = 0x1,
        SELF = 0x2,
        NONE = 0x3,
        SELF_AND_ENEMY = 0x4,
        ALL = 0x5,
    };

    enum DamageType:uint32_t
    {
        NORMAL = 0x0,
        THORNS = 0x1,
        HP_LOSS = 0x2,
    };

    enum class CardType:uint32_t
    {
        ATTACK = 0x0,
        SKILL = 0x1,
        POWER = 0x2,
        STATUS = 0x3,
        CURSE = 0x4,
    };

    enum class CardRarity:uint32_t
    {
        BASIC = 0,
        SPECIAL,
        COMMON,
        UNCOMMON,
        RARE,
        CURSE,
    };

    enum class CardColor:uint32_t
    {
        RED = 0,
        GREEN,
        BLUE,
        PURPLE,
        COLORLESS,
        CURSE,
    };

    struct JString
    {
        uint32_t unk;
        uint32_t unk2;
        int32_t len;
        char16_t data[];
    };

    struct UUID
    {
        uint64_t mostSigBits;
        uint64_t leastSigBits;
    };

    struct Color
    {
        float r;
        float g;
        float b;
        float a;
    };

    struct AbstractCard
    {
        void *baseClassPtr;
        void *vFuncMap;
        CardType type;
        int32_t cost;
        int32_t costForTurn;
        int32_t price;
        int32_t chargeCost;
        bool isCostModified;
        bool isCostModifiedForTurn;
        bool retain;
        bool selfRetain;
        bool dontTriggerOnUseCard;
        uint8_t pad21[3];
        CardRarity rarity;
        CardColor color;
        bool isInnate;
        bool isLocked;
        bool showEvokeValue;
        uint8_t pad2F;
        int32_t showEvokeOrbCount;
        void *keywords;
        bool isUsed;
        bool upgraded;
        uint8_t pad3A[2];
        int32_t timesUpgraded;
        int32_t misc;
        int32_t energyOnUse;
        bool ignoreEnergyOnUse;
        bool isSeen;
        bool upgradedCost;
        bool upgradedDamage;
        bool upgradedBlock;
        bool upgradedMagicNumber;
        uint8_t pad4E[2];
        UUID uuid;
        bool isSelected;
        bool exhaust;
        bool returnToHand;
        bool shuffleBackIntoDrawPile;
        bool isEthereal;
        uint8_t pad65[3];
        void *tags;
        int32_t *multiDamage;
        bool isMultiDamage;
        uint8_t pad71[3];
        int32_t baseDamage;
        int32_t baseBlock;
        int32_t baseMagicNumber;
        int32_t baseHeal;
        int32_t baseDraw;
        int32_t baseDiscard;
        int32_t damage;
        int32_t block;
        int32_t magicNumber;
        int32_t heal;
        int32_t draw;
        int32_t discard;
        bool isDamageModified;
        bool isBlockModified;
        bool isMagicNumberModified;
        DamageType damageType;
        DamageType damageTypeForTurn;
        CardTarget target;
        bool purgeOnUse;
        bool exhaustOnUseOnce;
        bool exhaustOnFire;
        bool freeToPlayOnce;
        bool isInAutoplay;
        uint8_t padB9[3];
        void *portrait;
        void *jokePortrait;
        void *flashVfx;
        JString *assetUrl;
        bool fadingOut;
        uint8_t padCD[3];
        float transparency;
        float targetTransparency;
        float targetAngle;
        float angle;
        uint8_t gapD8[20];
        float glowTimer;
        uint8_t gapF4[28];
        float drawScale;
        float targetDrawScale;
        uint8_t gap11c[32];
        JString *originalName;
        JString *name;
        JString *rawDescription;
        JString *cardID;
        uint8_t gap140[48];
        Color glowColor;
        uint8_t unk[];
    } __attribute__((aligned(4)));
}


#endif //BASE_STSTYPES_H
