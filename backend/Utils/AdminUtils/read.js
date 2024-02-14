// Requiring the module
const reader = require("xlsx");

const parseExcelFile = (path) => {
  // Reading our test file
  const file = reader.readFile(path);
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }

  // Printing data
  console.log(data);
  return data;
};

module.exports = parseExcelFile;
