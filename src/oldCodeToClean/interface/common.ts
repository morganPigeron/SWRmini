import { Planet } from "../galaxy/planet"
import { Sector, systemType } from "../galaxy/sector";
import { PlanetaryDefence } from "../planetaryDefence/planetaryDefence";
import { planetName, factionsAllegiance } from "./types";




export interface ground {
  persons: people[];
  regiments: regiment[];
  fighters: ship[];
  planetDefence: PlanetaryDefence[];
  planetAttack: planetaryAttack[];
}



export interface planetaryAttack {}






export interface info {
  id:number;
  name:string;
  description:string;
}

export interface buyable extends info {
  buyCost:number;
  maintenanceCost:number;
}


export interface planetInfo extends info {
  sector: Sector;
  type: systemType;
  area: boolean[];
  excavation: boolean[];
  allegiance: factionsAllegiance[];
}


export interface regiment extends buyable {
  attackStrength:number;
  defenceStrength:number;
  bombardmentDefense:number;
}


export interface planetaryDefenceInfo extends buyable {
  location:Planet;
  status:"Active"|"Inactive";
  shieldStrength:number;
  bombardmentDefense:number;
}

export interface mission {}

export interface fleet {}

export interface people {}


export interface ship {}
