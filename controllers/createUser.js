const fs = require("fs");
const path = require("path");
const fastCsv = require("fast-csv");

const { createUser } = require("../src/daos/user");
const createUserDetails = require("../src/daos/userDetailsDao");

// @discription: create users POST
exports.createUser = async (req, res, next) => {
  try {
    const readCSV = (csvFilePath) => {
      const readData = fs.createReadStream(csvFilePath);
      let failedCount = 0;
      let successCount = 0;
      const successData = [];
      const failedData = [];
      readData
        .pipe(fastCsv.parse())
        .on("data", async (row) => {
          if (row[2] !== "") {
            successData.push(row);
            successCount += 1;
            await createUser({
              name: row[0],
              phone: row[4],
              email: row[2],
            });
            await createUserDetails({
              email: row[2],
              secondName: row[1],
              ip: row[3],
            });
          } else {
            failedData.push(row);
            failedCount += 1;
          }
        })
        .on("end", () => {
          res.status(200).json({
            success: true,
            Message: {
              sCount: `Number of Success data is ${successCount}`,
              fCount: `Number of Failed data is ${failedCount} ,`,
            },
            successData,
            failedData,
          });
        })
        .on("error", (e) => console.error(e));
    };
    const pathCsv = path.resolve(__dirname, "../data/users.csv");
    readCSV(pathCsv);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
