#pragma once
#ifndef BASE_STSTYPES_H
#define BASE_STSTYPES_H

#include <stdint.h>

namespace GDX
{
    enum class FileType:uint32_t
    {
        Classpath = 0x1, 
        Internal, 
        External, 
        Absolute, 
        Local,
    };

    enum class PixMapFormat:uint32_t
    {
        Alpha = 0x1, 
        Intensity, 
        LuminanceAlpha, 
        RGB565, 
        RGBA4444, 
        RGB888, 
        RGBA8888,
    };

    namespace Files
    {
        class FileHandle
        {
            void *basePtr;
            void *vfuncMap;
            void * JavaFileHandle;
            FileType type;
        } __attribute__((aligned(4)));
    };

    namespace Graphics
    {
        struct Color
        {
            void *basePtr;
            void *vfuncMap;
            float r;
            float g;
            float b;
            float a;
        } __attribute__((aligned(4)));

        struct Texture
        {

        };

        namespace G2D
        {
            struct TextureRegion
            {

            };
            struct Gdx2DPixmap
            {
                
            };
        }

        namespace Glutils
        {
            struct PixmapTextureData
            {
                void *basePtr;
                void *vfuncMap;
                Pixmap* pixmap;
                PixMapFormat format;
                bool useMipMaps;
                bool disposePixmap;
                bool managed;
            } __attribute__((aligned(4)));
        };

        struct Pixmap
        {
            void *basePtr;
            void *vfuncMap;
            G2D::Gdx2DPixmap * pixmap;
            int32_t color;
            bool disposed;
        } __attribute__((aligned(4)));
    };
}

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

    enum class CardTags:uint32_t
    {
        HEALING = 0x0,
        STRIKE,
        EMPTY,
        STARTER_DEFEND,
        STARTER_STRIKE
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

    enum class PotionEffect:uint32_t
    {
        NONE = 0x0, 
        RAINBOW, 
        OSCILLATE
    };

    enum class PotionColor:uint32_t
    {
        POISON = 0x0, 
        BLUE, 
        FIRE, 
        GREEN, 
        EXPLOSIVE, 
        WEAK, 
        FEAR, 
        STRENGTH, 
        WHITE, 
        FAIRY, 
        ANCIENT, 
        ELIXIR, 
        NONE, 
        ENERGY, 
        SWIFT, 
        FRUIT, 
        SNECKO, 
        SMOKE, 
        STEROID, 
        SKILL, 
        ATTACK, 
        POWER
    };

    enum class PotionRarity:uint32_t
    {
        PLACEHOLDER = 0x0, 
        COMMON, 
        UNCOMMON, 
        RARE
    };

    enum class PotionSize:uint32_t
    {
        T = 0x0, 
        S, 
        M, 
        SPHERE, 
        H, 
        BOTTLE, 
        HEART, 
        SNECKO, 
        FAIRY, 
        GHOST, 
        JAR, 
        BOLT, 
        CARD, 
        MOON, 
        SPIKY, 
        EYE, 
        ANVIL
    };

    enum class MonsterIntent:uint32_t
    {
        ATTACK = 0x1, 
        ATTACK_BUFF, 
        ATTACK_DEBUFF, 
        ATTACK_DEFEND, 
        BUFF, 
        DEBUFF, 
        STRONG_DEBUFF, 
        DEBUG, 
        DEFEND, 
        DEFEND_DEBUFF, 
        DEFEND_BUFF, 
        ESCAPE, 
        MAGIC, 
        NONE, 
        SLEEP, 
        STUN, 
        UNKNOWN
    };

    enum class EnemyType:uint32_t
    {
        NORMAL = 0x0, 
        ELITE, 
        BOSS
    };

    enum class PowerType:uint32_t
    {
        BUFF = 0x0,
        DEBUFF
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

    template<typename T>
    struct JObjArr
    {
        void *basePtr;
        void *vfuncMap;
        T (*objArr)[0];
        uint8_t unk[9];
        int32_t *arrSize;
    };
    
    struct PowerTip
    {
        void *basePtr;
        void *vfuncMap;
        void * img;
        void * imgRegion;
        JString*  header;
        JString* body;
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

    struct MonsterGroupVFuncMap
    {
        void *basePtr;
        void *vfuncMap;
        uint8_t unk[24];
        dummyFunc_t addMonster;
        bool byte24;
        uint8_t gap25[19];
        dummyFunc_t showIntent;
        bool byte3C;
        uint8_t gap3D[3];
        dummyFunc_t init;
        bool byte44;
        uint8_t gap45[3];
        dummyFunc_t add;
        bool byte4C;
        uint8_t gap4D[3];
        dummyFunc_t usePreBattleAction;
        bool byte54;
        uint8_t gap55[3];
        dummyFunc_t areMonstersDead;
        bool byte5C;
        uint8_t gap5D[3];
        dummyFunc_t areMonstersBasicallyDead;
        bool byte64;
        uint8_t gap65[3];
        dummyFunc_t applyPreTurnLogic;
        bool byte6C;
        uint8_t gap6D[3];
        dummyFunc_t getMonster;
        bool byte74;
        uint8_t gap75[3];
        dummyFunc_t queueMonsters;
        bool byte7C;
        uint8_t gap7D[3];
        dummyFunc_t haveMonstersEscaped;
        bool byte84;
        uint8_t gap85[19];
        dummyFunc_t getRandomMonster;
        bool byte9C;
        uint8_t gap9D[11];
        dummyFunc_t getRandomMonster2;
        bool byteAC;
        uint8_t gapAD[3];
        dummyFunc_t getRandomMonster3;
        bool byteB4;
        uint8_t gapB5[3];
        dummyFunc_t update;
        bool byteBC;
        uint8_t gapBD[3];
        dummyFunc_t updateAnimations;
        bool byteC4;
        uint8_t gapC5[3];
        dummyFunc_t shouldFlipVfx;
        bool byteCC;
        uint8_t gapCD[3];
        dummyFunc_t escape;
        bool byteD4;
        uint8_t gapD5[3];
        dummyFunc_t unhover;
        bool byteDC;
        uint8_t gapDD[3];
        dummyFunc_t render;
        bool byteE4;
        uint8_t gapE5[3];
        dummyFunc_t applyEndOfTurnPowers;
        bool byteEC;
        uint8_t gapED[3];
        dummyFunc_t renderReticle;
        uint8_t byteF4;
        uint8_t gapF5[3];
    };
    

    struct MonsterGroup
    {
        void *basePtr;
        void *vfuncMap;
        ArrayList<AbstractMonster>* monsters;
        AbstractMonster* hoveredMonster;
    } __attribute__((aligned(4)));

    struct EnergyManager
    {
        void *basePtr;
        void *vfuncMap;
        int32_t energy;
        int32_t energyMaster;
    } __attribute__((aligned(4)));

    struct AbstractPotion
    {
        void *basePtr;
        void *vfuncMap;
        JString* ID;
        JString* name;
        JString* description;
        int32_t slot;
        ArrayList<void*>* tips;
        void * containerImg;
        void * liquidImg;
        void * hybridImg;
        void * spotsImg;
        void * outlineImg;
        float posX;
        float posY;
        GDX::Graphics::Color * labOutlineColor;
        ArrayList<void *>* effect;
        float scale;
        bool isObtained;
        uint8_t pad45[3];
        float sparkleTimer;
        int32_t flashCount;
        float flashTimer;
        PotionEffect p_effect;
        PotionColor color;
        GDX::Graphics::Color * liquidColor;
        GDX::Graphics::Color * hybridColor;
        GDX::Graphics::Color * spotsColor;
        PotionRarity rarity;
        PotionSize size;
        int32_t potency;
        void * hb;
        float angle;
        bool canUse;
        bool discarded;
        bool isThrown;
        bool targetRequired;
    } __attribute__((aligned(4)));

    struct AbstractCreatureVMap
    {
        void *basePtr;
        void *vfuncMap;
        uint8_t gap08[24];
        dummyFunc_t damage;
        bool Initdamage;
        uint8_t gap25[3];
        dummyFunc_t decrementBlock;
        bool byte2C;
        uint8_t gap2D[3];
        dummyFunc_t increaseMaxHp;
        bool byte34;
        uint8_t gap35[3];
        dummyFunc_t decreaseMaxHealth;
        bool byte3C;
        uint8_t gap3D[3];
        dummyFunc_t dword40;
        bool byte44;
        uint8_t gap45[3];
        dummyFunc_t dword48;
        bool byte4C;
        uint8_t gap4D[3];
        dummyFunc_t dword50;
        bool byte54;
        uint8_t gap55[3];
        dummyFunc_t dword58;
        bool byte5C;
        uint8_t gap5D[3];
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
        dummyFunc_t healIB;
        bool byte94;
        uint8_t gap95[3];
        dummyFunc_t healI;
        bool byte9C;
        uint8_t gap9D[3];
        dummyFunc_t addBlock;
        bool byteA4;
        uint8_t gapA5[3];
        dummyFunc_t loseBlockIB;
        bool byteAC;
        uint8_t gapAD[3];
        dummyFunc_t loseBlockV;
        bool byteB4;
        uint8_t gapB5[3];
        dummyFunc_t loseBlockB;
        bool byteBC;
        uint8_t gapBD[3];
        dummyFunc_t loseBlockI;
        bool byteC4;
        uint8_t gapC5[3];
        dummyFunc_t showHealthBar;
        bool byteCC;
        uint8_t gapCD[3];
        dummyFunc_t hideHealthBar;
        bool byteD4;
        uint8_t gapD5[3];
        dummyFunc_t addPower;
        bool byteDC;
        uint8_t gapDD[3];
        dummyFunc_t applyStartOfTurnPowers;
        bool byteE4;
        uint8_t gapE5[3];
        dummyFunc_t applyTurnPowers;
        bool byteEC;
        uint8_t gapED[3];
        dummyFunc_t applyStartOfTurnPostDrawPowers;
        bool byteF4;
        uint8_t gapF5[3];
        dummyFunc_t applyEndOfTurnTriggers;
        bool byteFC;
        uint8_t gapFD[3];
        dummyFunc_t dword100;
        bool byte104;
        uint8_t gap105[11];
        dummyFunc_t dword110;
        bool byte114;
        uint8_t gap115[3];
        dummyFunc_t dword118;
        bool byte11C;
        uint8_t gap11D[3];
        dummyFunc_t updatePowers;
        bool byte124;
        uint8_t gap125[3];
        dummyFunc_t dword128;
        bool byte12C;
        uint8_t gap12D[3];
        dummyFunc_t dword130;
        bool byte134;
        uint8_t gap135[3];
        dummyFunc_t dword138;
        bool byte13C;
        uint8_t gap13D[3];
        dummyFunc_t dword140;
        bool byte144;
        uint8_t gap145[3];
        dummyFunc_t dword148;
        bool byte14C;
        uint8_t gap14D[3];
        dummyFunc_t dword150;
        bool byte154;
        uint8_t gap155[3];
        dummyFunc_t dword158;
        bool byte15C;
        uint8_t gap15D[3];
        dummyFunc_t dword160;
        bool byte164;
        uint8_t gap165[3];
        dummyFunc_t getPower;
        bool byte16C;
        uint8_t gap16D[3];
        dummyFunc_t hasPower;
        bool byte174;
        uint8_t gap175[3];
        dummyFunc_t getDeadOrEscaped;
        bool byte17C;
        uint8_t gap17D[3];
        dummyFunc_t loseGold;
        bool byte184;
        uint8_t gap185[3];
        dummyFunc_t gainGold;
        bool byte18C;
        uint8_t gap18D[3];
        dummyFunc_t dword190;
        bool byte194;
        uint8_t gap195[3];
        dummyFunc_t dword198;
        bool byte19C;
        uint8_t gap19D[3];
        dummyFunc_t dword1A0;
        bool byte1A4;
        uint8_t gap1A5[3];
        dummyFunc_t dword1A8;
        bool byte1AC;
        uint8_t gap1AD[3];
        dummyFunc_t render;
        bool Initrender;
        uint8_t pad1B5[3];
    } __attribute__((aligned(4)));


    struct AbstractCreature
    {
        void *basePtr;
        void *vfuncMap;
        JString *name;
        JString *id;
        ArrayList<void *> *powers;
        bool isPlayer;
        bool isBloodied;
        uint8_t gap16[2];
        float drawX;
        float drawY;
        float dialogX;
        float dialogY;
        void *hb;
        int32_t gold;
        int32_t displayGold;
        bool isDying;
        bool isDead;
        bool halfDead;
        bool flipHorizontal;
        bool flipVertical;
        uint8_t gap39[2];
        float escapeTimer;
        bool isEscaping;
        uint8_t gap41[3];
        ArrayList<void *> *tips;
        void *healthHb;
        float healthHideTimer;
        int32_t lastDamageTaken;
        float hb_x;
        float hb_y;
        float hb_w;
        float hb_h;
        int32_t currentHealth;
        int32_t maxHealth;
        int32_t currentBlock;
        float healthBarWidth;
        float targetHealthBarWidth;
        float hbShowTimer;
        float healthBarAnimTimer;
        float blockAnimTimer;
        float blockOffset;
        float blockScale;
        float hbAlpha;
        float hbYOffset;
        GDX::Graphics::Color *hbBgColor;
        GDX::Graphics::Color *hbShadowColor;
        GDX::Graphics::Color *blockColor;
        GDX::Graphics::Color *blockOutlineColor;
        GDX::Graphics::Color *blockTextColor;
        GDX::Graphics::Color *redHbBarColor;
        GDX::Graphics::Color *greenHbBarColor;
        GDX::Graphics::Color *blueHbBarColor;
        GDX::Graphics::Color *orangeHbBarColor;
        GDX::Graphics::Color *hbTextColor;
        void *TintEffect;
        bool shakeToggle;
        uint8_t gapC1[3];
        float animX;
        float animY;
        float vX;
        float vY;
        void *animation;
        float animationTimer;
        void *atlas;
        void *skeleton;
        void *state;
        void *stateData;
        float reticleAlpha;
        GDX::Graphics::Color *reticleColor;
        GDX::Graphics::Color *reticleShadowColor;
        bool reticleRendered;
        uint8_t gap19[3];
        float reticleOffset;
        float reticleAnimTimer;
    } __attribute__((aligned(4)));

    struct AbstractPlayerVFuncMap : public AbstractCreatureVMap
    {
        uint8_t unk[336];
        dummyFunc_t initializeClass;
        bool InitinitializeClass;
        uint8_t pad30D[3];
        uint8_t unk1[48];
        dummyFunc_t isCursed;
        bool InitisCursed;
        uint8_t pad345[3];
        uint8_t unk2[40];
        dummyFunc_t gainEnergy;
        bool InitgainEnergy;
        dummyFunc_t loseEnergy;
        bool InitloseEnergy;
        uint8_t gap37D[3];
        uint8_t unk3[24];
        dummyFunc_t drawN;
        bool InitdrawN;
        uint8_t gap39D[3];
        dummyFunc_t draw1;
        bool Initdraw1;
        uint8_t gap3A5[3];
        uint8_t unk4[104];
        dummyFunc_t hasRelic;
        bool InithasRelic;
        uint8_t gap415[3];
        dummyFunc_t hasBlight;
        bool InithasBlight;
        uint8_t gap41D[3];
        dummyFunc_t hasPotion;
        bool InithasPotion;
        uint8_t gap425[3];
        uint8_t unk5[160];
        dummyFunc_t increaseMaxOrbSlots;
        bool InitincreaseMaxOrbSlots;
        dummyFunc_t decreaseMaxOrbSlots;
        bool InitdecreaseMaxOrbSlots;
        uint8_t unk5[72];
    }  __attribute__((aligned(4)));


    struct AbstractPlayer : public AbstractCreature
    {
        PlayerClass chosenClass;
        int32_t gameHandSize;
        int32_t masterHandSize;
        int32_t startingMaxHP;
        CardGroup *masterDeck;
        CardGroup *drawPile;
        CardGroup *hand;
        CardGroup *discardPile;
        CardGroup *exhaustPile;
        CardGroup *limbo;
        void *relics;
        void *blights;
        int32_t potionSlots;
        void *potions;
        void *energy;
        bool isEndingTurn;
        bool viewingRelics;
        bool inspectMode;
        uint8_t gap143;
        void *inspectHb;
        int32_t damagedThisCombat;
        JString *title;
        void *orbs;
        int32_t masterMaxOrbs;
        int32_t maxOrbs;
        void *stance;
        int32_t cardsPlayedThisTurn;
        bool isHoveringCard;
        bool isHoveringDropZone;
        uint8_t pad166[2];
        float hoverStartLine;
        bool passedHesitationLine;
        uint8_t gap16d[3];
        AbstractCard *hoveredCard;
        AbstractCard *toHover;
        AbstractCard *cardInUse;
        bool isDraggingCard;
        bool isUsingClickDragControl;
        uint8_t gap17E[2];
        float clickDragTimer;
        bool inSingleTargetMode;
        uint8_t gap185[3];
        void *hoveredMonster;
        float hoverEnemyWaitTimer;
        bool isInKeyboardMode;
        bool skipMouseModeOnce;
        uint8_t gap192[2];
        int32_t keyboardCardIndex;
        int32_t touchscreenInspectCount;
        void *img;
        void *shoulderImg;
        void *shoulder2Img;
        void *corpseImg;
        float arrowScale;
        float arrowScaleTimer;
        bool endTurnQueued;
        uint8_t gap1B4[3];
        void *points;
        void *controlPoint;
        void *arrowTmp;
        void *startArrowVector;
        void *endArrowVector;
        bool renderCorpse;
    } __attribute__((aligned(4)));
    

    struct AbstractMonsterVFuncMap : public AbstractCreatureVMap
    {
        dummyFunc_t refreshIntentHbLocation;
        bool Init0;
        uint8_t pad5[3];
        dummyFunc_t update;
        bool Init8;
        uint8_t padd[3];
        dummyFunc_t unhover;
        bool Init10;
        uint8_t pad15[3];
        dummyFunc_t gap18;
        bool Init18;
        uint8_t pad1d[3];
        dummyFunc_t flashIntent;
        bool Init20;
        uint8_t pad25[3];
        dummyFunc_t createIntent;
        bool Init28;
        uint8_t pad2d[3];
        dummyFunc_t setMove;
        bool Init30;
        uint8_t pad35[3];
        dummyFunc_t setMove2;
        bool Init38;
        uint8_t pad3d[3];
        dummyFunc_t setMove3;
        bool Init40;
        uint8_t pad45[3];
        dummyFunc_t setMove4;
        bool Init48;
        uint8_t pad4d[3];
        dummyFunc_t setMove5;
        bool Init50;
        uint8_t pad55[3];
        dummyFunc_t setMove6;
        bool Init58;
        uint8_t pad5d[3];
        dummyFunc_t rollMove;
        bool Init60;
        uint8_t pad65[3];
        dummyFunc_t lastMove;
        bool Init68;
        uint8_t pad6d[3];
        dummyFunc_t lastMoveBefore;
        bool Init70;
        uint8_t pad75[3];
        dummyFunc_t lastTwoMoves;
        bool Init78;
        uint8_t pad7d[3];
        dummyFunc_t gap80;
        bool Init80;
        uint8_t pad85[3];
        dummyFunc_t getAttackIntent;
        bool Init88;
        uint8_t pad8d[3];
        dummyFunc_t init;
        bool Init90;
        uint8_t pad95[3];
        dummyFunc_t gap98;
        bool Init98;
        uint8_t pad9d[3];
        dummyFunc_t setHp;
        bool Inita0;
        uint8_t pada5[3];
        dummyFunc_t setHP2;
        bool Inita8;
        uint8_t padad[3];
        dummyFunc_t updateHitbox;
        bool Initb0;
        uint8_t padb5[3];
        dummyFunc_t gapb8;
        bool Initb8;
        uint8_t padbd[3];
        dummyFunc_t dispose;
        bool Initc0;
        uint8_t padc5[3];
        dummyFunc_t gapc8;
        bool Initc8;
        uint8_t padcd[3];
        dummyFunc_t deathReact;
        bool Initd0;
        uint8_t padd5[3];
        dummyFunc_t escape;
        bool Initd8;
        uint8_t paddd[3];
        dummyFunc_t die;
        bool Inite0;
        uint8_t pade5[3];
        dummyFunc_t die2;
        bool Inite8;
        uint8_t paded[3];
        dummyFunc_t usePreBattleAction;
        bool Initf0;
        uint8_t padf5[3];
        dummyFunc_t useUniversalPreBattleAction;
        bool Initf8;
        uint8_t padfd[3];
        dummyFunc_t applyPowers;
        bool Init100;
        uint8_t pad105[3];
        dummyFunc_t removeSurroundedPower;
        bool Init108;
        uint8_t pad10d[3];
        dummyFunc_t changeState;
        bool Init110;
        uint8_t pad115[3];
        dummyFunc_t addToBot;
        bool Init118;
        uint8_t pad11d[3];
        dummyFunc_t addToTop;
        bool Init120;
        uint8_t pad125[3];
        dummyFunc_t onBossVictoryLogic;
        bool Init128;
        uint8_t pad12d[3];
        dummyFunc_t onFinalBossVictoryLogic;
        bool Init130;
        uint8_t pad135[3];
        dummyFunc_t gap138;
        bool Init138;
        uint8_t pad13d[3];
        dummyFunc_t IntentBaseDmg;
        bool Init140;
        uint8_t pad145[3];
        dummyFunc_t gap148;
        bool Init148;
        uint8_t pad14d[3];
    } __attribute__((aligned(4)));

    struct AbstractMonster : public AbstractCreature
    {
        float deathTimer;
        GDX::Graphics::Color *nameColor;
        GDX::Graphics::Color *nameBgColor;
        GDX::Graphics::Texture *img;
        bool tintFadeOutCalled;
        uint8_t pad11[3];
        void *moveSet;
        bool escaped;
        bool escapeNext;
        uint8_t pad1A[2];
        PowerTip *intentTip;
        EnemyType type;
        float hoverTimer;
        bool cannotEscape;
        uint8_t pad2A[3];
        ArrayList<DamageInfo> *damage;
        void *move;
        float intentParticleTimer;
        float intentAngle;
        ArrayList<uint8_t> *moveHistory;
        //AbstractGameEffect
        ArrayList<void*> *intentVfx;
        bool nextMove;
        uint8_t pad45[3];
        void *bobEffect;
        void *intentHb;
        void *intent;
        void *tipIntent;
        float intentAlpha;
        float intentAlphaTarget;
        float intentOffsetX;
        GDX::Graphics::Texture *intentImg;
        GDX::Graphics::Texture *intentBg;
        int32_t intentDmg;
        int32_t intentBaseDmg;
        int32_t intentMultiAmt;
        bool isMultiDmg;
        uint8_t pad7A[3];
        GDX::Graphics::Color *intentColor;
        JString *moveName;
        void *disposables;
    } __attribute__((aligned(4)));
    
    struct AbstractGameActionVFuncMap
    {
        void *baseClassPtr;
        void *vFuncMap;
        uint8_t unk[24];
        dummyFunc_t setValues;
        bool byte24;
        uint8_t gap25[3];
        dummyFunc_t setValues2;
        bool byte2C;
        uint8_t gap2D[3];
        dummyFunc_t setValues3;
        bool byte34;
        uint8_t gap35[3];
        dummyFunc_t isDeadOrEscaped;
        bool InitisDeadOrEscaped;
        uint8_t gap3D[3];
        dummyFunc_t addToBot;
        bool byte44;
        bool gap45[3];
        dummyFunc_t addToTop;
        bool byte4C;
        bool gap4D[3];
        dummyFunc_t update;
        bool Initupdate;
        uint8_t gap55[3];
        dummyFunc_t tickDuration;
        bool byte5C;
        uint8_t gap5D[3];
        dummyFunc_t shouldCancelAction;
        bool byte64;
    } __attribute__((aligned(4)));


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
    } __attribute__((aligned(4)));

    struct DeriveGameAction : public AbstractGameAction
    {

    } __attribute__((aligned(4)));

    //see System::Internal::__CreateRuntimeType<AbstractCard *>()
    //offset 0x25EA5C0
    struct AbstractCardVFuncMap
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
        bool Iupgrade;
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
        uint8_t gapF8[436];
        dummyFunc_t addToBot;
        bool InitaddToBot;
        uint8_t pad2FD[3];
        dummyFunc_t addToTop;
        bool InitaddToTop;
        uint8_t pad305[3];
        uint8_t gap308[48];
        dummyFunc_t makeCopyFunc;
        bool InitmakeCopyFunc;
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
        GDX::Graphics::Color * glowColor;
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
        dummyFunc_t flash;
        bool Initflash;
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
        uint8_t gap2E5[3];
        dummyFunc_t makeCopy;
        bool byte2EC;
        uint8_t gap2ED[3];
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
        JObjArr<JString> *DESCRIPTIONS;
        bool energyBased;
        bool usedUp;
        bool grayscale;
        uint8_t pad1B;
        JString *description;
        JString *flavorText;
        int32_t cost;
        int32_t counter;
        RelicTier tier;
        ArrayList<PowerTip> *tips;
        void *img;
        void *largeImg;
        void *outlineImg;
        JString *imgUrl;
        float currentX;
        float currentY;
        float targetX;
        float targetY;
        GDX::Graphics::Color *flashColor;
        GDX::Graphics::Color *goldOutlineColor;
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

    struct AbstractPotionVFuncMap
    {
        void *baseClassPtr;
        void *vFuncMap;
        uint8_t gap08[24];
        dummyFunc_t flash;
        bool byte24;
        bool gap25[3];
        dummyFunc_t dword28;
        bool byte2C;
        bool gap2D[3];
        dummyFunc_t dword30;
        bool byte34;
        bool gap35[3];
        dummyFunc_t getPrice;
        bool byte3C;
        bool gap3D[3];
        dummyFunc_t use;
        bool Inituse;
        bool byte45;
        dummyFunc_t canDiscard;
        bool byte4C;
        bool gap4D[3];
        dummyFunc_t initializeData;
        bool byte54;
        bool gap55[3];
        dummyFunc_t canUse;
        bool byte5C;
        bool gap5D[3];
        dummyFunc_t dword60;
        bool byte64;
        bool gap65[3];
        dummyFunc_t dword68;
        bool byte6C;
        bool gap6D[3];
        dummyFunc_t dword70;
        bool byte74;
        bool gap75[3];
        dummyFunc_t dword78;
        bool byte7C;
        bool gap7D[3];
        dummyFunc_t dword80;
        bool byte84;
        bool gap85[3];
        dummyFunc_t dword88;
        bool byte8C;
        bool gap8D[3];
        dummyFunc_t dword90;
        bool byte94;
        bool gap95[3];
        dummyFunc_t dword98;
        bool byte9C;
        bool gap9D[3];
        dummyFunc_t dwordA0;
        bool byteA4;
        bool gapA5[3];
        dummyFunc_t dwordA8;
        bool byteAC;
        bool gapAD[3];
        dummyFunc_t getPotencyVoid;
        bool InitgetPotency;
        bool gapB5[3];
        dummyFunc_t getPotency;
        bool byteBC;
        bool gapBD[3];
        dummyFunc_t onPlayerDeath;
        bool InitonPlayerDeath;
        uint8_t gapC5[3];
        dummyFunc_t addToBot;
        bool byteCC;
        bool gapCD[3];
        dummyFunc_t addToTop;
        bool byteD4;
        uint8_t unk[16];
    } __attribute__((aligned(4)));


    struct AbstractPotion
    {
        void *baseClassPtr;
        void *vFuncMap;
        JString * potionId;
        JString * name;
        JString * description;
        int32_t slot;
        ArrayList<void *> *tips;
        void * containerImg;
        void * liquidImg;
        void * hybridImg;
        void * spotsImg;
        void * outlineImg;
        float posX;
        float posY;
        GDX::Graphics::Color * labOutlineColor;
        ArrayList<void *> effect;
        float scale;
        bool isObtained;
        uint8_t pad45[3];
        float sparkleTimer;
        int32_t flashCount;
        float flashTimer;
        PotionEffect p_effect;
        PotionColor color;
        GDX::Graphics::Color * liquidColor;
        GDX::Graphics::Color * hybridColor;
        GDX::Graphics::Color * spotsColor;
        PotionRarity rarity;
        PotionSize size;
        int32_t potency;
        void * hb;
        float angle;
        bool canUse;
        bool discarded;
        bool isThrown;
        bool targetRequired;
    } __attribute__((aligned(4)));

    struct __attribute__((aligned(4))) AbstractPowerVFuncMap
    {
        void *baseClassPtr;
        void *vFuncMap;
        uint8_t unk[24];
        dummyFunc_t loadRegion;
        bool byte24;
        uint8_t gap25[3];
        dummyFunc_t playApplyPowerSfx;
        bool byte2C;
        uint8_t gap2D[3];
        dummyFunc_t updateParticles;
        bool byte34;
        uint8_t gap35[3];
        dummyFunc_t update;
        bool byte3C;
        uint8_t gap3D[3];
        dummyFunc_t addToBot;
        bool byte44;
        uint8_t gap45[3];
        dummyFunc_t addToTop;
        bool byte4C;
        uint8_t gap4D[3];
        dummyFunc_t updateDescription;
        bool byte54;
        uint8_t gap55[3];
        dummyFunc_t stackPower;
        bool byte5C;
        uint8_t gap5D[3];
        dummyFunc_t reducePower;
        bool byte64;
        uint8_t gap65[11];
        dummyFunc_t dword70;
        bool byte74;
        uint8_t gap75[3];
        dummyFunc_t dword78;
        bool byte7C;
        uint8_t gap7D[3];
        dummyFunc_t atDamageGive;
        bool byte84;
        uint8_t gap85[3];
        dummyFunc_t atDamageFinalGive;
        bool byte8C;
        uint8_t gap8D[3];
        dummyFunc_t atDamageFinalReceive;
        bool byte94;
        uint8_t gap95[3];
        dummyFunc_t atDamageReceive;
        bool byte9C;
        uint8_t gap9D[3];
        dummyFunc_t atDamageGive2;
        bool byteA4;
        uint8_t gapA5[3];
        dummyFunc_t atDamageFinalGive2;
        bool byteAC;
        uint8_t gapAD[3];
        dummyFunc_t atDamageFinalReceive2;
        bool byteB4;
        uint8_t gapB5[3];
        dummyFunc_t atDamageReceive2;
        bool byteBC;
        uint8_t gapBD[3];
        dummyFunc_t atStartOfTurn;
        bool byteC4;
        uint8_t gapC5[3];
        dummyFunc_t duringTurn;
        bool byteCC;
        uint8_t gapCD[3];
        dummyFunc_t atStartOfTurnPostDraw;
        bool byteD4;
        uint8_t gapD5[3];
        dummyFunc_t atEndOfTurn;
        bool byteDC;
        uint8_t gapDD[3];
        dummyFunc_t atEndOfTurnPreEndTurnCards;
        bool byteE4;
        uint8_t gapE5[3];
        dummyFunc_t atEndOfRound;
        bool byteEC;
        uint8_t gapED[3];
        dummyFunc_t onScry;
        bool byteF4;
        uint8_t gapF5[3];
        dummyFunc_t onDamageAllEnemies;
        bool byteFC;
        uint8_t gapFD[3];
        dummyFunc_t onHeal;
        bool byte104;
        uint8_t gap105[3];
        dummyFunc_t onAttacked;
        bool byte10C;
        uint8_t gap10D[3];
        dummyFunc_t onAttack;
        bool byte114;
        uint8_t gap115[3];
        dummyFunc_t onAttackedToChangeDamage;
        bool byte11C;
        uint8_t gap11D[3];
        dummyFunc_t onAttackToChangeDamage;
        bool byte124;
        uint8_t gap125[3];
        dummyFunc_t onInflictDamage;
        bool byte12C;
        uint8_t gap12D[11];
        dummyFunc_t onCardDraw;
        bool byte13C;
        uint8_t gap13D[3];
        dummyFunc_t onPlayCard;
        bool byte144;
        uint8_t gap145[3];
        dummyFunc_t onUseCard;
        bool byte14C;
        uint8_t gap14D[3];
        dummyFunc_t onAfterUseCard;
        bool byte154;
        uint8_t gap155[3];
        dummyFunc_t wasHPLost;
        bool byte15C;
        uint8_t gap15D[3];
        dummyFunc_t onSpecificTrigger;
        bool byte164;
        uint8_t gap165[3];
        dummyFunc_t triggerMarks;
        bool byte16C;
        uint8_t gap16D[3];
        dummyFunc_t onDeath;
        bool byte174;
        uint8_t gap175[3];
        dummyFunc_t onChannel;
        bool byte17C;
        uint8_t gap17D[3];
        dummyFunc_t atEnergyGain;
        bool byte184;
        uint8_t gap185[3];
        dummyFunc_t onExhaust;
        bool byte18C;
        uint8_t gap18D[3];
        dummyFunc_t onChangeStance;
        bool byte194;
        uint8_t gap195[3];
        dummyFunc_t modifyBlock;
        bool byte19C;
        uint8_t gap19D[3];
        dummyFunc_t modifyBlock2;
        bool byte1A4;
        uint8_t gap1A5[3];
        dummyFunc_t onGainedBlock;
        bool byte1AC;
        uint8_t gap1AD[3];
        dummyFunc_t onPlayerGainedBlock;
        bool byte1B4;
        uint8_t gap1B5[19];
        dummyFunc_t onRemove;
        bool byte1CC;
        uint8_t gap1CD[3];
        dummyFunc_t onEnergyRecharge;
        bool byte1D4;
        uint8_t gap1D5[3];
        dummyFunc_t onDrawOrDiscard;
        bool byte1DC;
        uint8_t gap1DD[3];
        dummyFunc_t onAfterCardPlayed;
        bool byte1E4;
        uint8_t gap1E5[3];
        dummyFunc_t onInitialApplication;
        bool byte1EC;
        uint8_t gap1ED[3];
        dummyFunc_t dword1F0;
        bool byte1F4;
        uint8_t gap1F5[3];
        dummyFunc_t flash;
        bool byte1FC;
        uint8_t gap1FD[3];
        dummyFunc_t flashWithoutSound;
        bool byte204;
        uint8_t gap205[3];
        dummyFunc_t onApplyPower;
        bool byte20C;
        uint8_t gap20D[3];
        dummyFunc_t onLoseHp;
        bool byte214;
        uint8_t gap215[3];
        dummyFunc_t onVictory;
        bool byte21C;
        uint8_t gap21D[3];
        dummyFunc_t canPlayCard;
        bool byte224;
        uint8_t  gap225[3];
        dummyFunc_t dword228;
        bool byte22C;
        uint8_t  gap22D[3];
    };


    struct AbstractPower
    {
        void *baseClassPtr;
        void *vFuncMap;
        void *region48;
        void *region128;
        float fontScale;
        void *color;
        void *redColor;
        void *greenColor;
        void *effect;
        AbstractCreature *owner;
        JString *name;
        JString *description;
        JString *ID;
        void *img;
        int32_t amount;
        int32_t priority;
        PowerType type;
        bool isTurnBased;
        bool isPostActionPower;
        bool canGoNegative;
        uint8_t gap47;
    } __attribute__((aligned(4)));

}


#endif //BASE_STSTYPES_H
