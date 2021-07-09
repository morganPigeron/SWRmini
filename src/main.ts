import { app } from "./app";
import { DraggableWindow } from "./core/windowsService";

app(); //We can't use await at top level ! so we wrap the app into async function "app"

// test



const test = new DraggableWindow("testWindow");