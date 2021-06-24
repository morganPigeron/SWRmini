import { people, regiment, ship } from "./common";

export interface planetInfo {
  id: number;
  name: planetName;
  sector: sector;
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
  planetDefence: planetaryDefence[];
  planetAttack: planetaryAttack[];
}



export interface planetaryDefence {}

export interface planetaryAttack {}

export type systemType = "Core system" | "Rim system";
export type sector = "debug";
export type planetName = "debugPlanet";
export type factionsAllegiance = { FACTION: number };
export type coodinate = { x: number; y: number; z: number };
