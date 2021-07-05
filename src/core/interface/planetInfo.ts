import { Sector, sector, systemType } from "../class/galaxy/sector";
import { PlanetaryDefence } from "../class/planetaryDefence/planetaryDefence";
import { people, regiment, ship } from "./common";
import { planetName, factionsAllegiance } from "./types";

export interface planetInfo {
  id: number;
  name: planetName;
  sector: Sector;
  type: systemType;
  description: string;
  area: boolean[];
  excavation: boolean[];
  allegiance: factionsAllegiance[];
}

export interface ground {
  persons: people[];
  regiments: regiment[];
  fighters: ship[];
  planetDefence: PlanetaryDefence[];
  planetAttack: planetaryAttack[];
}



export interface planetaryAttack {}




