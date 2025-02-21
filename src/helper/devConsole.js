// import colors from "colors";
const colors = require("colors");

function devConsole(message) {
  if (process.env.NODE_ENV === "development") {
    console.log(" ");
    console.log(message.bgYellow.bold);
    console.log(" ");
  }
}

// export the function
// export default devConsole;
module.exports = devConsole;
