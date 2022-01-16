import { Dimensions, PixelRatio, Plotform} from 'react-native';

const {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
} = Dimensions.get('window')

const scale = SCREEN_HEIGHT/962

const normalize = {
    setNormalize: (size) => {
        const newSize = size * scale
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}

export default normalize