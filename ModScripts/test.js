'use strict';

console.log("Waiting for Java..");

Java.perform(function () {
    var Log = Java.use("android.util.Log");
    Log.v("frida-lief", "Have fun!");
});