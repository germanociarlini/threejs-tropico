import * as THREE from "three"

export class MathUtils {

  /**
   * Maps the specified latitude and longiude values to a sphere surface.
   * Does not account for any translation done to the sphere mesh.
   * @param latitude Coordinate latitude value
   * @param longitude Coordinate longitude value
   * @param radius Sphere mesh radius (in world space units)
   */
  public static latAndLongToSphereSurface(latitude: number, longitude: number, radius: number) {
    const phi = (90 - latitude) * (Math.PI / 180)
    const theta = (longitude + 180) * (Math.PI / 180)
    const x = -((radius) * Math.sin(phi) * Math.cos(theta))
    const z = ((radius) * Math.sin(phi) * Math.sin(theta))
    const y = ((radius) * Math.cos(phi))

    return new THREE.Vector3(x, y, z);
  }
}