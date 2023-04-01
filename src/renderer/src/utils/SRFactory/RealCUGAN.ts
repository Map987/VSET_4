import SRABC from './SRABC'

export default class RealCUGAN extends SRABC {
  getVPY(path: string): string {
    return 'import cv2' + path
  }
}
