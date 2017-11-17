import { formatDate } from '@/components/utils'

describe('utils', () => {
  describe('formatDate', () => {
    it('should format valid dates correctly', () => {
      expect(formatDate('1980-03-12')).toEqual('12/03/1980')
      expect(formatDate('1980-03-03')).toEqual('03/03/1980')
    })

    it('should not format invalid dates', () => {
      expect(formatDate('1980-14-14')).toEqual('')
    })
  })
})
