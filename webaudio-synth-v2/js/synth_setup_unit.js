function setupWebAudioUnit() {
  window.unitInterface?.completeSetupWithAttributes({
    unitFeatures: {
      type: "instrument",
      categoryHint: "synthesizer",
      outputs: ["audio"],
      inputs: ["note"],
    },
    primaryInputPortHandlers: {
      noteInput: {
        noteOn(noteNumber) {
          ctrl.note_on(noteNumber);
        },
        noteOff(noteNumber) {
          ctrl.note_off(noteNumber);
        },
      },
    },
  });
}
