import { applyStateBytes, emitStateBytes } from "@/root/persistence";
import { createSequencer } from "@/root/sequencer";
import { store } from "@/root/store";
import { createSequencerTickDriver } from "@/utils/sequencer-tick-driver";
import { useEffect } from "preact/hooks";
import { queryUnitInterface } from "wafer-host/unit-types";

const unitInterface = queryUnitInterface("wafer-v01");
const audioContext = unitInterface?.audioContext ?? new AudioContext();

const sequencer = createSequencer(unitInterface, audioContext);
const sequencerTickDriver = createSequencerTickDriver(audioContext);

const sequencerWrapper = {
  processStep(stepIndex: number, time: number) {
    sequencer.processStep(stepIndex, time);
    store.setPlayStepPos(stepIndex % 16);
  },
  stop() {
    store.setPlayStepPos(-1);
  },
};

function setupUnit() {
  unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      viewSize: [1020, 556],
    },
    hostCallbacks: {
      setBpm(bpm) {
        sequencerTickDriver.setBpm(bpm);
      },
    },
    clockHandlers: {
      processStep: sequencerWrapper.processStep,
      stop: sequencerWrapper.stop,
    },
    persistence: {
      emitStateBytes,
      applyStateBytes,
    },
    cleanup: sequencer.cleanup,
  });
}

function setupSynchronization() {
  store.subscribe(({ parameters, stepPatterns, stdPlaying }) => {
    if (parameters) {
      sequencer.setParameters(parameters);
    }
    if (stepPatterns) {
      sequencer.setStepPatterns(stepPatterns);
    }
    if (stdPlaying !== undefined) {
      if (stdPlaying) {
        sequencerTickDriver.start(sequencerWrapper);
      } else {
        sequencerTickDriver.stop();
      }
    }
  }, true);
}

export function useSetupDrivers() {
  useEffect(setupUnit, []);
  useEffect(setupSynchronization, []);
}
