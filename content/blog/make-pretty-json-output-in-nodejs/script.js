const makePrettyJson = (data) => {
  const string = JSON.stringify(data, null, 2);
  return string;
};

const main = () => {
  const todoItem = {
    id: 1,
    text: "Buy milk and eggs",
    done: false,
  };

  const string = makePrettyJson(todoItem);

  console.log(string);
};

main();

// Run this script with
// node content/blog/make-pretty-json-output-in-nodejs/script.js
