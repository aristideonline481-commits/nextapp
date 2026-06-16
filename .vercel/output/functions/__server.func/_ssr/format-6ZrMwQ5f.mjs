function fmtFCFA(n) {
  if (n == null) return "—";
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}
export {
  fmtFCFA as f
};
