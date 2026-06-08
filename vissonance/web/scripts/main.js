if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
} else {
  var audioAnalyser = new AudioAnalyser();
  audioAnalyser.init();

  var view = new View();
  view.init(audioAnalyser);

  var controller = new Controller();
  controller.init(audioAnalyser, view);

  if (window.unitInterface) {
    audioAnalyser.setSourceNode(unitInterface.primaryInputPort.audioInput.node);
    window.unitInterface?.completeSetup({
      unitAspects: {
        unitType: "effect",
        categoryHint: "visualizer",
        inputs: ["audio"],
      },
    });
  } else {
    var dragDropUpload = new DragDropUpload();
    dragDropUpload.init(audioAnalyser);
  }
}
