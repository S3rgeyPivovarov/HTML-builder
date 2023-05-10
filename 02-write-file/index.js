const fs = require("fs");
const readline = require("readline");

const inputLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Привет) Ожидание ввода");

inputLine.on("line", (input) => {
  if (input === "exit") {
    console.log("Удачи)");
    inputLine.close();
  } else {
    fs.appendFile("02-write-file/textTask2.txt", input + "\n", (err) => {
      if (err) throw err;
      console.log("Текст добавлен text.txt");
    });
  }
});

process.on("SIGINT", function () {
  console.log("Удачи");
  process.exit();
});
