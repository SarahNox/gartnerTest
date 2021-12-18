const CLICKS = [
  { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
  { ip: "33.33.33.33", timestamp: "3/11/2020 07:02:54", amount: 15.75 },
  { ip: "66.66.66.66", timestamp: "3/11/2020 07:02:54", amount: 14.25 },
  { ip: "55.55.55.55", timestamp: "3/11/2020 14:02:54", amount: 4.25 },
  { ip: "55.55.55.55", timestamp: "3/11/2020 14:03:04", amount: 5.25 },
  { ip: "44.44.44.44", timestamp: "3/11/2020 21:22:23", amount: 9.0 },
];

const COUNTED_CLICKS = {
  "11.11.11.11": 1,
  "33.33.33.33": 1,
  "44.44.44.44": 1,
  "55.55.55.55": 2,
  "66.66.66.66": 1,
};

const EARLIER_CLICK = {
  ip: "22.22.22.22",
  timestamp: "3/11/2020 02:02:58",
  amount: 7.0,
};

const LATER_CLICK = {
  ip: "33.33.33.33",
  timestamp: "3/11/2020 07:02:54",
  amount: 15.75,
};

const SAME_HOUR_CLICKS = [
  { ip: "11.11.11.11", timestamp: "3/11/2020 07:02:54", amount: 4.5 },
  { ip: "33.33.33.33", timestamp: "3/11/2020 07:02:54", amount: 15.75 },
];

const SORTED_CLICK = [
  { ip: "33.33.33.33", timestamp: "3/11/2020 07:02:54", amount: 15.75 },
];

const DUPLICATE_IP_SET = [
  { ip: "22.22.22.22", timestamp: "3/11/2020 07:02:58", amount: 7.0 },
  { ip: "33.33.33.33", timestamp: "3/11/2020 07:03:54", amount: 7.0 },
  { ip: "22.22.22.22", timestamp: "3/11/2020 07:04:54", amount: 7.0 },
];

const DUPLICATE_IP_SET_FILTERED = [
  { ip: "22.22.22.22", timestamp: "3/11/2020 07:02:58", amount: 7.0 },
  { ip: "33.33.33.33", timestamp: "3/11/2020 07:03:54", amount: 7.0 },
];

const INDEX = (clicks) => clicks.length - 1;

const NEXT_RESULTS = (firstAmount, secondAmount) => [
  { ip: "22.22.22.22", timestamp: "3/11/2020 07:02:58", amount: firstAmount },
  { ip: "33.33.33.33", timestamp: "3/11/2020 07:03:54", amount: secondAmount },
];

const CURRENT_RESULTS = [
  { ip: "22.22.22.22", timestamp: "3/11/2020 07:02:58", amount: 7.0 },
];

const SINGLE_CLICK = {
  ip: "33.33.33.33",
  timestamp: "3/11/2020 07:03:54",
  amount: 7.0,
};

const FINAL_CLICKS = [
  { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
  { ip: "33.33.33.33", timestamp: "3/11/2020 07:02:54", amount: 15.75 },
  { ip: "55.55.55.55", timestamp: "3/11/2020 14:03:04", amount: 5.25 },
  { ip: "44.44.44.44", timestamp: "3/11/2020 21:22:23", amount: 9.0 },
];

const CLICKS_FOR_WRITE_FILE = JSON.stringify(FINAL_CLICKS, null, "\t");

module.exports = {
  CLICKS,
  COUNTED_CLICKS,
  LATER_CLICK,
  EARLIER_CLICK,
  SAME_HOUR_CLICKS,
  SORTED_CLICK,
  DUPLICATE_IP_SET,
  DUPLICATE_IP_SET_FILTERED,
  INDEX,
  NEXT_RESULTS,
  CURRENT_RESULTS,
  SINGLE_CLICK,
  CLICKS_FOR_WRITE_FILE,
};
