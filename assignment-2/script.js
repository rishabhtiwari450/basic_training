// Problem 1: Complete the secondLargest function which takes in an array of numbers in input and return the second biggest number in the array. (without using sort)?
function secondLargest(array) {
  let largest = -Infinity;
  let second = -Infinity;

  for (let i = 0; i < array.length; i++) {
    if (array[i] > largest) {
      second = largest;
      largest = array[i];
    } else if (array[i] > second && array[i] < largest) {
      second = array[i];
    }
  }

  return second;
}

// Problem 2: Complete the calculateFrequency function that takes lowercase string as input and returns frequency of all english alphabet. (using only array, no in-built function)
function calculateFrequency(string) {
  const result = {};

  for (let i = 0; i < string.length; i++) {
    const letter = string[i];

    if (letter >= "a" && letter <= "z") {
      if (result[letter] === undefined) {
        result[letter] = 1;
      } else {
        result[letter]++;
      }
    }
  }

  return result;
}
// Problem 3: Complete the flatten function that takes a JS Object, returns a JS Object in flatten format (compressed)
function flatten(unflatObject) {
  const result = {};

  function flattenObject(obj, parentKey) {
    for (const key in obj) {
      let newKey;

      if (parentKey === "") {
        newKey = key;
      } else {
        newKey = parentKey + "." + key;
      }

      if (typeof obj[key] === "object" && obj[key] !== null) {
        flattenObject(obj[key], newKey);
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  flattenObject(unflatObject, "");

  return result;
}

// Problem 4: Complete the unflatten function that takes a JS Object, returns a JS Object in unflatten format
function unflatten(flatObject) {
  const result = {};

  for (const key in flatObject) {
    const parts = key.split(".");
    let current = result;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      const nextPart = parts[i + 1];

      if (current[part] === undefined) {
        if (/^\d+$/.test(nextPart)) {
          current[part] = [];
        } else {
          current[part] = {};
        }
      }

      current = current[part];
    }

    const lastPart = parts[parts.length - 1];
    current[lastPart] = flatObject[key];
  }

  return result;
}