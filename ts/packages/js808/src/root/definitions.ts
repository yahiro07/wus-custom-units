export type PartKey =
  | "bd"
  | "sd"
  | "lc"
  | "mc"
  | "hc"
  | "cl"
  | "ma"
  | "cb"
  | "cy"
  | "oh"
  | "ch";

export const allPartKeys: PartKey[] = [
  "bd",
  "sd",
  "lc",
  "mc",
  "hc",
  "cl",
  "ma",
  "cb",
  "cy",
  "oh",
  "ch",
];

export type DrumParameters = {
  bdLevel: number;
  bdTone: number;
  bdDecay: number;
  //
  sdLevel: number;
  sdTone: number;
  sdSnappy: number;
  //
  lcLevel: number;
  lcTuning: number;
  lcAltPiece: boolean;
  //
  mcLevel: number;
  mcTuning: number;
  mcAltPiece: boolean;
  //
  hcLevel: number;
  hcTuning: number;
  hcAltPiece: boolean;
  //
  clLevel: number;
  clAltPiece: boolean;
  //
  maLevel: number;
  maAltPiece: boolean;
  //
  cbLevel: number;
  //
  cyLevel: number;
  cyTone: number;
  cyDecay: number;
  //
  ohLevel: number;
  ohDecay: number;
  //
  chLevel: number;
};

export const defaultDrumParameters: DrumParameters = {
  bdLevel: 8,
  bdTone: 2,
  bdDecay: 2,
  sdLevel: 8,
  sdTone: 2,
  sdSnappy: 2,
  lcLevel: 8,
  lcTuning: 2,
  lcAltPiece: false,
  mcLevel: 8,
  mcTuning: 2,
  mcAltPiece: false,
  hcLevel: 8,
  hcTuning: 2,
  hcAltPiece: false,
  clLevel: 8,
  clAltPiece: false,
  maLevel: 8,
  maAltPiece: false,
  cbLevel: 8,
  cyLevel: 8,
  cyTone: 2,
  cyDecay: 2,
  ohLevel: 8,
  ohDecay: 2,
  chLevel: 8,
};

export type MachineEditState = {
  parameters: DrumParameters;
  stepPatterns: Record<PartKey, number>;
};

export function createMachineEditState(): MachineEditState {
  return {
    parameters: { ...defaultDrumParameters },
    stepPatterns: Object.fromEntries(
      allPartKeys.map((key) => [key, 0]),
    ) as Record<PartKey, number>,
  };
}
