export const changeWordToTitleCase = (stringToChange) => {
  const stringArray = stringToChange.split("");
  stringArray[0] = stringArray[0].toUpperCase();
  return stringArray.join("");
};
