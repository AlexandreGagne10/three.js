import { Texture } from './Texture.js';
import { CubeReflectionMapping, NearestFilter } from '../constants.js';

/**
 * Creates a cube data texture from six faces of typed array data.
 *
 * @augments Texture
 */
class DataCubeTexture extends Texture {

    /**
     * Constructs a new data cube texture.
     *
     * @param {Array<TypedArray>} [data=[]] - Array of six typed arrays.
     * @param {number} [width=1] - Width of each face.
     * @param {number} [height=1] - Height of each face.
     */
    constructor( data = [], width = 1, height = 1 ) {

        super( null, CubeReflectionMapping );

        /**
         * This flag can be used for type testing.
         *
         * @type {boolean}
         * @readonly
         * @default true
         */
        this.isDataCubeTexture = true;

        /**
         * This flag can be used for type testing.
         *
         * @type {boolean}
         * @readonly
         * @default true
         */
        this.isCubeTexture = true;

        // Ensure six faces exist
        const faces = new Array( 6 ).fill( null ).map( ( _, i ) => {
            const faceData = data[ i ] || null;
            return { data: faceData, width, height };
        } );

        /**
         * Array of cube faces.
         *
         * @type {Array<{data:TypedArray,width:number,height:number}>}
         */
        this.image = faces;

        /**
         * How the texture is sampled when a texel covers more than one pixel.
         *
         * Overwritten and set to `NearestFilter` by default.
         *
         * @type {(NearestFilter|NearestMipmapNearestFilter|NearestMipmapLinearFilter|LinearFilter|LinearMipmapNearestFilter|LinearMipmapLinearFilter)}
         * @default NearestFilter
         */
        this.magFilter = NearestFilter;

        /**
         * How the texture is sampled when a texel covers less than one pixel.
         *
         * Overwritten and set to `NearestFilter` by default.
         *
         * @type {(NearestFilter|NearestMipmapNearestFilter|NearestMipmapLinearFilter|LinearFilter|LinearMipmapNearestFilter|LinearMipmapLinearFilter)}
         * @default NearestFilter
         */
        this.minFilter = NearestFilter;

        /**
         * Whether to generate mipmaps (if possible) for a texture.
         *
         * Overwritten and set to `false` by default.
         *
         * @type {boolean}
         * @default false
         */
        this.generateMipmaps = false;

        /**
         * If set to `true`, the texture is flipped along the vertical axis when
         * uploaded to the GPU.
         *
         * Overwritten and set to `false` by default.
         *
         * @type {boolean}
         * @default false
         */
        this.flipY = false;

        /**
         * Specifies the alignment requirements for the start of each pixel row in memory.
         *
         * Overwritten and set to `1` by default.
         *
         * @type {number}
         * @default 1
         */
        this.unpackAlignment = 1;

    }

    /**
     * Alias for {@link DataCubeTexture#image}.
     *
     * @type {Array<{data:TypedArray,width:number,height:number}>}
     */
    get faces() {

        return this.image;

    }

    set faces( value ) {

        this.image = value;

    }

}

export { DataCubeTexture };
