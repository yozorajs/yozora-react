export function areSameArray(A1: unknown[] | undefined, A2: unknown[] | undefined): boolean {
  if (A1 === A2) return true

  const L1: number = A1?.length ?? 0
  const L2: number = A2?.length ?? 0
  return L1 === 0 && L2 === 0
}
