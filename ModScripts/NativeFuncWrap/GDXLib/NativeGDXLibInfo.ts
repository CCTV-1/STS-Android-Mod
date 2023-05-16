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
             * JString* GDX::Files::FileHandle::exists(FileHandle* thisPtr)
             * ```
             */
            path: new NativeFunctionInfo(0x15DDD11, 'pointer', ['pointer']),
            /**
             * ```c
             * JObjectArray<byte>* GDX::Files::FileHandle::readBytes(FileHandle* thisPtr)
             * ```
             */
            readBytes: new NativeFunctionInfo(0x15DE991, 'pointer', ['pointer']),
            /**
             * ```c
             * InputStream* GDX::Files::FileHandle::read(FileHandle* thisPtr)
             * ```
             */
            read: new NativeFunctionInfo(0x15DE059, 'pointer', ['pointer']),
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
            G2DPixmap: {
                /**
                 * ```c
                 * G2DPixmap* GDX::Graphics::G2D::2DPixmap::Ctor(G2DPixmap* thisPtr, JObjectArray<byte> encodedData, int32_t offset,
                 *      int32_t len, int32_t requestedFormat)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x15EF565, 'pointer', ['pointer', 'pointer', 'int32', 'int32', 'int32']),
                /**
                 * ```c
                 * G2DPixmap* GDX::Graphics::G2D::2DPixmap::Ctor(G2DPixmap* thisPtr, int32_t width, int32_t height, int32_t format)
                 * ```
                 */
                Ctor2: new NativeFunctionInfo(0x15EF99D, 'pointer', ['pointer', 'int32', 'int32', 'int32']),
                /**
                 * ```c
                 * void GDX::Graphics::G2D::2DPixmap::dispose(G2DPixmap* thisPtr)
                 * ```
                 */
                dispose: new NativeFunctionInfo(0x15EFCF9, 'void', ['pointer']),
            },
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
            SpriteBatch: {
                /**
                 * ```c
                 * SpriteBatch* GDX::Graphics::g2d::SpriteBatch::Ctor(SpriteBatch* thisPtr)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x15FC049, 'pointer', ['pointer']),
                /**
                 * ```c
                 * SpriteBatch* GDX::Graphics::g2d::SpriteBatch::Ctor(SpriteBatch* thisPtr, int size, gdx::graphics::glutils::ShaderProgram* defaultShader)
                 * ```
                 */
                Ctor2: new NativeFunctionInfo(0x15FC0F5, 'pointer', ['pointer', 'int32', 'pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::begin(SpriteBatch* thisPtr)
                 * ```
                 */
                begin: new NativeFunctionInfo(0x15FCAE1, 'void', ['pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::end(SpriteBatch* thisPtr)
                 * ```
                 */
                end: new NativeFunctionInfo(0x15FCD81, 'void', ['pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::setColor(SpriteBatch* thisPtr, float r, float g, float b, float a)
                 * ```
                 */
                setColor: new NativeFunctionInfo(0x15FD065, 'void', ['pointer', 'float', 'float', 'float', 'float']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::setColor(SpriteBatch* thisPtr, GDX::Graphics::Color* color)
                 * ```
                 */
                setColor2: new NativeFunctionInfo(0x15FCD81, 'void', ['pointer', 'pointer']),
                /**
                 * ```c
                 * GDX::Graphics::Color* GDX::Graphics::g2d::SpriteBatch::getColor(SpriteBatch* thisPtr)
                 * ```
                 */
                getColor: new NativeFunctionInfo(0x15FCFAD, 'pointer', ['pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::draw(SpriteBatch* thisPtr, gdx::graphics::Texture * texturePtr,
                 * System::Array<Float,1>* spriteVertices, int32_t offset, int32_t count)
                 * ```
                 */
                draw: new NativeFunctionInfo(0x15FE169, 'void', ['pointer', 'pointer', 'pointer', 'int32', 'int32']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::draw(SpriteBatch* thisPtr, gdx::graphics::Texture * texturePtr,
                 * float x, float y, float width, float height)
                 * ```
                 */
                draw2: new NativeFunctionInfo(0x15FDCA1, 'void', ['pointer', 'pointer', 'float', 'float', 'float', 'float']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::draw(SpriteBatch* thisPtr, gdx::graphics::Texture * texturePtr,
                 * float x, float y, float originX, float originY, float width, float height, float scaleX, float scaleY, float rotation,
                 * int srcX, int srcY, int srcWidth, int srcHeight, bool flipX, bool flipY)
                 * ```
                 */
                draw3: new NativeFunctionInfo(0x15FD0E1, 'void', ['pointer', 'pointer', 'float', 'float', 'float', 'float', 'float', 'float',
                    'float', 'float', 'float', 'int32', 'int32', 'int32', 'int32', 'bool', 'bool']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::draw(SpriteBatch* thisPtr, gdx::graphics::Texture * texturePtr,
                 * float x, float y, float width, float height, int srcX, int srcY, int srcWidth, int srcHeight, bool flipX, bool flipY)
                 * ```
                 */
                draw4: new NativeFunctionInfo(0x15FD759, 'void', ['pointer', 'pointer', 'float', 'float', 'float', 'float', 'int32', 'int32', 'int32', 'int32', 'bool', 'bool']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::draw(SpriteBatch* thisPtr, gdx::graphics::TextureRegion * regionPtr,
                 * float x, float y, float width, float height)
                 * ```
                 */
                draw5: new NativeFunctionInfo(0x15FE2C9, 'void', ['pointer', 'pointer', 'float', 'float', 'float', 'float']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::draw(SpriteBatch* thisPtr, gdx::graphics::TextureRegion * regionPtr,
                 * float x, float y, float originX, float originY, float width, float height, float scaleX, float scaleY, float rotation)
                 * ```
                 */
                draw6: new NativeFunctionInfo(0x15FE2C9, 'void', ['pointer', 'pointer', 'float', 'float', 'float', 'float', 'float', 'float',
                    'float', 'float', 'float']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::flush(SpriteBatch* thisPtr)
                 * ```
                 */
                flush: new NativeFunctionInfo(0x15FEDA1, 'void', ['pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::setBlendFunction(SpriteBatch* thisPtr, int32_t srcFunc, int32_t dstFunc)
                 * ```
                 */
                setBlendFunction: new NativeFunctionInfo(0x15FF0A5, 'void', ['pointer', 'int32', 'int32']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::dispose(SpriteBatch* thisPtr)
                 * ```
                 */
                dispose: new NativeFunctionInfo(0x15FF0E5, 'void', ['pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::setProjectionMatrix(SpriteBatch* thisPtr, gdx::math::Matrix4 * projection)
                 * ```
                 */
                setProjectionMatrix: new NativeFunctionInfo(0x15FF151, 'void', ['pointer', 'pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::setTransformMatrix(SpriteBatch* thisPtr, gdx::math::Matrix4 * transform)
                 * ```
                 */
                setTransformMatrix: new NativeFunctionInfo(0x15FF1C5, 'void', ['pointer', 'pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::setupMatrices(SpriteBatch* thisPtr)
                 * ```
                 */
                setupMatrices: new NativeFunctionInfo(0x15FCC29, 'void', ['pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::switchTexture(SpriteBatch* thisPtr, gdx::graphics::Texture * texture)
                 * ```
                 */
                switchTexture: new NativeFunctionInfo(0x15FF239, 'void', ['pointer', 'pointer']),
                /**
                 * ```c
                 * void GDX::Graphics::g2d::SpriteBatch::setShader(SpriteBatch* thisPtr, gdx::graphics::glutils::ShaderProgram *shader)
                 * ```
                 */
                setShader: new NativeFunctionInfo(0x15FF2E5, 'void', ['pointer', 'pointer']),
                /**
                 * ```c
                 * bool GDX::Graphics::g2d::SpriteBatch::isBlendingEnabled(SpriteBatch* thisPtr)
                 * ```
                 */
                isBlendingEnabled: new NativeFunctionInfo(0x15FF3BD, 'bool', ['pointer']),
            },
        },
        Glutils: {
            PixmapTextureData: {
                /**
                 * ```c
                 * PixMap* GDX::Graphics::PixMap::Ctor(PixMap* thisPtr, GDX::graphics::Pixmap* pixmapPtr, GDX::PixmapFormat format,
                 *      bool useMipMaps, bool disposePixmap)
                 * ```
                 */
                Ctor: new NativeFunctionInfo(0x160F949, 'pointer', ['pointer', 'pointer', 'uint32', 'bool', 'bool']),
            }
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
             * PixMap* GDX::Graphics::PixMap::Ctor(PixMap* thisPtr, int32_t width, int32_t height, GDXPixMap::Format formatPtr)
             * ```
             */
            Ctor2: new NativeFunctionInfo(0x161BF65, 'pointer', ['pointer', 'int32', 'int32', 'pointer']),
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
             * Texture* GDX::Graphics::Texture::Ctor(Texture* thisPtr, GDX::Files::FileHandle* fileHandle, GDX::PixMap::Format formatPtr, bool useMipMaps)
             * ```
             */
            Ctor4: new NativeFunctionInfo(0x161E5E1, 'pointer', ['pointer', 'pointer', 'pointer', 'bool']),
            /**
             * ```c
             * Texture* GDX::Graphics::Texture::Ctor(Texture* thisPtr, GDX::Graphics::TextureData* dataPtr)
             * ```
             */
            Ctor5: new NativeFunctionInfo(0x161E74D, 'pointer', ['pointer', 'pointer']),
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