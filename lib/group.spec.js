const group = require("./group");
const data = require("../fixures/group.json");
const expected = require("../fixures/groupedByCategory.json");

describe("GroupBy", function () {
  it("should throw an error if pass and invalid array", function () {
    expect(() => group(undefined, "invalid")).toThrow(
      "array parameter is not a valid array"
    );
    expect(() => group([], "invalid")).toThrow(
      "array parameter is not a valid array"
    );
    expect(() => group("", "invalid")).toThrow(
      "array parameter is not a valid array"
    );
  });
  it("should throw an error pass a columnName that does not exist in all objects ", function () {
    expect(() => group(data, "columnAlias")).toThrow(
      "columnAlias must be present in all objects"
    );
  });
  it("should throw an error pass a invalid column name", function () {
    expect(() => group(data)).toThrow(
      "You must provide a column name that should exist in all objects"
    );
    expect(() => group(data, null)).toThrow(
      "You must provide a column name that should exist in all objects"
    );
    expect(() => group(data, "")).toThrow(
      "You must provide a column name that should exist in all objects"
    );
  });
  it("should return data grouped", function () {
    expect(group(data, "category").data).toEqual(expected);
  });
  it("should perfom addition of values", function () {
    const expectedGeneral = {
      ...expected.General,
      sum: 9,
    };
    const expectedOther = {
      ...expected.Other,
      sum: 6,
    };
    expect(group(data, "category").sum("sum", "value").data.General).toEqual(
      expectedGeneral
    );
    expect(group(data, "category").sum("sum", "value").data.Other).toEqual(
      expectedOther
    );
  });
  it("should perfom avg of values", function () {
    const expectedGeneral = {
      ...expected.General,
      avg: "4.50",
    };
    const expectedOther = {
      ...expected.Other,
      avg: "6.00",
    };
    expect(group(data, "category").avg("avg", "value").data.General).toEqual(
      expectedGeneral
    );
    expect(group(data, "category").avg("avg", "value").data.Other).toEqual(
      expectedOther
    );
  });
  it("should get min of values", function () {
    const expectedGeneral = {
      ...expected.General,
      min: 4,
    };
    const expectedOther = {
      ...expected.Other,
      min: 6,
    };
    expect(group(data, "category").min("min", "value").data.General).toEqual(
      expectedGeneral
    );
    expect(group(data, "category").min("min", "value").data.Other).toEqual(
      expectedOther
    );
  });
  it("should get max of values", function () {
    const expectedGeneral = {
      ...expected.General,
      max: 5,
    };
    const expectedOther = {
      ...expected.Other,
      max: 6,
    };
    expect(group(data, "category").max("max", "value").data.General).toEqual(
      expectedGeneral
    );
    expect(group(data, "category").max("max", "value").data.Other).toEqual(
      expectedOther
    );
  });
  it("should return the count of distinc elements ", function () {
    const expectedGeneral = {
      ...expected.General,
      distintGeneral: 2,
    };
    const expectedOther = {
      ...expected.Other,
      distintOhter: 1,
    };
    expect(
      group(data, "category").distinctCount("distintGeneral", "value").data
        .General
    ).toEqual(expectedGeneral);
    expect(
      group(data, "category").distinctCount("distintOhter", "value").data.Other
    ).toEqual(expectedOther);
  });
});
