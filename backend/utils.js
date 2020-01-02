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

const hours = new Date().getHours();
const isMorning = () => {
  if (hours > 6 && hours <= 13) {
    return true;
  }
  return false;
};

const isAfternoon = () => {
  if (hours > 13 && hours <= 18) {
    return true;
  }
  return false;
};

module.exports.morningOrAfternoon = () => {
  return isMorning() ? "morning" : isAfternoon() ? "afternoon" : null;
};
