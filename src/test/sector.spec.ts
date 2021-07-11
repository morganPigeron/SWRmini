import { Planet } from "../model/galaxy/planet";
import { DebugSector } from "../model/galaxy/sector";

describe("Sector debug test suite", () => {
  const sector = new DebugSector();
  it("exist", () => {
    expect(sector).toBeDefined();
  });

  it("has a list of planet", () => {
    expect(sector.getPlanet()).toEqual([]);
  });

  it("has systemType", () => {
    expect(sector.getPlanet()).toEqual([]);
  });

});