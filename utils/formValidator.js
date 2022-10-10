const hasWhiteSpace = (str) => {
  return str.indexOf(" ") >= 0;
};
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = { hasWhiteSpace, capitalizeFirstLetter };
