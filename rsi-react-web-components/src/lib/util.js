import moment from "moment";
import padStart from "lodash/padStart";

export const isVisible = (visibleWhen) => {
  if (visibleWhen == undefined) return true;
  return visibleWhen;
};

export const isEditable = (editable) => {
  if (editable == undefined) return true;
  return editable;
};

export const isHidden = (visibleWhen) => {
  return !isVisible(visibleWhen);
};

export const isDisabled = (disableWhen) => {
  if (disableWhen == undefined) return false;
  return disableWhen;
};

export function formatNumber(num=0) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function currencyFormat(num, defaultValue = 0) {
  if (!num) return defaultValue;
  const val = typeof num === "string" ? Number(num) : num;
  return val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const groupBy = (list, key) => {
  return list.reduce((rv, item) => {
    (rv[item[key]] = rv[item[key]] || []).push(item);
    return rv;
  }, {});
};

export const getUrlParameter = (location, key) => {
  const params = new URLSearchParams(location.search);
  return params.get(key);
}


export const getDuration = (from, to) => {
  if (!from ) return "";
  const start = from ? moment(from) : monent(new Date());
  const end = to ? moment(to) : moment(new Date());
  return end.to(start);
}

export const integerRangeToArray = (from, to ) => {
  const range = [];
  for (let i = from; i <= to; i++) {
    range.push(i);
  }
  return range;
}


export const getCurrentYear = () => {
  const currDate = new Date();
  return currDate.getFullYear();
}


export const padLeft = (str, len, padChar="0") => {
  return padStart(str, len, padChar);
}

export const dateAdd = (duration, key, dt) => {
  moment().add(duration, key);
  return moment.toISOString();
}

export const formatDate = (dt, pattern="MMMM D, YYYY") => {
  return moment(dt).format(pattern);
}

export const isDateBefore = (dt, refDate) => {
  return moment(dt).isBefore(refDate);
}

export const isDateAfter = (dt, refDate) => {
  if (refDate) {
    return moment(dt).isAfter(refDate);
  }
  return moment(moment(dt).add(1, "d")).isAfter();
}

export const randomInt = (len = 6) => {
  return Math.floor(Math.random() * len) + 1
}
