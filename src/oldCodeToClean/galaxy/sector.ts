import { Planet } from "./planet";

export class Sector {

  protected planets:Planet[] = [];

  getPlanet() {
    return this.planets;
  }

}

export class DebugSector extends Sector {


}




export type systemType = "Core system" | "Rim system";
export type sector = "debug";