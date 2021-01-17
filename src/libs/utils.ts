export const genCharArray = (firstChar: string, lastChar: string) => {
  let arr = []
  let curentCharCode = firstChar.charCodeAt(0)
  const lastCharCode = lastChar.charCodeAt(0);
  for (; curentCharCode <= lastCharCode; ++curentCharCode) {
      arr.push(String.fromCharCode(curentCharCode));
  }
  return arr;
}
