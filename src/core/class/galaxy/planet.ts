import { fleet, mission, regiment } from "../../interface/common";
import { infrastructure, refinery } from "../../interface/infrastructure";
import { coodinate, planetInfo, ground } from "../../interface/planetInfo";

abstract class Planet {
  protected infrastructure: infrastructure = {
    manufacturing: [],
    shipyards: [],
    trainingFacilities: [],
    constructionYards: [],
    refineries: [],
    mines: [],
  };

  protected orbit: fleet[] = [];

  protected missions: mission[] = [];

  protected ground: ground = {
    persons: [],
    regiments: [],
    fighters: [],
    planetDefence: [],
    planetAttack: [],
  };

  constructor(protected info: planetInfo, protected position: coodinate) {}

  public getInfo() {
    return this.info;
  }

  public getPosition() {
    return this.position;
  }

  public getInfrastructures() {
    return this.infrastructure;
  }

  public getOrbit() {
    return this.orbit;
  }

  public getMissions() {
    return this.missions;
  }

  public getGround() {
    return this.ground;
  }

  public addRegiments(troops: regiment[]) {
    this.ground.regiments = this.ground.regiments.concat(troops);
  }

  public removeRegiments(ids: number[]) {
    ids.forEach(id => {
      this.ground.regiments = this.ground.regiments.filter(troop => troop.id !== id);
    });
  }
}

export class DebugPlanet extends Planet {

  constructor() {
    super(
      {
        id: -1,
        name: "debugPlanet",
        sector: "debug",
        type: "Core system",
        description: "debug description",
        area: [],
        excavation: [],
        allegiance: [],
      },
      { x: 0, y: 0, z: 0 }
    );
  }
}
