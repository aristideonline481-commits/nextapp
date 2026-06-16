export function fmtFCFA(n: number | null | undefined) {
  if (n == null) return "—";
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}
