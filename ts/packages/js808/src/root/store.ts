import {
  DrumParameters,
  PartKey,
  MachineEditState,
  createMachineEditState,
} from "@/root/definitions";
import { createStore } from "snap-store";

type StoreState = MachineEditState & {
  currentPartKey: PartKey;
  stdPlaying: boolean;
  playStepPos: number;
};

export const store = createStore<StoreState>({
  ...createMachineEditState(),
  currentPartKey: "bd",
  stdPlaying: false,
  playStepPos: -1,
});

export const actions = {
  setParameter<K extends keyof DrumParameters>(
    key: K,
    value: DrumParameters[K],
  ) {
    store.patchParameters({ [key]: value });
  },
  setCurrentPart(partKey: PartKey) {
    store.setCurrentPartKey(partKey);
  },
  setStepCurrentPartStepPattern(pattern: number) {
    const { currentPartKey } = store.state;
    store.patchStepPatterns({ [currentPartKey]: pattern });
  },
  toggleStdPlayState() {
    store.toggleStdPlaying();
  },
};
