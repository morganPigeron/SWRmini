import { planetaryDefenceInfo } from "../../interface/common";
import { DebugPlanet, Planet } from "../galaxy/planet";

export abstract class PlanetaryDefence {
  

  constructor(
    protected info:planetaryDefenceInfo,
  ){}


  public getInfo() {
    return this.info;
  }
}

export class DebugPlanetaryDefence extends PlanetaryDefence {

  constructor(){
    super(
      {
        id:0,
        name:"debugShield",
        location:new DebugPlanet(),
        status:"Inactive",
        buyCost:0,
        maintenanceCost:0,
        bombardmentDefense:0,
        shieldStrength:0,
        description:"test",
      }
    );
  }



}




