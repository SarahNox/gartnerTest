const fs = require("fs");
const processedClicks = require("../lib");
const MOCKS = require("./mocks")

jest.mock("../clicks.json", () => {
  return require("./mocks").CLICKS
})

jest.mock("fs", () => ({
    promises: {
      writeFile: jest.fn().mockResolvedValue(),
    }
  }))

describe("when filtering the clicks.json", () => {
  describe("when getClicksPerIpPerHour is called", () => {
    it("counts the occurence of each ip", () => {
      expect(processedClicks.getClicksPerIpPerHour()).toEqual(MOCKS.COUNTED_CLICKS);
    });
  });

  describe("when isSameHourPeriod is called", () => {
    it("will return false when hour in timestamp is different for 2 objects", () => {
      clicks = [MOCKS.LATER_CLICK, MOCKS.EARLIER_CLICK];

      expect(
        processedClicks.isSameHourPeriod(MOCKS.INDEX(clicks), clicks)
      ).toEqual(false);
    });

    it("will return true when hour in timestamp is the same for 2 objects", () => {
      clicks = MOCKS.SAME_HOUR_CLICKS;

      expect(
        processedClicks.isSameHourPeriod(MOCKS.INDEX(clicks), clicks)
      ).toEqual(true);
    });

    it("will return true when only one object is in the set", () => {
      clicks = [MOCKS.EARLIER_CLICK];

      expect(
        processedClicks.isSameHourPeriod(MOCKS.INDEX(clicks), clicks)
      ).toEqual(true);
    });
  });

  describe("when checkDuplicationAndAmount is called", () => {
    it("will remove a duplicate IP from the set", () => {
      nextResultSet = MOCKS.DUPLICATE_IP_SET;
      currentResultSet = MOCKS.DUPLICATE_IP_SET_FILTERED;
      click = MOCKS.SINGLE_CLICK

      expect(
        processedClicks.checkDuplicationAndAmount(
          click,
          nextResultSet,
          currentResultSet
        )
      ).toEqual(currentResultSet);
    });

    it("will add a non present IP to the set", () => {
      nextResultSet = MOCKS.NEXT_RESULTS(7, 7);
      currentResultSet = MOCKS.CURRENT_RESULTS
      click = MOCKS.SINGLE_CLICK;

      expect(
        processedClicks.checkDuplicationAndAmount(
          click,
          nextResultSet,
          currentResultSet
        )
      ).toEqual(nextResultSet);
    });
  });

  describe("when isExpensiveClick is called", () => {
    it("returns the later click when amount is higher than previous one", () => {
      resultSet = MOCKS.NEXT_RESULTS(7, 10);

      expect(
        processedClicks.isExpensiveClick(MOCKS.INDEX(resultSet), resultSet)
      ).toEqual([resultSet[1]]);
    });

    it("returns the ealier click when amount is higher than later one", () => {
      resultSet = MOCKS.NEXT_RESULTS(10, 7);

      expect(
        processedClicks.isExpensiveClick(MOCKS.INDEX(resultSet), resultSet)
      ).toEqual([resultSet[0]]);
    });

    it("returns boths clicks when amount is equal", () => {
      resultSet = MOCKS.NEXT_RESULTS(7, 7);

      expect(
        processedClicks.isExpensiveClick(MOCKS.INDEX(resultSet), resultSet)
      ).toEqual(resultSet);
    });
  });

  describe("when isDifferentPeriod is called", () => {
    it("has the last 2 items in the result set in the same hour period", () => {
      clicks = MOCKS.SAME_HOUR_CLICKS;
      calculatedPeriod = processedClicks.isSameHourPeriod(
        MOCKS.INDEX(clicks),
        clicks
      );

      expect(
        processedClicks.isDifferentPeriod(calculatedPeriod, clicks)
      ).toEqual(MOCKS.SORTED_CLICK);
    });

    it("has the last 2 items in the result set in different hour period", () => {
      clicks = [MOCKS.EARLIER_CLICK, MOCKS.LATER_CLICK];
      calculatedPeriod = processedClicks.isSameHourPeriod(
        MOCKS.INDEX(clicks),
        clicks
      );

      expect(
        processedClicks.isDifferentPeriod(calculatedPeriod, clicks)
      ).toEqual(clicks);
    });

    it("has the last 1 item in the result set", () => {
      clicks = [MOCKS.LATER_CLICK];
      calculatedPeriod = processedClicks.isSameHourPeriod(
        MOCKS.INDEX(clicks),
        clicks
      );

      expect(
        processedClicks.isDifferentPeriod(calculatedPeriod, clicks)
      ).toEqual(clicks);
    });
  });

  describe("when writeResultSet is called", () => {
    it("create a file with results", () => {
      processedClicks.writeResultSet()

      expect(fs.promises.writeFile).toHaveBeenCalledTimes(1)
      expect(fs.promises.writeFile).toHaveBeenCalledWith(processedClicks.filePath, MOCKS.CLICKS_FOR_WRITE_FILE)
    })
  })
});
