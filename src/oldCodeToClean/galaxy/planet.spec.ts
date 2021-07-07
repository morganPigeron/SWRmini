import { fleet, mission, regiment } from "../../interface/common";
import { infrastructure } from "../../interface/infrastructure";
import { ground, planetInfo } from "../../interface/planetInfo";
import { coordinate } from "../../interface/types";
import { DebugPlanet } from "./planet";
import { DebugSector } from "./sector";

describe("Debug planet initialisation test suite", () => {
  const planet = new DebugPlanet();

  it("has basic infos", () => {
    expect(planet.getInfo()).toMatchObject<planetInfo>({
      id: -1,
      name: "debugPlanet",
      sector: new DebugSector(),
      type: "Core system",
      description: "debug description",
      area: [],
      excavation: [],
      allegiance: [],
    });
  });

  it("has coordinates", () => {
    expect(planet.getPosition()).toMatchObject<coordinate>({
      x: 0,
      y: 0,
      z: 0,
    });
  });

  it("has infrastructures", () => {
    expect(planet.getInfrastructures()).toMatchObject<infrastructure>({
      manufacturing: [],
      shipyards: [],
      trainingFacilities: [],
      constructionYards: [],
      refineries: [],
      mines: [],
    });
  });

  it("has orbit fleets", () => {
    expect(planet.getOrbit()).toMatchObject<fleet[]>([]);
  });

  it("has missions in progress", () => {
    expect(planet.getMissions()).toMatchObject<mission[]>([]);
  });

  it("has ground troops", () => {
    expect(planet.getGround()).toMatchObject<ground>({
      persons: [],
      regiments: [],
      fighters: [],
      planetDefence: [],
      planetAttack: [],
    });
  });
});

describe("Debug planet Modification test suite", () => {
  const planet = new DebugPlanet();

  const darkTrooper: regiment = {
    id: 0,
    name: "Dark trooper",
    buyCost: 10,
    maintenanceCost: 9,
    attackStrength: 15,
    defenceStrength: 9,
    bombardmentDefense: 12,
    description: "lorem",
  };

  const clone: regiment = {
    id: 1,
    name: "clone phase 1",
    buyCost: 5,
    maintenanceCost: 5,
    attackStrength: 10,
    defenceStrength: 5,
    bombardmentDefense: 8,
    description: "lorem",
  };

  it("can add garison troops", () => {
    planet.addRegiments([clone, darkTrooper]);
    expect(planet.getGround().regiments).toStrictEqual([clone, darkTrooper]);
  });

  it("can remove garison by id", () => {
    planet.removeRegiments([0]);
    expect(planet.getGround().regiments).toStrictEqual([clone]);
  });
});