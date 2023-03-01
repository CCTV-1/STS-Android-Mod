1. 从Google Play搜索`com.humble.SlayTheSpire`下载游戏。
2. 从与架构匹配的`base.apk/lib/armeabi-v7a/`下提取`libSpire_ANDROID.so`，然后从[Frida官方仓库](https://github.com/frida/frida/releases)下载对应ABI的`frida-gadget.so`。
3. 使用[脚本](InjectFridaGadget.py)注入`Frida-Gadget`的so。
4. 将生成的`libSpire_ANDROID.so.mod`改名为`libSpire_ANDROID.so`后替换原文件。
5. 然后将`libfrida-gadget.so`和`libfrida-gadget.config.so`（其实是个json文件）也放到`base.apk/lib/armeabi-v7a/`里。
6. 然后签名，安装，运行一次让APP生成`/sdcard/Android/data/com.humble.SlayTheSpire/files`文件夹。
7. 再将`frida`脚本放于`libfrida-gadget.config.so`指定的目录下即可(若要调试可参考[Frida官方文档](https://frida.re/docs/gadget/#listen)修改配置文件)。
