export function truncate(str, max, sep) {

  // Default to 10 characters
  max = max || 10;

  var len = str.length;
  if (len > max) {

    // Default to elipsis
    sep = sep || "...";

    var seplen = sep.length;

    // If seperator is larger than character limit,
    // well then we don't want to just show the seperator,
    // so just show right hand side of the string.
    if (seplen > max) {
      return str.substr(len - max);
    }

    // Half the difference between max and string length.
    // Multiply negative because small minus big.
    // Must account for length of separator too.
    var n = -0.5 * (max - len - seplen);

    // This gives us the centerline.
    var center = len / 2;

    var front = str.substr(0, center - n);
    var back = str.substr(len - center + n); // without second arg, will automatically go to end of line.

    return front + sep + back;

  }

  return str;
}


export function convertDateToUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}