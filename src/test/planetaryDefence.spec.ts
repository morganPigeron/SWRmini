import { planetaryDefenceInfo } from "../interface/common";
import { DebugPlanet } from "../model/galaxy/planet";
import {
  DebugPlanetaryDefence,
} from "../model/planetaryDefence/planetaryDefence";

describe("debug planetary defence Test Suite", () => {
  const defence = new DebugPlanetaryDefence();

  it("exist", () => {
    expect(defence).toBeDefined();
  });

  it("has basic info", () => {
    expect(defence.getInfo()).toMatchObject<planetaryDefenceInfo>({
      id:0,
      name:"debugShield",
      location: new DebugPlanet(),
      status: "Inactive",
      buyCost: 0,
      maintenanceCost: 0,
      bombardmentDefense: 0,
      shieldStrength: 0,
      description: "test",
    });
  });

  //it("can ")
});
