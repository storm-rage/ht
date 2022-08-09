const ls = window.localStorage;
const ss = window.sessionStorage;

const windowLsStorege = {
  setItem(key, val) {
    ls.setItem(key, val);
  },
  getItem(key) {
    return ls.getItem(key);
  },
  removeItem(key) {
    ls.removeItem(key);
  },
  clear() {
    ls.clear();
  }
};
const windowSSStorage = {
  setItem(key, val) {
    ss.setItem(key, val);
  },
  getItem(key) {
    return ss.getItem(key);
  },
  removeItem(key) {
    ss.removeItem(key);
  },
  clear() {
    ss.clear();
  }
}
export {
  windowLsStorege,
  windowSSStorage
}
