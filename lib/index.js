const fs = require("fs").promises;
const path = require("path");
const clicks = require("../clicks.json");

const MAX_IP_OCCURANCE_IN_CLICKS = 10;

const getClicksPerIpPerHour = () => {
  const clicksPerIP = {};
  for (click of clicks) {
    if (clicksPerIP[click.ip]) {
      clicksPerIP[click.ip]++;
    } else {
      clicksPerIP[click.ip] = 1;
    }
  }
  return clicksPerIP;
};

const isSameHourPeriod = (index, clicksArray) => {
  if (clicksArray.length < 2) {
    return true
  }
  const currentClick = new Date(clicksArray[index].timestamp).getHours();
  const previousClick = new Date(clicksArray[index - 1].timestamp).getHours();
  const isSameHour = currentClick - previousClick;
  return isSameHour === 0;
};

const checkDuplicationAndAmount = (click, clicksArray, filteredResultSet) => {
  const duplicate = filteredResultSet.find((clickItem) => {
    return clickItem.ip === click.ip && clickItem.amount === click.amount;
  });
  return duplicate ? filteredResultSet : clicksArray;
};

const getSlicedClickSet = (clicksArray, size) => {
  return clicksArray.slice(0, clicksArray.length - size);
}

const isExpensiveClick = (index, clicksArray) => {
  const presentClick = clicksArray[index];
  const previousClick = clicksArray[index - 1];
  const presentClickAmount = presentClick.amount;
  const previousClickAmount = previousClick.amount;

  if (presentClickAmount > previousClickAmount) {
    const resultClickSet = getSlicedClickSet(clicksArray, 2)
    return [...resultClickSet, presentClick];
  } else if (presentClickAmount < previousClickAmount) {
    return getSlicedClickSet(clicksArray, 1)
  } else {
    const resultClickSet = getSlicedClickSet(clicksArray, 1)
    return checkDuplicationAndAmount(
      presentClick,
      clicksArray,
      resultClickSet
    );
  }
};

const isDifferentPeriod = (calculatedPeriod, clicksArray) => {
  const index = clicksArray.length - 1;
  const isAnotherPeriod = calculatedPeriod && clicksArray.length > 1;
  return isAnotherPeriod ? isExpensiveClick(index, clicksArray) : clicksArray;
};

const orderClicksArray = () => {
  const clicksPerIP = getClicksPerIpPerHour();
  const filteredClicks = clicks.reduce((clicksArray, click) => {
    if (clicksPerIP[click.ip] > MAX_IP_OCCURANCE_IN_CLICKS) {
      return clicksArray;
    }
    clicksArray.push({
      ip: click.ip,
      timestamp: click.timestamp,
      amount: click.amount,
    });

    calculatedPeriod = isSameHourPeriod(clicksArray.length - 1, clicksArray);
    clicksArray = isDifferentPeriod(calculatedPeriod, clicksArray);

    return clicksArray
  }, []);
  
  return filteredClicks
}

const filePath = path.join(__dirname, "..", "resultset.json");

const writeResultSet = async () => {
  const orderedClicks = orderClicksArray()

  finalResultSet = JSON.stringify(orderedClicks, null, "\t");

  try {
    await fs.writeFile(filePath, finalResultSet);
  } catch (error) {
    console.log("Error while generating result file:", error);
  }
};

module.exports = {
  getClicksPerIpPerHour,
  isSameHourPeriod,
  checkDuplicationAndAmount,
  isExpensiveClick,
  isDifferentPeriod,
  getSlicedClickSet,
  orderClicksArray,
  writeResultSet,
  filePath,
};
