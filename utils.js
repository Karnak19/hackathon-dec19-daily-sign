export const pad = (num, size) => {
  let s = String(num);
  if (s.length === 3) {
    return s;
  }
  while (s.length < (size || 3)) {
    s = "0" + s;
  }
  return s;
};

const isMorning = hours => {
  if (hours > 6 && hours <= 13) {
    return true;
  }
  return false;
};

const isAfternoon = hours => {
  if (hours > 13 && hours <= 18) {
    return true;
  }
  return false;
};

export const morningOrAfternoon = () => {
  const currentHour = new Date().getHours();
  return isMorning(currentHour) ? "morning" : isAfternoon(currentHour) ? "afternoon" : null;
};
