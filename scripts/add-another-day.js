const fs = require("fs");
const OUTPUT_PATH = "./src/";

let dayNumber;
try {
  dayNumber = process.argv[2];
} catch {
  console.log("SCRIPT FAILURE: Bad day", dayNumber);
  console.log("EXAMPLE USAGE: 'npm run create:day 3'");
  process.exit(-1);
}

dayNumber = `day${dayNumber}`;

if (!fs.existsSync(dayNumber)) {
  fs.mkdirSync(OUTPUT_PATH + dayNumber);
} else {
  console.log("SCRIPT FAILURE: Folder already exists for day", dayNumber);
  process.exit(-2);
}

const code = `${dayNumber}.ts`;
const test = `${dayNumber}.test.ts`;
const input = `${dayNumber}input.ts`;
const files = [code, test, input];

console.log("\nCreating folder and generating files for: " + dayNumber + "\n");
console.log(OUTPUT_PATH + dayNumber);

files.forEach((file) => {
  fs.appendFileSync(OUTPUT_PATH + dayNumber + "/" + file, "");
  console.log("\t/" + file);
});

console.log("\nSuccessfully generated files!\n");
