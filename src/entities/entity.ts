import { BoxGeometry, MeshBasicMaterial, Mesh, Vector3, Color } from "three";

export interface EntityOptions {
  position?: Vector3;
  color?: Color;
  size?: number;
}

export abstract class Entity {
  private _geometry: BoxGeometry;
  private _material: MeshBasicMaterial;
  private _mesh: Mesh;

  constructor(geometry: BoxGeometry, material: MeshBasicMaterial) {
    this._geometry = geometry;
    this._material = material;
    this._mesh = new Mesh(this._geometry, this._material);
  }

  public get position(): Vector3 {
    return this._mesh.position;
  }

  public set position(position: Vector3) {
    this._mesh.position.copy(position);
  }

  public get mesh(): Mesh {
    return this._mesh;
  }

  abstract start(options?: EntityOptions): void;
  abstract update(): void;
}
