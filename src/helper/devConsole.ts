import colors from "colors";

function devConsole(message: string, error?: any) {
  console.log("\n", colors.yellow.bgBlue.yellow(message), "\n");
  if (process.env.NODE_ENV === "development") {
    if (error) {
      console.log(colors.bgRed.yellow(error));
    }
  }
}

export default devConsole;
