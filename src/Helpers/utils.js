//Convert Slice Wallet Address
export const spliceString = (value) => {
  let res =
    value.slice(0, 5) + "..." + value.slice(value.length - 4, value.length);
  return res;
};

//Convert 10^18 to float value
export const DivideBy18 = (value) => {
  let number = parseFloat(value) / Math.pow(10, 18);
  console.log(number);
  return number.toFixed(3);
};

//Calculate of Rasied Amount Percentage
export const rasiedAmountPercentage = (hardCap, amount) => {
  let data = (DivideBy18(amount) * 100) / DivideBy18(hardCap);
  console.log(data);
  return data.toFixed(1);
};
