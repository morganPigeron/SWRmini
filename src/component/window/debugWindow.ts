import React from "react";
import { DraggableWindow } from "../../services/windowsService";

import "./window.css";

export class DebugWindow extends DraggableWindow {
  constructor(windowName:string) {
    super(windowName);
  }
}