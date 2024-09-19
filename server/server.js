"use strict";
const express = require("express");
const http = require("http");
const io = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

let fetchIntervalId;
let fetchInterval = 5000;
let lastQuotes;

const tickers = [
  {
    name: "AAPL", // Apple
    active: true,
    removed: false,
  },
  {
    name: "GOOGL", // Alphabet
    active: true,
    removed: false,
  },
  {
    name: "MSFT", // Microsoft
    active: true,
    removed: false,
  },
  {
    name: "AMZN", // Amazon
    active: true,
    removed: false,
  },
  {
    name: "FB", // Facebook
    active: true,
    removed: false,
  },
  {
    name: "TSLA", // Tesla
    active: true,
    removed: false,
  },
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
}

function getQuotes(socket) {
  const filteredTickers = tickers.filter((ticker) => !ticker.removed);

  lastQuotes = filteredTickers.map((ticker, i) => {
    if (ticker.active) {
      return {
        ...ticker,
        exchange: "NASDAQ",
        price: randomValue(100, 300, 2),
        change: randomValue(-200, 200, 2),
        change_percent: randomValue(0, 1, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
      };
    }

    return lastQuotes[i]; // keep unchanged
  });

  socket.emit("ticker", { updatedTickers: lastQuotes, tickers });
}

function trackTickers(socket, interval) {
  getQuotes(socket);

  if (fetchIntervalId) {
    clearInterval(fetchIntervalId);
  }

  fetchIntervalId = setInterval(function () {
    getQuotes(socket);
  }, interval);

  socket.on("disconnect", function () {
    clearInterval(fetchIntervalId);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

socketServer.on("connection", (socket) => {
  socket.on("start", () => {
    trackTickers(socket, fetchInterval);
  });

  socket.on("switchTickerActivity", (data) => {
    const currentTicker = tickers.find((ticker) => ticker.name === data.name);

    currentTicker.active = data.active;
  });

  socket.on("changeInterval", (newInterval) => {
    fetchInterval = newInterval;

    trackTickers(socket, newInterval);
  });

  socket.on("removeTicker", (tickerName) => {
    const tickerToRemove = tickers.find((ticker) => ticker.name === tickerName);

    tickerToRemove.removed = true;

    getQuotes(socket);
  });

  socket.on("addTicker", (tickerName) => {
    const tickerToAdd = tickers.find((ticker) => ticker.name === tickerName);

    tickerToAdd.removed = false;

    getQuotes(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`); // http://localhost:4000
});
