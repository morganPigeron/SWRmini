import { app } from "./src/app/app";

app(); //We can't use await at top level ! so we wrap the app into async function "app"