#pragma once
#ifndef BASE_STSTYPES_H
#define BASE_STSTYPES_H

#include <stdint.h>

namespace STS
{
    typedef void* (*dummyFunc_t)(void *);

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

    enum class ActionType:uint32_t
    {
        BLOCK = 0, 
        POWER, 
        CARD_MANIPULATION, 
        DAMAGE, 
        DEBUFF, 
        DISCARD, 
        DRAW, 
        EXHAUST, 
        HEAL, 
        ENERGY, 
        TEXT, 
        USE, 
        CLEAR_CARD_QUEUE, 
        DIALOG, 
        SPECIAL, 
        WAIT, 
        SHUFFLE, 
        REDUCE_POWER
    };

    enum class AttackEffect:uint32_t
    {
        BLUNT_LIGHT = 0, 
        BLUNT_HEAVY, 
        SLASH_DIAGONAL, 
        SMASH, 
        SLASH_HEAVY, 
        SLASH_HORIZONTAL, 
        SLASH_VERTICAL, 
        NONE, 
        FIRE, 
        POISON, 
        SHIELD, 
        LIGHTNING
    };

    enum class CardGroupType:uint32_t
    {
        DRAW_PILE = 0, 
        MASTER_DECK, 
        HAND, 
        DISCARD_PILE, 
        EXHAUST_PILE, 
        CARD_POOL, 
        UNSPECIFIED
    };

    enum class PlayerClass:uint32_t
    {
        IRONCLAD = 0, 
        THE_SILENT, 
        DEFECT, 
        WATCHER
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

    struct DamageInfo
    {
        void *basePtr;
        void *vfuncMap;
        AbstractCreature *owner;
        JString *name;
        DamageType type;
        int32_t base;
        int32_t output;
        bool isModified;
        uint8_t pad1D[3];
    } __attribute__((aligned(4)));

    template<typename obj_t>
    struct ArrayList
    {
        void *basePtr;
        void *vfuncMap;
        obj_t * data;
        int32_t size;
    } __attribute__((aligned(4)));

    struct CardGroup
    {
        void *basePtr;
        void *vfuncMap;
        ArrayList<AbstractCard *> * group;
        float HAND_START_X;
        float HAND_OFFSET_X;
        CardGroupType type;
        void * handPositioningMap;
        ArrayList<AbstractCard *> * queued;
        ArrayList<AbstractCard *> * inHand;
    } __attribute__((aligned(4)));

    struct AbstractCreature
    {
        void *baseClassPtr;
        void *vFuncMap;
        uint8_t gap08[92];
        int32_t currentHealth;
        int32_t maxHealth;
        uint8_t gap6C[148];
        float reticleAnimTimer;
        uint8_t unk[0];
    } __attribute__((aligned(4)));

    struct AbstractPlayer : public AbstractCreature
    {
        void *basePtr;
        void *vfuncMap;
        uint8_t gap0D[8];
        CardGroup *masterDeck;
        uint8_t unk[];
    };
    

    struct AbstractGameAction
    {
        void *basePtr;
        void *vfuncMap;
        float duration;
        float startDuration;
        ActionType actionType;
        AttackEffect attackEffect;
        DamageType damageType;
        bool isDone;
        uint8_t pad1D[3];
        int32_t amount;
        AbstractCreature* target;
        AbstractCreature* source;
    }__attribute__((aligned(4)));

    struct DeriveGameAction : public AbstractGameAction
    {

    } __attribute__((aligned(4)));

    //see System::Internal::__CreateRuntimeType<AbstractCard *>()
    //offset 0x25EA5C0
    struct AbstractCardVFuncs
    {
        uint8_t gap1[24];
        dummyFunc_t ToString;
        uint8_t gap18[20];
        dummyFunc_t initializeTitle;
        bool gap34;
        dummyFunc_t initializeDescription;
        bool gap3c;
        dummyFunc_t initializeDescriptionCN;
        bool gap44;
        dummyFunc_t hasTag;
        bool gap4c;
        dummyFunc_t canUpgrade;
        bool gap54;
        dummyFunc_t upgrade;
        uint8_t byte5C;
        uint8_t gap5d[3];
        dummyFunc_t displayUpgrades;
        bool gap64;
        dummyFunc_t upgradeDamage;
        bool gap6c;
        dummyFunc_t upgradeBlock;
        bool gap74;
        dummyFunc_t upgradeMagicNumber;
        bool gap7c;
        dummyFunc_t upgradeName;
        bool IupgradeBaseCost;
        dummyFunc_t upgradeBaseCost;
        bool g2;
        dummyFunc_t makeSameInstanceOf;
        bool g3;
        dummyFunc_t makeStatEquivalentCopy;
        bool g4;
        dummyFunc_t onRemoveFromMasterDeck;
        bool g5;
        dummyFunc_t cardPlayable;
        bool g6;
        dummyFunc_t hasEnoughEnergy;
        bool g7;
        dummyFunc_t tookDamage;
        bool g8;
        dummyFunc_t didDiscard;
        bool g9;
        dummyFunc_t switchedStance;
        uint8_t gapcc[20];
        dummyFunc_t canPlay;
        bool IcanUse;
        dummyFunc_t canUse;
        bool IuseFunc;
        dummyFunc_t useFunc;
        bool If1;
        dummyFunc_t update;
        bool If2;
        dummyFunc_t isHoveredInHand;
        bool If3;
        dummyFunc_t render;
        bool If4;
        dummyFunc_t renderHoverShadow;
        bool If5;
        dummyFunc_t renderInLibrary;
        bool If6;
        dummyFunc_t render2;
        bool If7;
        dummyFunc_t f7;
        bool If8;
        dummyFunc_t f8;
        bool If9;
        dummyFunc_t renderOuterGlow;
        bool If10;
        dummyFunc_t getCardBgTexture;
        uint8_t gapF8[498];
        dummyFunc_t makeCopyFunc;
        uint8_t byte33C;
        uint8_t unk[11];
    } __attribute__((aligned(4)));


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
        uint8_t gap11c[24];
        AbstractCard * cardsToPreview;
        float newGlowTimer;
        JString *originalName;
        JString *name;
        JString *rawDescription;
        JString *cardID;
        uint8_t gap140[48];
        Color glowColor;
        uint8_t unk[0];
    } __attribute__((aligned(4)));

    struct DeriveCard : public AbstractCard
    {
    };
}


#endif //BASE_STSTYPES_H
