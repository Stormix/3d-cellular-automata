import { Color, Scene, Vector3 } from "three";
import { Cell } from "./entities/cell";
import { Entity } from "./entities/entity";

export class MainScene {
  private _scene: Scene;
  private _entities: Entity[] = [];

  constructor() {
    this._scene = new Scene();
    this._scene.background = new Color("black");
  }

  public get scene(): Scene {
    return this._scene;
  }

  private registerEntities(): void {
    this._entities.forEach((entity) => {
      this._scene.add(entity.mesh);
    });
  }

  public start(): MainScene {
    console.info("MainScene started");
    const color = new Color(0xffffff);

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (Math.random() > 0.5) {
            color.setHex(Math.random() * 0xffffff);
            const cell = new Cell({
              position: new Vector3(x, y, z),
              color,
            }).start();
            this._entities.push(cell);
          }
        }
      }
    }
    this.registerEntities();
    return this;
  }

  public update(): void {
    this._entities.forEach((entity) => {
      entity.update();
    });
  }
}
