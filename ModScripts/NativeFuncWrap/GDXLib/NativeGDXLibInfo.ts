import { NativeFunctionInfo } from "../NativeFunctionInfo.js";

export const NativeGDXLibInfo = {
    files: {
        FileHandle: {
            /**
             * ```c
             * FileHandle* GDX::Files::FileHandle::Ctor(FileHandle* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x15DDB79, 'pointer', ['pointer']),
            /**
             * ```c
             * FileHandle* GDX::Files::FileHandle::Ctor(FileHandle* thisPtr, JString * fileName, GDX::FileType type)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x15DDBF9, 'pointer', ['pointer', 'pointer', 'uint32']),
            /**
             * ```c
             * FileHandle* GDX::Files::FileHandle::Ctor(FileHandle* thisPtr, JavaFileHandle * fileHandle, GDX::FileType type)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x15DDC89, 'pointer', ['pointer', 'pointer', 'uint32']),
            /**
             * ```c
             * FileHandle* GDX::Files::FileHandle::child(FileHandle* thisPtr, JString * name)
             * ```
             */
            child: new NativeFunctionInfo(0x15DEAB9, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * bool GDX::Files::FileHandle::exists(FileHandle* thisPtr)
             * ```
             */
            exists: new NativeFunctionInfo(0x15DECED, 'bool', ['pointer']),
            /**
             * ```c
             * JString* GDX::Files::FileHandle::exists(FileHandle* thisPtr)
             * ```
             */
            extension: new NativeFunctionInfo(0x15DDDB5, 'pointer', ['pointer']),
            /**
             * ```c
             * JavaFileHandle* GDX::Files::FileHandle::file(FileHandle* thisPtr)
             * ```
             */
            file: new NativeFunctionInfo(0x15DDF89, 'pointer', ['pointer']),
            /**
             * ```c
             * int64_t GDX::Files::FileHandle::file(FileHandle* thisPtr)
             * ```
             */
            length: new NativeFunctionInfo(0x15DEDDD, 'int64', ['pointer']),
            /**
             * ```c
             * JString* GDX::Files::path::exists(FileHandle* thisPtr)
             * ```
             */
            path: new NativeFunctionInfo(0x15DDD11, 'pointer', ['pointer']),
        },
    },
    graphics: {
        Color: {
            /**
             * ```c
             * Color* GDX::Graphics::Color::Ctor(Color* thisPtr)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x15DF411, 'pointer', ['pointer']),
            /**
             * ```c
             * Color* GDX::Graphics::Color::Ctor(Color* thisPtr, Color* source)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x15DF76D, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * Color* GDX::Graphics::Color::Ctor(Color* thisPtr, float r, float g, float b, float a)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x15DF675, 'pointer', ['pointer', 'float', 'float', 'float', 'float']),
            /**
             * ```c
             * Color* GDX::Graphics::Color::Ctor(Color* thisPtr, uint rgba)
             * ```
             * 
             * ```c
             * struct rgba
             * {
             *  //[0,255]
             *  uint8_t r,
             *  //[0,255]
             *  uint8_t g,
             *  //[0,255]
             *  uint8_t b,
             *  //[0,255]
             *  uint8_t a,
             * };
             * ```
             */
            Ctor4: new NativeFunctionInfo(0x2753531, 'pointer', ['pointer', 'uint32']),
        },
        G2D: {
            TextureAtlas: {
                /**
                 * ```c
                 * TextureAtlas* GDX::Graphics::G2D::TextureAtlas::Ctor(TextureAtlas* thisPtr)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x15FF3CD, 'pointer', ['pointer']),
                /**
                 * ```c
                 * TextureAtlas* GDX::Graphics::G2D::TextureAtlas::Ctor(TextureAtlas* thisPtr, GDX::Files::FileHandle * packFile)
                 * ```
                 */
                Ctor2: new NativeFunctionInfo(0x15FF651, 'pointer', ['pointer', 'pointer']),
                /**
                 * ```c
                 * TextureAtlas* GDX::Graphics::G2D::TextureAtlas::Ctor(TextureAtlas* thisPtr, GDX::Files::FileHandle * packFile,
                 *      GDX::Files::FileHandle *imagesDir)
                 * ```
                 */
                Ctor3: new NativeFunctionInfo(0x15FF73D, 'pointer', ['pointer', 'pointer', 'pointer']),
                /**
                 * ```c
                 * TextureAtlas* GDX::Graphics::G2D::TextureAtlas::Ctor(TextureAtlas* thisPtr, GDX::Files::FileHandle * packFile,
                 *      GDX::Files::FileHandle *imagesDir, bool flip)
                 * ```
                 */
                Ctor4: new NativeFunctionInfo(0x15FF7ED, 'pointer', ['pointer', 'pointer', 'pointer', 'bool']),
                /**
                 * ```c
                 * TextureAtlas::AtlasRegion* GDX::Graphics::G2D::TextureAtlas::findRegion(TextureAtlas* thisPtr, JString * name)
                 * ```
                 */
                findRegion: new NativeFunctionInfo(0x16004E5, 'pointer', ['pointer', 'pointer']),
            },
            TextureRegion: {
                /**
                 * ```c
                 * TextureRegion* GDX::Graphics::G2d::TextureRegion::Ctor(TextureRegion* thisPtr, GDX::Graphics::Texture* texturePtr)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x1602F5D, 'pointer', ['pointer', 'pointer']),
                /**
                 * ```c
                 * TextureRegion* GDX::Graphics::G2d::TextureRegion::Ctor(TextureRegion* thisPtr, GDX::Graphics::Texture* texturePtr,
                 *      int32_t x, int32_t y, int32_t width, int32_t height)
                 * ```
                 */
                Ctor2: new NativeFunctionInfo(0x1603069, 'pointer', ['pointer', 'pointer', 'int32', 'int32', 'int32', 'int32']),
                /**
                 * ```c
                 * void GDX::Graphics::G2d::TextureRegion::setRegion(TextureRegion* thisPtr
                 *      float u, float v, float u2, float v2)
                 * ```
                 */
                setRegion: new NativeFunctionInfo(0x1603239, 'void', ['pointer', 'float', 'float', 'float', 'float']),
                /**
                 * ```c
                 * void GDX::Graphics::G2d::TextureRegion::setRegion(TextureRegion* thisPtr
                 *      int32_t x, int32_t y, int32_t width, int32_t height)
                 * ```
                 */
                setRegion2: new NativeFunctionInfo(0x1603111, 'void', ['pointer', 'int32', 'int32', 'int32', 'int32']),
            },
        },
        PixMap: {
            /**
             * ```c
             * PixMap* GDX::Graphics::PixMap::Ctor(PixMap* thisPtr, GDX::Files::FileHandle* fileHandle)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x161C065, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * PixMap* GDX::Graphics::PixMap::Ctor(PixMap* thisPtr, int32_t width, int32_t height, GDXPixMapFormat format)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x161BF65, 'pointer', ['pointer', 'int32', 'int32', 'uint32']),
        },
        Texture: {
            /**
             * ```c
             * Texture* GDX::Graphics::Texture::Ctor(Texture* thisPtr, JString* internalPath)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x161E3DD, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * Texture* GDX::Graphics::Texture::Ctor(Texture* thisPtr, GDX::Files::FileHandle* fileHandle)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x161E535, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * Texture* GDX::Graphics::Texture::Ctor(Texture* thisPtr, GDX::Files::FileHandle* fileHandle, bool useMipMaps)
             * ```
             */
            Ctor3: new NativeFunctionInfo(0x161E69D, 'pointer', ['pointer', 'pointer', 'bool']),
            /**
             * ```c
             * Texture* GDX::Graphics::Texture::Ctor(Texture* thisPtr, GDX::Files::FileHandle* fileHandle, GDX::PixMapFormat format, bool useMipMaps)
             * ```
             */
            Ctor4: new NativeFunctionInfo(0x161E5E1, 'pointer', ['pointer', 'pointer', 'uint32', 'bool']),
        },
    },
    utils: {
        RuntimeException: {
            /**
             * ```c
             * GDXRuntimeException* GDX::Utils::RuntimeException::Ctor(GDXRuntimeException *thisPtr, JString* message)
             * ```
             */
            Ctor: new NativeFunctionInfo(0x1640981, 'pointer', ['pointer', 'pointer']),
            /**
             * ```c
             * GDXRuntimeException* GDX::Utils::RuntimeException::Ctor(GDXRuntimeException *thisPtr, JString* message, JException* exceptPtr)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x1640A05, 'pointer', ['pointer', 'pointer', 'pointer']),
        },
    },
};