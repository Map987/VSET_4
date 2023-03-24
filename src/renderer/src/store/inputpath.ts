import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { UploadFileInfo } from 'naive-ui'

export const useInputpathStore = defineStore('Inputpath', () => {
  const inputpathMap = ref<Map<string, string>>(new Map())
  const outputpath = ref<string>('/null')
  const outputpathLock = ref<boolean>(false)

  const inputFileList = ref<UploadFileInfo[]>()

  function addinputpath(id: string, path: string): void {
    if (path != '') {
      inputpathMap.value.set(id, path)
    }
  }

  function deleteinputpath(id: string): void {
    inputpathMap.value.delete(id)
  }

  function getinputpath(): string {
    // return inputpath key and value with string
    let inputpath = ''
    inputpathMap.value.forEach((value, key) => {
      inputpath += key + ' : ' + value + '\n'
    })
    return inputpath
  }

  function getinputpathList(): string[] {
    // return inputpath value with String List
    return Array.from(inputpathMap.value.values())
  }

  function showinputpathList(): string {
    const inputpathList = getinputpathList()
    let inputpathListString = ''
    for (const i in inputpathList) {
      inputpathListString += inputpathList[i] + '\n'
    }
    return inputpathListString
  }

  function setoutputpathManual(path: string): boolean {
    if (path != '') {
      outputpath.value = path
      outputpathLock.value = true
      return true
    }
    return false
  }
  function setoutputpath(path: string): void {
    if (path != '' && outputpathLock.value == false) {
      outputpath.value = path
    }
  }
  function getoutputpath(): string {
    return outputpath.value
  }

  return {
    addinputpath,
    deleteinputpath,
    getinputpath,
    getinputpathList,
    showinputpathList,
    setoutputpathManual,
    setoutputpath,
    getoutputpath,
    inputFileList
  }
})
