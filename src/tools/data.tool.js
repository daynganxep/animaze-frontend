import { COLOR_PALETTE } from "@/configs/palette.config";

import env from "@/configs/env.config";

export const SECTOR_SIZE = env.sector_size;
export const FRAMES_COUNT = env.frames_count;
export const BYTES_PER_PIXEL = 3;

export const NULL_COLOR_INDEX = 255;
export const NULL_ACCOUNT_INDEX = 65535;

export class SectorDataParser {
  constructor(arrayBuffer, accountLegend, colorPalette) {
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      throw new Error('ArrayBuffer cannot be null or empty.');
    }
    this.dataView = new DataView(arrayBuffer);
    this.colorPalette = colorPalette || COLOR_PALETTE;
    this.accountLegend = accountLegend;
  }

  getPixel(frame, x, y) {
    if (frame < 0 || frame >= FRAMES_COUNT || x < 0 || x >= SECTOR_SIZE || y < 0 || y >= SECTOR_SIZE) {
      console.error('Invalid coordinates for getPixel', { frame, x, y });
      return null;
    }
    const pixelStartOffset = (frame * SECTOR_SIZE * SECTOR_SIZE + y * SECTOR_SIZE + x) * BYTES_PER_PIXEL;
    const colorIndex = this.dataView.getUint8(pixelStartOffset);
    const accountIndex = this.dataView.getUint16(pixelStartOffset + 1, true);
    const color = (colorIndex === NULL_COLOR_INDEX) ? null : this.colorPalette[colorIndex];
    const accountId = (accountIndex === NULL_ACCOUNT_INDEX) ? null : this.accountLegend[accountIndex];
    return { color, accountId };
  }
}