export enum CardTarget {
    ENEMY = 0x0,
    ALL_ENEMY = 0x1,
    SELF = 0x2,
    NONE = 0x3,
    SELF_AND_ENEMY = 0x4,
    ALL = 0x5,
};

export enum DamageType {
    NORMAL = 0x0,
    THORNS = 0x1,
    HP_LOSS = 0x2,
};

export enum CardType {
    ATTACK = 0x0,
    SKILL = 0x1,
    POWER = 0x2,
    STATUS = 0x3,
    CURSE = 0x4,
};

export enum CardRarity {
    BASIC = 0,
    SPECIAL,
    COMMON,
    UNCOMMON,
    RARE,
    CURSE,
};

export enum CardTags {
    HEALING = 0x0,
    STRIKE,
    EMPTY,
    STARTER_DEFEND,
    STARTER_STRIKE
};

export enum CardColor {
    RED = 0,
    GREEN,
    BLUE,
    PURPLE,
    COLORLESS,
    CURSE,
};

export enum ActionType {
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

export enum AttackEffect {
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

export enum CardGroupType {
    DRAW_PILE = 0,
    MASTER_DECK,
    HAND,
    DISCARD_PILE,
    EXHAUST_PILE,
    CARD_POOL,
    UNSPECIFIED
};

export enum RelicTier {
    DEPRECATED = 0x0,
    STARTER = 0x1,
    COMMON = 0x2,
    UNCOMMON = 0x3,
    RARE = 0x4,
    SPECIAL = 0x5,
    BOSS = 0x6,
    SHOP = 0x7,
};

export enum LandingSound {
    CLINK = 0x0,
    FLAT,
    HEAVY,
    MAGICAL,
    SOLID
};

export enum PlayerClass {
    IRONCLAD = 0x0,
    THE_SILENT = 0x1,
    DEFECT = 0x2,
    WATCHER = 0x3,
};

export enum PotionEffect {
    NONE = 0x0,
    RAINBOW,
    OSCILLATE
};

export enum PotionColor {
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

export enum PotionRarity {
    PLACEHOLDER = 0x0,
    COMMON,
    UNCOMMON,
    RARE
};

export enum PotionSize {
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

export enum MonsterIntent {
    ATTACK = 0x0,
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

export enum EnemyType {
    NORMAL = 0x0, 
    ELITE, 
    BOSS,
};

export enum PowerType {
    BUFF = 0x0,
    DEBUFF
};

export enum GDXFileType {
    Classpath = 0x0,
    Internal,
    External,
    Absolute,
    Local,
};

export enum GDXPixMapFormat {
    Alpha = 0x0,
    Intensity,
    LuminanceAlpha,
    RGB565,
    RGBA4444,
    RGB888,
    RGBA8888
};

export enum RoomPhase
{
    COMBAT = 0x0,
    EVENT, 
    COMPLETE, 
    INCOMPLETE
};

export enum RoomType
{
    SHOP = 0x1, 
    MONSTER, 
    SHRINE, 
    TREASURE, 
    EVENT, 
    BOSS
};