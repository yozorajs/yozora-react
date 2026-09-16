export function areSameArray(A1: unknown[] | undefined, A2: unknown[] | undefined): boolean {
  if (A1 === A2) return true

  const L1: number = A1?.length ?? 0
  const L2: number = A2?.length ?? 0
  if (L1 !== L2) return false
  if (!Array.isArray(A1) || !Array.isArray(A2)) return L1 === 0

  for (let i = 0; i < L1; ++i) if (A1[i] !== A2[i]) return false
  return true
}
