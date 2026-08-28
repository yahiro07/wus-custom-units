import {
  allPartKeys,
  DrumParameters,
  defaultDrumParameters,
} from "@/root/definitions";
import { store } from "@/root/store";

const STATE_REVISION = 1;
const PARAM_KEYS = Object.keys(defaultDrumParameters) as (keyof DrumParameters)[];
const STATE_BYTE_LENGTH = 1 + PARAM_KEYS.length + allPartKeys.length * 2;

function encodeParam(key: keyof DrumParameters, value: DrumParameters[keyof DrumParameters]): number {
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  if (key.endsWith("Level")) {
    return Math.round(value * 10);
  }
  return Math.round(value);
}

function decodeParam(
  key: keyof DrumParameters,
  byte: number,
): DrumParameters[keyof DrumParameters] {
  if (typeof defaultDrumParameters[key] === "boolean") {
    return byte !== 0;
  }
  if (key.endsWith("Level")) {
    return byte / 10;
  }
  return byte;
}

export function emitStateBytes(): Uint8Array {
  const { parameters, stepPatterns } = store.state;
  const bytes = new Uint8Array(STATE_BYTE_LENGTH);
  bytes[0] = STATE_REVISION;
  let offset = 1;
  for (const key of PARAM_KEYS) {
    bytes[offset++] = encodeParam(key, parameters[key]);
  }
  for (const partKey of allPartKeys) {
    const pattern = stepPatterns[partKey] & 0xffff;
    bytes[offset++] = pattern & 0xff;
    bytes[offset++] = (pattern >> 8) & 0xff;
  }
  return bytes;
}

export function applyStateBytes(stateBytes: Uint8Array): void {
  if (!stateBytes || stateBytes.length < STATE_BYTE_LENGTH) {
    return;
  }
  if (stateBytes[0] !== STATE_REVISION) {
    return;
  }
  const parameters = { ...defaultDrumParameters };
  let offset = 1;
  for (const key of PARAM_KEYS) {
    (parameters[key] as DrumParameters[typeof key]) = decodeParam(
      key,
      stateBytes[offset++],
    ) as DrumParameters[typeof key];
  }
  const stepPatterns = { ...store.state.stepPatterns };
  for (const partKey of allPartKeys) {
    const lo = stateBytes[offset++];
    const hi = stateBytes[offset++];
    stepPatterns[partKey] = lo | (hi << 8);
  }
  store.setParameters(parameters);
  store.setStepPatterns(stepPatterns);
  store.setCurrentPartKey("bd");
}
