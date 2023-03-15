import { staticImplements } from './decorators/static_implements';
import { MathInterface } from './types';

@staticImplements<MathInterface>()
export class MathUtility {
  /**
   * Linearly interpolates between two values a and b using a value t between 0 and 1.
   * @param a The start value.
   * @param b The end value.
   * @param t The interpolation value between 0 and 1.
   * @returns The interpolated value between a and b.
   */
  public static lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /**
   * Clamps a value between a minimum value and a maximum value.
   * @param value The value to clamp.
   * @param min The minimum value.
   * @param max The maximum value.
   * @returns The clamped value.
   */
  public static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  /**
   * Normalizes a value between a minimum value and a maximum value.
   * @param value The value to normalize.
   * @param min The minimum value.
   * @param max The maximum value.
   * @returns The normalized value between 0 and 1.
   */
  public static normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
  }

  /**
   * Generates a random number between a minimum value and a maximum value.
   * @param min The minimum value.
   * @param max The maximum value.
   * @returns The random number between min and max.
   */
  public static random_range(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Calculates the distance between two points.
   * @param x1 The x coordinate of the first point.
   * @param y1 The y coordinate of the first point.
   * @param x2 The x coordinate of the second point.
   * @param y2 The y coordinate of the second point.
   * @returns The distance between the two points.
   */
  public static distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Converts an angle in degrees to radians.
   * @param degrees The angle in degrees.
   * @returns The angle in radians.
   */
  public static degrees_to_radians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Converts an angle in radians to degrees.
   * @param radians The angle in radians.
   * @returns The angle in degrees.
   */
  public static radians_to_degrees(radians: number): number {
    return (radians * 180) / Math.PI;
  }
}
