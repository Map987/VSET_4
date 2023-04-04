import SRABC from './SRABC'
import RealCUGAN from './RealCUGAN'
import RealESRGAN from './RealESRGAN'

export class SRFactory {
  private readonly SR_TYPE: string
  // private readonly SR_MODEL: string
  // private readonly SR_SCALE: number
  // private readonly SR_GPUID: number

  constructor(SR_TYPE: string) {
    this.SR_TYPE = SR_TYPE
  }

  createSR(): SRABC {
    switch (this.SR_TYPE) {
      case 'RealCUGAN':
        return new RealCUGAN()
      case 'RealESRGAN':
        return new RealESRGAN()
      default:
        throw new Error('SR_TYPE not found')
    }
  }
}
