function setupWebAudioUnit() {
  window.unitInterface?.completeSetup({
    unitAspects: {
      unitType: "instrument",
      categoryHint: "synthesizer",
      outputs: ["audio"],
      inputs: ["note"],
    },
    noteInput: {
      noteOn(noteNumber) {
        ctrl.note_on(noteNumber);
      },
      noteOff(noteNumber) {
        ctrl.note_off(noteNumber);
      },
    },
  });
}
setupWebAudioUnit();
