#pragma once
#ifndef BASE_STSTYPES_H
#define BASE_STSTYPES_H

#include <stdint.h>

namespace STS
{
    typedef void* (*dummyFunc_t)(void *);
    struct runtimetype_t
    {
        uint32_t typeSize;
        int16_t word4;
        uint32_t dword8;
        uint32_t dwordC;
        uint32_t dword10;
        uint32_t dword14;
        uint64_t qword18;
        uint32_t dword20;
        uint32_t dword24;
        uint64_t qword28;
        uint64_t qword30;
        uint32_t selfPtr;
        uint32_t vfuncMap;
        uint32_t field_40;
        uint32_t dword44;
        uint32_t dword48;
        uint32_t dword4C;
        uint32_t dword50;
        uint32_t dword54;
        uint32_t dword58;
        uint32_t dword5C;
        int8_t byte60;
        uint32_t dword64;
        uint32_t dword68;
        int8_t byte6C;
        uint32_t dword70;
        uint32_t dword74;
        uint32_t dword78;
        uint32_t dword7C;
        uint32_t dword80;
        int8_t byte84;
        uint32_t dword88;
        int8_t field_8C;
        uint32_t dword90;
        uint32_t dword94;
        int16_t word98;
        int16_t word9A;
        uint32_t dword9C;
        uint32_t dwordA0;
        int16_t wordA4;
        uint32_t dwordA8;
        uint32_t dwordAC;
        int8_t byteB0;
        uint32_t dwordB4;
        uint32_t dwordB8;
        int16_t wordBC;
        uint32_t dwordC0;
        uint32_t dwordC4;
        int8_t byteC8;
        uint32_t dwordCC;
        } __attribute__((aligned(4)));


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

    enum class RelicTier:uint32_t
    {
        DEPRECATED = 0x0,
        STARTER = 0x1,
        COMMON = 0x2,
        UNCOMMON = 0x3,
        RARE = 0x4,
        SPECIAL = 0x5,
        BOSS = 0x6,
        SHOP = 0x7,
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
    } __attribute__((aligned(4)));

    struct AbstractRelicVFuncMap
    {
        void *baseClassPtr;
        void *vFuncMap;
        uint8_t gap08[16];
        dummyFunc_t ToString;
        bool byte1C;
        uint8_t pad1D[3];
        dummyFunc_t usedUp;
        bool byte24;
        uint8_t gap25[3];
        dummyFunc_t spawn;
        bool byte2C;
        uint8_t gap2D[3];
        dummyFunc_t getPrice;
        bool byte34;
        uint8_t gap35[3];
        dummyFunc_t dword38;
        bool byte3C;
        uint8_t gap3D[3];
        dummyFunc_t instantObtain;
        bool byte44;
        uint8_t gap45[3];
        dummyFunc_t instantObtain1;
        bool byte4C;
        uint8_t gap4D[3];
        dummyFunc_t obtain;
        bool byte54;
        uint8_t gap55[11];
        dummyFunc_t dword60;
        bool byte64;
        uint8_t gap65[3];
        dummyFunc_t dword68;
        bool byte6C;
        uint8_t gap6D[3];
        dummyFunc_t dword70;
        bool byte74;
        uint8_t gap75[3];
        dummyFunc_t dword78;
        bool byte7C;
        uint8_t gap7D[3];
        dummyFunc_t dword80;
        bool byte84;
        uint8_t gap85[3];
        dummyFunc_t dword88;
        bool byte8C;
        uint8_t gap8D[3];
        dummyFunc_t dword90;
        bool byte94;
        uint8_t gap95[3];
        dummyFunc_t dword98;
        bool byte9C;
        uint8_t gap9D[11];
        dummyFunc_t onPlayCard;
        bool byteAC;
        uint8_t gapAD[3];
        dummyFunc_t onPreviewObtainCard;
        bool byteB4;
        uint8_t gapB5[3];
        dummyFunc_t onObtainCard;
        bool byteBC;
        uint8_t gapBD[3];
        dummyFunc_t onGainGold;
        bool byteC4;
        uint8_t gapC5[3];
        dummyFunc_t onLoseGold;
        bool byteCC;
        uint8_t gapCD[3];
        dummyFunc_t onSpendGold;
        bool byteD4;
        uint8_t gapD5[3];
        dummyFunc_t onEquip;
        bool byteDC;
        uint8_t gapDD[3];
        dummyFunc_t onUnequip;
        bool byteE4;
        uint8_t gapE5[3];
        dummyFunc_t atPreBattle;
        bool byteEC;
        uint8_t gapED[3];
        dummyFunc_t atBattleStart;
        bool byteF4;
        uint8_t gapF5[3];
        dummyFunc_t onSpawnMonster;
        bool byteFC;
        uint8_t gapFD[3];
        dummyFunc_t atBattleStartPreDraw;
        bool byte104;
        uint8_t gap105[3];
        dummyFunc_t atTurnStart;
        bool byte10C;
        uint8_t gap10D[3];
        dummyFunc_t atTurnStartPostDraw;
        bool byte114;
        uint8_t gap115[3];
        dummyFunc_t onPlayerEndTurn;
        bool byte11C;
        uint8_t gap11D[3];
        dummyFunc_t onBloodied;
        bool byte124;
        uint8_t gap125[3];
        dummyFunc_t onNotBloodied;
        bool byte12C;
        uint8_t gap12D[3];
        dummyFunc_t onManualDiscard;
        bool byte134;
        uint8_t gap135[3];
        dummyFunc_t onUseCard;
        bool byte13C;
        uint8_t gap13D[3];
        dummyFunc_t onVictory;
        bool byte144;
        uint8_t gap145[3];
        dummyFunc_t onMonsterDeath;
        bool byte14C;
        uint8_t gap14D[3];
        dummyFunc_t onBlockBroken;
        bool byte154;
        uint8_t gap155[11];
        dummyFunc_t onPlayerGainedBlock;
        bool byte164;
        uint8_t gap165[3];
        dummyFunc_t onPlayerHeal;
        bool byte16C;
        uint8_t gap16D[11];
        dummyFunc_t onEnergyRecharge;
        bool byte17C;
        uint8_t gap17D[3];
        dummyFunc_t addCampfireOption;
        bool byte184;
        uint8_t gap185[3];
        dummyFunc_t canUseCampfireOption;
        bool byte18C;
        uint8_t gap18D[3];
        dummyFunc_t onRest;
        bool byte194;
        uint8_t gap195[11];
        dummyFunc_t onEnterRestRoom;
        bool byte1A4;
        uint8_t gap1A5[3];
        dummyFunc_t onRefreshHand;
        bool byte1AC;
        uint8_t gap1AD[3];
        dummyFunc_t onShuffle;
        bool byte1B4;
        uint8_t gap1B5[3];
        dummyFunc_t onSmith;
        bool byte1BC;
        uint8_t gap1BD[3];
        dummyFunc_t onAttack;
        bool byte1C4;
        uint8_t gap1C5[3];
        dummyFunc_t onAttacked;
        bool byte1CC;
        uint8_t gap1CD[3];
        dummyFunc_t onAttackedToChangeDamage;
        bool byte1D4;
        uint8_t gap1D5[3];
        dummyFunc_t onAttackToChangeDamage;
        bool byte1DC;
        uint8_t gap1DD[3];
        dummyFunc_t onExhaust;
        bool byte1E4;
        uint8_t gap1E5[3];
        dummyFunc_t onTrigger;
        bool byte1EC;
        uint8_t gap1ED[3];
        dummyFunc_t onTrigger1;
        bool byte1F4;
        uint8_t gap1F5[3];
        dummyFunc_t checkTrigger;
        bool byte1FC;
        uint8_t gap1FD[3];
        dummyFunc_t onEnterRoom;
        bool byte204;
        uint8_t gap205[3];
        dummyFunc_t justEnteredRoom;
        bool byte20C;
        uint8_t gap20D[3];
        dummyFunc_t onCardDraw;
        bool byte214;
        uint8_t gap215[3];
        dummyFunc_t dword218;
        bool byte21C;
        uint8_t gap21D[3];
        dummyFunc_t dword220;
        bool byte224;
        uint8_t gap225[3];
        dummyFunc_t onDrawOrDiscard;
        bool byte22C;
        uint8_t gap22D[3];
        dummyFunc_t dword230;
        bool byte234;
        uint8_t gap235[3];
        dummyFunc_t dword238;
        bool byte23C;
        uint8_t gap23D[3];
        dummyFunc_t dword240;
        bool byte244;
        uint8_t gap245[3];
        dummyFunc_t dword248;
        bool byte24C;
        uint8_t gap24D[3];
        dummyFunc_t dword250;
        bool byte254;
        uint8_t gap255[3];
        dummyFunc_t dword258;
        bool byte25C;
        uint8_t gap25D[3];
        dummyFunc_t dword260;
        bool byte264;
        uint8_t gap265[3];
        dummyFunc_t dword268;
        bool byte26C;
        uint8_t gap26D[3];
        dummyFunc_t dword270;
        bool byte274;
        uint8_t gap275[3];
        dummyFunc_t dword278;
        bool byte27C;
        uint8_t gap27D[3];
        dummyFunc_t dword280;
        bool byte284;
        uint8_t gap285[3];
        dummyFunc_t dword288;
        bool byte28C;
        uint8_t gap28D[3];
        dummyFunc_t dword290;
        bool byte294;
        uint8_t gap295[3];
        dummyFunc_t dword298;
        bool byte29C;
        uint8_t gap29D[3];
        dummyFunc_t dword2A0;
        bool byte2A4;
        uint8_t gap2A5[3];
        dummyFunc_t dword2A8;
        bool byte2AC;
        uint8_t gap2AD[3];
        dummyFunc_t dword2B0;
        bool byte2B4;
        uint8_t gap2B5[3];
        dummyFunc_t dword2B8;
        bool byte2BC;
        uint8_t gap2BD[3];
        dummyFunc_t dword2C0;
        bool byte2C4;
        uint8_t gap2C5[3];
        dummyFunc_t dword2C8;
        bool byte2CC;
        uint8_t gap2CD[3];
        dummyFunc_t canPlay;
        bool byte2D4;
        uint8_t gap2D5[3];
        dummyFunc_t dword2D8;
        bool byte2DC;
        uint8_t gap2DD[3];
        dummyFunc_t dword2E0;
        bool byte2E4;
        uint8_t gap2E5[11];
        dummyFunc_t dword2F0;
        bool byte2F4;
        uint8_t gap2F5[11];
        dummyFunc_t dword300;
        bool byte304;
        uint8_t gap305[3];
        dummyFunc_t onUsePotion;
        bool byte30C;
        uint8_t gap30D[3];
        dummyFunc_t dword310;
        bool byte314;
        uint8_t gap315[3];
        dummyFunc_t onLoseHp;
        bool byte31C;
        uint8_t gap31D[3];
        dummyFunc_t dword320;
        bool byte324;
        uint8_t gap325[3];
        dummyFunc_t dword328;
        bool byte32C;
        uint8_t gap32D[3];
        dummyFunc_t dword330;
        bool byte334;
        uint8_t gap335[3];
        dummyFunc_t dword338;
        bool byte33C;
        uint8_t gap33D[3];
        dummyFunc_t dword340;
        bool byte344;
        uint8_t gap345[3];
        dummyFunc_t dword348;
        bool byte34C;
    } __attribute__((aligned(4)));

    struct AbstractRelic
    {
        void *baseClassPtr;
        void *vFuncMap;
        JString *name;
        JString *relicId;
        void *relicStrings;
        void *DESCRIPTIONS;
        bool energyBased;
        bool usedUp;
        bool grayscale;
        uint8_t pad1B;
        JString *description;
        JString *flavorText;
        int32_t cost;
        int32_t counter;
        RelicTier tier;
        void *tips;
        void *img;
        void *largeImg;
        void *outlineImg;
        JString *imgUrl;
        float currentX;
        float currentY;
        float targetX;
        float targetY;
        Color *flashColor;
        Color *goldOutlineColor;
        bool isSeen;
        uint8_t pad5D[3];
        float animationTimer;
        float glowTimer;
        float flashTimer;
        void *f_effect;
        bool isDone;
        bool isAnimating;
        bool isObtained;
        void *landingSFX;
        void *hb;
        float rotation;
        bool discarded;
        uint8_t pad81[3];
        JString *assetURL;
        uint8_t unk[];
    } __attribute__((aligned(4)));

}


#endif //BASE_STSTYPES_H
