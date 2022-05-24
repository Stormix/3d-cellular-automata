import { BoxGeometry, MeshBasicMaterial } from "three";
import { Entity, EntityOptions } from "./entity";

export class Cell extends Entity {
  constructor({ position, size, color }: EntityOptions) {
    const geometrySize = size ?? 1;
    super(
      new BoxGeometry(geometrySize, geometrySize, geometrySize),
      new MeshBasicMaterial({
        color: color ?? 0x00ff00,
        wireframe: true,
      })
    );

    if (position) this.position = position;
  }

  start(): Cell {
    return this;
  }

  update(): void {
    // Pass
  }
}
