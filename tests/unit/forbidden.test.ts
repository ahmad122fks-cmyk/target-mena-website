import { describe, expect, it } from 'vitest'
import { findForbidden, htmlText, pageData } from '../../scripts/forbidden-rules'

describe('forbidden content guard (prices, suppliers, staff)', () => {
  it('blocks every price key in board data', () => {
    for (const key of [
      'price',
      'monthlyPrice',
      'pricePerMeter',
      'ppm',
      'mp',
      'sp',
      'supplierName',
      'campaign',
      'company',
      'available',
      'availability',
      'booked',
      'bookedUntil',
      'bookedBy',
    ]) {
      expect(findForbidden(`{"code":"BG01A","${key}": 1}`, { keys: true }), key).not.toHaveLength(0)
    }
  })
  it('lets whitelisted board fields through', () => {
    const board =
      '{"code":"BGW03A","type":"Wall","city":"Baghdad","height":9.8,"width":20,"faces":1,"sqm":196}'
    expect(findForbidden(board, { keys: true })).toHaveLength(0)
  })
  it('blocks price words and currency in published text', () => {
    expect(findForbidden('Monthly price on request', { words: true })).not.toHaveLength(0)
    expect(findForbidden('السعر الشهري', { words: true })).not.toHaveLength(0)
    expect(findForbidden('1,200 USD', { words: true })).not.toHaveLength(0)
    expect(findForbidden('$1,200', { words: true })).not.toHaveLength(0)
  })
  it('blocks private names without printing them', () => {
    const found = findForbidden('Operated by Example Partner Co', { terms: ['example partner'] })
    expect(found).toEqual([{ rule: 'private name', sample: '(hidden)' }])
  })
  it('checks the data each built page carries', () => {
    const page =
      '<div>ok</div><script id="page-data" type="application/json">{"available":true}</script>'
    expect(findForbidden(pageData(page), { keys: true })).not.toHaveLength(0)
  })
  it('reads only visible HTML text (scripts ignored)', () => {
    expect(htmlText('<p>Hello</p><script>var $=1</script>')).not.toContain('$')
  })
})
