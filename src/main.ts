import { Engine } from "./engine";
import "./style.css";

export const engine = Engine.getInstance();

engine.update();
