export interface VSETinfo {
  readonly SR: SRinfo
  readonly VFI: VFIinfo
  readonly FIX: FIXinfo
  readonly ENCODE: ENCODEinfo
  readonly MEDIA: MEDIAinfo
  readonly VSET: VSETsettings
}

interface SRinfo {
  readonly enablesr: boolean
  readonly SRgpuid: number
  readonly selectedInferEngine: string
  readonly halfprecision: boolean
  readonly SrAlgorithm: string
  readonly SrModel: string
  readonly cropnums: number
  readonly alphavalue: number
}

interface VFIinfo {
  readonly enablevfi: boolean
  readonly VFIgpuid: number
  readonly selectedInferEngine: string
  readonly halfprecision: boolean
  readonly VfiAlgorithm: string
  readonly VfiModel: string
}

interface FIXinfo {
  readonly useQTGMC: boolean
  readonly useDEBAND: boolean
}

interface ENCODEinfo {
  readonly videoEncoder: string
  readonly ffmpegPreset: string
  readonly videoContainer: string
  readonly enableCRF: boolean
  readonly bitrateorcrf: number
  readonly enableEncodeAudio: boolean
  readonly audioEncoder: string
  readonly enableDIYEncodeParams: boolean
  readonly DIYEncodeParams: string
}

interface MEDIAinfo {
  videoFrameCount: number
}

interface VSETsettings {
  outputpath: string
  inputpath: string
}
