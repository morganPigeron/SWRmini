import { Planet } from "./planet";
import { DebugSector } from "./sector";

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