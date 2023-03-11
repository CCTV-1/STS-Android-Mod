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