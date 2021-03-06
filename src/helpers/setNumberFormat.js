export default function setNumberFormat(v) {
  if (/^(|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(v)) {
    return new Intl.NumberFormat().format(v);
  }
  return '-';
}
