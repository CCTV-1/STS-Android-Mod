# Mod内容
| 牌张       |  变更     |
| ---------- | -----------|
| 打击_红   | 伤害提升1点                                        |
| 防御_红   | 防御提升1点                                        |
| 狂宴      | 永久获得生命提升1点                                |
| 痛击      | 基础伤害提升至12                                   |
| 灼热攻击  | 现在额外具有使用时获得等同于其等级的生命值       |
| 重刃      | 力量倍数提升3                                      |
| 金刚臂    | 费用降低为1费，基础伤害调整为6                    |
| 完美打击  | 每张"打击"牌的伤害提升倍率增加2                   |
| 恶魔形态  | 现在施放恶魔形态时，额外具有下一张攻击牌耗能为0 |
| 闪电霹雳  | 现在升级后施放效果会再产生一次                   |
| 阿尔法    | 现在直接生成欧米伽                                |

| 遗物      |  变更 |
| ----------- | ----------- |
| 战士的初始遗物以及升级版  | 额外具有战斗后若生命值少于最大值的40/60%则随机升级一张牌  |
| 生姜  | 现在额外具有：若你同时拥有萝卜则在战斗开始时，进入角色对应的形态(未升级)  |
| 神圣树皮  | 现在额外具有：拾取时，获得2个药水栏位 |
| 黄金眼    | 现在额外具有：若增幅后预见数大于等于5，则获得一点能量 |
| 咖啡滤杯  | 现在额外具有：每当你进入休息处时，咖啡滤杯获得一个指示物。然后你获得等同于其上指示物数量的生命    |
| 天鹅绒颈圈    | 打出牌张限制由6提升至10   |
| 痛楚印记  | 现在生成的是灼伤而不是伤口，且直接置于你的手牌    |
| 符文金字塔    | 现在额外拥有回合结束时尽可能弃3张然后抓等量的牌   |


| 其他      |  变更 |
| ----------- | ----------- |
| 战斗胜利后选牌数 | 由3增加至4                           |
| 混乱能力          | 现在随机范围为[0, min(3, cost + 1)] |
| 初始套牌          | 四个角色的初始套牌调整              |

# 修改/添加图片
1. 解压(ZIP)`/storage/emulated/0/Android/obb/com.humble.SlayTheSpire/main.2.com.humble.SlayTheSpire.obb`。
2. `npm install texture-compressor`。
3. `node .\node_modules\texture-compressor\bin\texture-compressor.js -i .\input.png -t etc -c ETC2_RGBA -q etcfastperceptual -o .\output.ktx -y -m -vb`（2.2.8版本的obb文件中，通过十六进制编辑器可以确定，图片的实际格式是[KTX1.0](https://registry.khronos.org/KTX/specs/1.0/ktxspec.v1.html)）。
4. 将`ktx`后缀改为`png`放于解压后的obb的文件夹对应路径里。
5. 压缩(ZIP)`/storage/emulated/0/Android/obb/com.humble.SlayTheSpire/main.2.com.humble.SlayTheSpire.obb`，替换原文件。

# 构建

1. 从Google Play搜索`com.humble.SlayTheSpire`下载游戏。
2. 从与架构匹配的`base.apk/lib/armeabi-v7a/`下提取`libSpire_ANDROID.so`，然后从[Frida官方仓库](https://github.com/frida/frida/releases)下载对应ABI的`frida-gadget.so`。
3. 使用[脚本](InjectFridaGadget.py)注入`Frida-Gadget`的so。
4. 将生成的`libSpire_ANDROID.so.mod`改名为`libSpire_ANDROID.so`后替换原文件。
5. 然后将`libfrida-gadget.so`和`libfrida-gadget.config.so`（其实是个json文件）也放到`base.apk/lib/armeabi-v7a/`里。
6. 然后签名，安装，运行一次让APP生成`/sdcard/Android/data/com.humble.SlayTheSpire/files`文件夹。
7. 使用`npm install`生成脚本文件`main.js`。
8. 再将`main.js`文件放于`libfrida-gadget.config.so`指定的目录下即可(手机USB连接电脑后使用`frida -U gadget -f com.humble.SlayTheSpire`进行调试)。