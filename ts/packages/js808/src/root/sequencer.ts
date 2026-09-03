import {
  allPartKeys,
  createMachineEditState,
  DrumParameters,
  PartKey,
} from "@/root/definitions";
import { createSamplePlayer } from "@/root/sample-player";
import { UnitInterface } from "wafer-host/unit-types";

export const allSampleKeys: string[] = [
  "BD0000",
  "BD0010",
  "BD0025",
  "BD0050",
  "BD0075",
  "BD1000",
  "BD1010",
  "BD1025",
  "BD1050",
  "BD1075",
  "BD2500",
  "BD2510",
  "BD2525",
  "BD2550",
  "BD2575",
  "BD5000",
  "BD5010",
  "BD5025",
  "BD5050",
  "BD5075",
  "BD7500",
  "BD7510",
  "BD7525",
  "BD7550",
  "BD7575",
  "CB",
  "CH",
  "CL",
  "CP",
  "CY0000",
  "CY0010",
  "CY0025",
  "CY0050",
  "CY0075",
  "CY1000",
  "CY1010",
  "CY1025",
  "CY1050",
  "CY1075",
  "CY2500",
  "CY2510",
  "CY2525",
  "CY2550",
  "CY2575",
  "CY5000",
  "CY5010",
  "CY5025",
  "CY5050",
  "CY5075",
  "CY7500",
  "CY7510",
  "CY7525",
  "CY7550",
  "CY7575",
  "HC00",
  "HC10",
  "HC25",
  "HC50",
  "HC75",
  "HT00",
  "HT10",
  "HT25",
  "HT50",
  "HT75",
  "LC00",
  "LC10",
  "LC25",
  "LC50",
  "LC75",
  "LT00",
  "LT10",
  "LT25",
  "LT50",
  "LT75",
  "MA",
  "MC00",
  "MC10",
  "MC25",
  "MC50",
  "MC75",
  "MT00",
  "MT10",
  "MT25",
  "MT50",
  "MT75",
  "OH00",
  "OH10",
  "OH25",
  "OH50",
  "OH75",
  "RS",
  "SD0000",
  "SD0010",
  "SD0025",
  "SD0050",
  "SD0075",
  "SD1000",
  "SD1010",
  "SD1025",
  "SD1050",
  "SD1075",
  "SD2500",
  "SD2510",
  "SD2525",
  "SD2550",
  "SD2575",
  "SD5000",
  "SD5010",
  "SD5025",
  "SD5050",
  "SD5075",
  "SD7500",
  "SD7510",
  "SD7525",
  "SD7550",
  "SD7575",
];

type PartSpec = {
  knob1?: keyof DrumParameters;
  knob2?: keyof DrumParameters;
  altPiece?: [keyof DrumParameters, string];
};

const partSpecMap: Record<PartKey, PartSpec> = {
  bd: {
    knob1: "bdTone",
    knob2: "bdDecay",
  },
  sd: {
    knob1: "sdTone",
    knob2: "sdSnappy",
  },
  lc: {
    knob1: "lcTuning",
    altPiece: ["lcAltPiece", "lt"],
  },
  mc: {
    knob1: "mcTuning",
    altPiece: ["mcAltPiece", "mt"],
  },
  hc: {
    knob1: "hcTuning",
    altPiece: ["hcAltPiece", "ht"],
  },
  cl: {
    altPiece: ["clAltPiece", "rs"],
  },
  ma: {
    altPiece: ["maAltPiece", "cp"],
  },
  cb: {},
  cy: {
    knob1: "cyTone",
    knob2: "cyDecay",
  },
  oh: {
    knob1: "ohDecay",
  },
  ch: {},
};

type ISequencer = {
  setParameters(parameters: DrumParameters): void;
  setStepPatterns(stepPatterns: Record<PartKey, number>): void;
  processStep(stepIndex: number, time: number): void;
  cleanup(): void;
};

export function createSequencer(
  unitInterface: UnitInterface | undefined,
  audioContext: AudioContext,
): ISequencer {
  const destinationNode =
    unitInterface?.audioOutputNode ?? audioContext.destination;
  const samplePlayer = createSamplePlayer(audioContext, destinationNode);
  samplePlayer.registerSamples(
    allSampleKeys.map((key) => ({
      id: key,
      uri: `samples/${key}.mp3`,
    })),
  );

  const editState = createMachineEditState();

  const knobValuesTextMap = ["00", "25", "50", "75", "00"];

  const internal = {
    handleStep(stepIndex: number, time: number) {
      const { parameters, stepPatterns } = editState;
      stepIndex %= 16;
      for (const partKey of allPartKeys) {
        const stepPattern = stepPatterns[partKey];
        const stepActive = (stepPattern & (1 << stepIndex)) > 0;
        if (stepActive) {
          const partSpec = partSpecMap[partKey];
          const levelKey = `${partKey}Level` as keyof DrumParameters;
          const level = (parameters[levelKey] as number) / 10;
          const knob1Value = partSpec.knob1
            ? (parameters[partSpec.knob1] as number)
            : undefined;
          const knob2Value = partSpec.knob2
            ? (parameters[partSpec.knob2] as number)
            : undefined;
          const knob1Text =
            knob1Value !== undefined ? knobValuesTextMap[knob1Value] : "";
          const knob2Text =
            knob2Value !== undefined ? knobValuesTextMap[knob2Value] : "";

          let pieceName: string = partKey;
          if (partSpec.altPiece) {
            const [altPieceKey, altPieceName] = partSpec.altPiece;
            if (parameters[altPieceKey]) {
              pieceName = altPieceName;
            }
          }
          const sampleKey = `${pieceName.toUpperCase()}${knob1Text}${knob2Text}`;
          samplePlayer.play(sampleKey, { volume: level, time });
        }
      }
    },
  };

  return {
    setParameters(parameters) {
      editState.parameters = parameters;
    },
    setStepPatterns(stepPatterns) {
      editState.stepPatterns = stepPatterns;
    },
    processStep(stepIndex, time) {
      internal.handleStep(stepIndex, time);
    },
    cleanup() {
      samplePlayer.cleanup();
    },
  };
}
