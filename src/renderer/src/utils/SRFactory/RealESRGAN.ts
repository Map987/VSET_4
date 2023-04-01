import SRABC from './SRABC'

export default class RealESRGAN extends SRABC {
  getVPY(path: string): string {
    return 'import cv2' + path
  }
}
