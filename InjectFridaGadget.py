import lief

libnative = lief.parse("libSpire_ANDROID.so")
libnative.add_library("libfrida-gadget.so")
libnative.write("libSpire_ANDROID.so.mod")