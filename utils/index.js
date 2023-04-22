const rTracer = require("cls-rtracer");
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf } = format;

const stringifyWithCheck = (message) => {
  if (!message) {
    return "";
  }
  try {
    return JSON.stringify(message);
  } catch (err) {
    if (message.data) {
      return stringifyWithCheck(message.data);
    } else {
      console.log(message);
      return `unable to unfurl message: ${message}`;
    }
  }
};

const logger = () => {
  const rTracerFormat = printf((info) => {
    const rid = rTracer.id();
    const infoSplat = info[Symbol.for("splat")] || [];

    let message = `${info.timestamp}: ${stringifyWithCheck(
      info.message
    )} ${stringifyWithCheck(...infoSplat)}`;
    if (rid) {
      message = `[request-id:${rid}]: ${message}`;
    }
    return message;
  });
  return createLogger({
    format: combine(timestamp(), rTracerFormat),
    transports: [new transports.Console()],
  });
};

module.exports = logger;
