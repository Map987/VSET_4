import { VSETinfo } from './VSETinfo'
import { storeToRefs } from 'pinia'
import { useSuperresolutionStore } from '../../store/superresolution'
import { useGlobalsettingsStore } from '../../store/globalsettings'
import { useEncodeParamsStore } from '../../store/encodeparams'

const useGlobalsettings = useGlobalsettingsStore()
const useSuperresolution = useSuperresolutionStore()
const useEncodeParams = useEncodeParamsStore()

const { SRgpuid } = storeToRefs(useGlobalsettings)
const {
  enablesr,
  selectedInferEngine: SRselectedInferEngine,
  halfprecision: SRhalfprecision,
  cropnums,
  alphavalue,
  SrAlgorithm,
  SrModel
} = storeToRefs(useSuperresolution)
const {
  enableCRF,
  bitrateorcrf,
  videoEncoder,
  ffmpegPreset,
  videoContainer,
  enableEncodeAudio,
  audioEncoder,
  enableDIYEncodeParams,
  DIYEncodeParams
} = storeToRefs(useEncodeParams)

export class getVSETinfo {
  private readonly vsetInfo: VSETinfo

  constructor() {
    this.vsetInfo = {
      SR: {
        enablesr: enablesr.value,
        SRgpuid: SRgpuid.value,
        selectedInferEngine: SRselectedInferEngine.value,
        halfprecision: SRhalfprecision.value,
        SrAlgorithm: SrAlgorithm.value,
        SrModel: SrModel.value,
        cropnums: cropnums.value,
        alphavalue: alphavalue.value
      },
      VFI: {
        enablevfi: false,
        VFIgpuid: 0,
        selectedInferEngine: '',
        halfprecision: false,
        VfiAlgorithm: '',
        VfiModel: ''
      },
      FIX: {
        useQTGMC: false,
        useDEBAND: false
      },
      ENCODE: {
        videoEncoder: videoEncoder.value,
        ffmpegPreset: ffmpegPreset.value,
        videoContainer: videoContainer.value,
        enableCRF: enableCRF.value,
        bitrateorcrf: bitrateorcrf.value,
        enableEncodeAudio: enableEncodeAudio.value,
        audioEncoder: audioEncoder.value,
        enableDIYEncodeParams: enableDIYEncodeParams.value,
        DIYEncodeParams: DIYEncodeParams.value
      },
      // 设置默认值，在getVSETinfo中再写入
      MEDIA: {
        videoFrameCount: 114514
      },
      VSET: {
        outputpath: '',
        inputpath: ''
      }
    }
  }

  getVSETinfo(videopath: string): VSETinfo {
    this.vsetInfo.VSET.inputpath = videopath

    //...

    return this.vsetInfo
  }
}
