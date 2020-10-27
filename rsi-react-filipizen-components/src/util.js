export const isBlur = (email1, email2) => {
  if (typeof(email1) === "undefined" || email1 === null) return true;
  if (typeof(email2) === "undefined" || email2 === null) return true;
  return email1 !== email2;
}
