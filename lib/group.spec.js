const group = require("./group");
const data = require("../fixures/group.json");
const expected = require("../fixures/groupedByCategory.json");

describe("GroupBy", function () {
  describe("error handling", function () {
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
      const error = new Error("columnAlias must be present in all objects");
      expect(() => group(data, "columnAlias")).toThrow(error);
    });
    it("it should throw an error if alias or columnName are not passed", function () {
      const error = new Error(
        'Please make sure you are passing the correct arguments, "alias" and "columnName" are required'
      );
      expect(() => group(data, "category").sum()).toThrow(error);
      expect(() => group(data, "category").min()).toThrow(error);
      expect(() => group(data, "category").max()).toThrow(error);
      expect(() => group(data, "category").avg()).toThrow(error);
      expect(() => group(data, "category").distinctCount()).toThrow(error);
    });
    it("should throw an error pass a invalid column name", function () {
      const error = new Error(
        "You must provide a column name that should exist in all objects"
      );
      expect(() => group(data)).toThrow(error);
      expect(() => group(data, null)).toThrow(error);
      expect(() => group(data, "")).toThrow(error);
    });
  });
  describe("core functionality", function () {
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
        avg: 4.5,
      };
      const expectedOther = {
        ...expected.Other,
        avg: 6.0,
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
        group(data, "category").distinctCount("distintOhter", "value").data
          .Other
      ).toEqual(expectedOther);
    });
    it("should return the keys of grouped data", function () {
      expect(group(data, "category").keys).toEqual(["General", "Other"]);
    });
    it("should return the first group", function () {
      const expected = [
        { category: "General", id: "60", name: "Display", value: "4" },
        { category: "General", id: "58", name: "Manufacturer", value: "5" },
      ];
      expect(group(data, "category").firstGroup).toEqual(expected);
    });
    it("should return the last group", function () {
      const expected = [
        {
          name: "OS",
          category: "Other",
          id: "37",
          value: "6",
        },
      ];
      expect(group(data, "category").lastGroup).toEqual(expected);
    });
    it('it should return aggregate only the where condition', function(){
       const result = group(data,'category').where(item=>item.category === 'General').sum('sum', 'value');
       expect(result.data.General.sum).toBe(9)
    })
  });
});
