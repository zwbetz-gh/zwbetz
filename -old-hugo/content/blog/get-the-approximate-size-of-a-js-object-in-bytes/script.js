const getSizeInBytes = obj => {
  let str = null;
  if (typeof obj === 'string') {
    // If obj is a string, then use it
    str = obj;
  } else {
    // Else, make obj into a string
    str = JSON.stringify(obj);
  }
  // Get the length of the Uint8Array
  const bytes = new TextEncoder().encode(str).length;
  return bytes;
};

const logSizeInBytes = (description, obj) => {
  const bytes = getSizeInBytes(obj);
  console.log(`${description} is approximately ${bytes} B`);
};

const logSizeInKilobytes = (description, obj) => {
  const bytes = getSizeInBytes(obj);
  const kb = (bytes / 1000).toFixed(2);
  console.log(`${description} is approximately ${kb} kB`);
};

// ##########

const str = 'foo';

const obj = {
  name: 'Jane',
  age: 28,
  dateOfBirth: '1992-12-01'
};

logSizeInBytes('str', str);
// => str is approximately 3 B

logSizeInBytes('obj', obj);
// => obj is approximately 51 B

logSizeInKilobytes('obj', obj);
// => obj is approximately 0.05 kB
