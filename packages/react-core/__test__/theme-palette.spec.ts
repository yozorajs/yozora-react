import { createHash } from 'node:crypto'
import { themeSchemas } from '../src'

/** Digests extracted from the pinned community sources linked in each schema. */
const upstreamPaletteDigests: Record<string, string> = {
  'catppuccin-frappe': '60c8b892cb9b752ca99f347a14e8b48d5696e9359cdf18aa205779079b8a1a10',
  'catppuccin-latte': 'dfacbcdcdc7755c11101d567df471e5dbbaa7f799468f587fb9b9a2d98c5af6a',
  'catppuccin-macchiato': 'bb03368dfb7ddb3394a5894b05fddb85939a821097b43aa10b9f6e41a037c962',
  'catppuccin-mocha': '00f298a0ea10ace68e0a21bfd037a0272377743666a2ea03b22fecd8a3d39065',
  'gruvbox-dark': 'c30cc31477d9286bc2a51b9d03b2d4b1bdff2bba77532bcd124f1992229855a0',
  'gruvbox-light': 'c30cc31477d9286bc2a51b9d03b2d4b1bdff2bba77532bcd124f1992229855a0',
  'kanagawa-dragon': '21d351849921c0efba5bf26075f5e636b040a4ef776244314e771e688a418dbc',
  'kanagawa-lotus': '21d351849921c0efba5bf26075f5e636b040a4ef776244314e771e688a418dbc',
  'kanagawa-wave': '21d351849921c0efba5bf26075f5e636b040a4ef776244314e771e688a418dbc',
  'rosepine-dawn': '142b13979eaf50bb224b451a9d23e65955880810ee8b0e84afbf2253fd94ccda',
  'rosepine-main': 'de25da14b2913837ef789fe87785c80567a31dae533938649e2026366a9114fb',
  'rosepine-moon': '98ba88852b0d8860c6939d515b330c5a29687bd420daaa22cbacd508a11798f2',
  'tokyonight-day': 'b95171e453167e2fa2e50bd248de0dc2b7beb70994bea3b9dd91a0bf7b62ff43',
  'tokyonight-moon': '55cab8f0dcf7308aa11c42ab24e8b3811c98e3b816dd96a7ca17f4cdba8fc71a',
  'tokyonight-night': 'd108cd0656d7a68b3bec921f1eb6d5979ff5958b8e2529aeaa4a6fdbfc0da0bf',
  'tokyonight-storm': '5dcefd337dbd525e28e38d7538799d67da8daf7ff0eac47a9393b05dab75d8b3',
  'vsc-dark-modern': '694cd2783edd97da6b2305782e06201491dd80b80fee3c713e180ca1c613ce34',
  'vsc-light-modern': 'd15f0c041da86df12cca7c0e6d14ed64ba529c483262cb4383ad99efa6934a8f',
}

test.each(themeSchemas)('$theme/$variant keeps the original community palette', schema => {
  const name = `${schema.theme}-${schema.variant}`
  const entries = Object.entries(schema.palette).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  const digest = createHash('sha256').update(JSON.stringify(entries)).digest('hex')
  expect(digest).toBe(upstreamPaletteDigests[name])

  const allowed = new Set(Object.values(schema.palette))
  for (const [token, color] of Object.entries({ ...schema.colors, ...schema.syntax })) {
    expect(
      allowed.has(color),
      `${name}/${token}: ${color} is absent from the upstream palette`,
    ).toBe(true)
  }
})
