import { describe, expect, it } from 'vitest'
import PathFormat from '../src/renderer/src/utils/pathFormat'

describe('PathFormat', () => {
  it('test_unix', () => {
    const pathFormat = new PathFormat()
    pathFormat.setRootPath('/Users/test/Downloads/unix')
    const check: Array<string> = [pathFormat.getRootPath(), pathFormat.getNewPath('/unix/test.txt')]
    expect(check).toStrictEqual(['/Users/test/Downloads', '/Users/test/Downloads/unix/test.txt'])
  })
  it('test_win', () => {
    const pathFormat = new PathFormat()
    pathFormat.setRootPath('C:\\Users\\test\\Downloads\\win')
    const check: Array<string> = [pathFormat.getRootPath(), pathFormat.getNewPath('/win/test.txt')]
    expect(check).toStrictEqual([
      'C:\\Users\\test\\Downloads',
      'C:\\Users\\test\\Downloads\\win\\test.txt'
    ])
  })
  it('checkpath', () => {
    const pathFormat = new PathFormat()
    const check: Array<boolean> = [
      pathFormat.checkPath('/Users/test/Downloads/unix'),
      pathFormat.checkPath('C:\\Users\\test\\Downloads\\win'),
      pathFormat.checkPath('C:Users/test/Downloads/unix/test.txt'),
      pathFormat.checkPath('Users/test/Downloads/unix/test.txt')
    ]
    expect(check).toStrictEqual([true, true, false, false])
  })
})
