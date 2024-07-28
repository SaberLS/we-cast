export const addParIfE = (par, parName) => par ? `&${parName}=${par}` : ""; //add Parameter If Exists


export function cnvtShiftGMT(shift) { //converts timme given in seconds to GMT offset returns string in format: GMT[+/-]0000
  let offset = shift / 3600;//count seconds to hours

  //add 0 before offset if its shorter than 2 signs
  //add sign to the front
  if (offset >= 0) {
    if (offset < 10) { offset = "0" + offset }
    offset = "+" + offset;
  } else if (offset > -10) {
    offset = "-0" + (offset * -1);
  }

  return "GMT" + offset;
}


export function cnvtUni(uni) {// src: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  const date = new Date(uni * 1000);

  // Hours part from the timestamp
  const hours = date.getHours();

  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();

  // Seconds part from the timestamp
  const seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  return (hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2));
}

export const capitalFirstL = (str) => str[0].toUpperCase() + str.slice(1);
export const cnvtMtoKM = (m) => m / 1000;

export function cnvtUniDate(uni) {
  const date = new Date(uni * 1000);

  return `${date}`
} 