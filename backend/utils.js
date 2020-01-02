module.exports.pad = (num, size) => {
  let s = String(num);
  if (s.length === 3) {
    return s;
  }
  while (s.length < (size || 3)) {
    s = "0" + s;
  }
  return s;
};
