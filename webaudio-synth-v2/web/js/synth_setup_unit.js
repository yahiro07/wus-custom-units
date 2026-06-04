function setupWebAudioUnit() {
  const unitInterface = window.unitInterface;
  if (unitInterface) {
    unitInterface.declareUnitFeatures({
      type: "instrument",
      categoryHint: "synthesizer",
      outputs: ["audio"],
      inputs: ["note"],
    });
    unitInterface.primaryInputPort.setHandlers({
      noteInput: {
        noteOn(noteNumber) {
          ctrl.note_on(noteNumber);
        },
        noteOff(noteNumber) {
          ctrl.note_off(noteNumber);
        },
      },
    });
    unitInterface.completeSetup();
  }
}
