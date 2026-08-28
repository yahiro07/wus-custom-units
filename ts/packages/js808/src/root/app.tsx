import { KnobFrame } from "@/components/knob-frame";
import { useSetupDrivers } from "@/root/drivers";
import { store, actions } from "@/root/store";
import { cz } from "@/utils/cz";
import { linearInterpolate, seqNumbers } from "@/utils/helpers";
import { ComponentChildren } from "preact";

const RangeKnob = ({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}) => {
  const isLevel = label === "Level";
  const step = isLevel ? 0.1 : 1;
  const tickAngle = linearInterpolate(value, min, max, -135, 135);
  return (
    <>
      <label>{label}</label>
      <KnobFrame
        className="range-knob-wrapper"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      >
        <div
          class={cz("range-knob", isLevel && "alt-color")}
          style={{ transform: `rotate(${tickAngle}deg)` }}
        ></div>
      </KnobFrame>
    </>
  );
};

const ToggleButton = ({
  active,
  onChange,
}: {
  active: boolean;
  onChange: (active: boolean) => void;
}) => {
  return (
    <button
      class={cz("drum-toggle", active && "use-alt")}
      onPointerDown={(e) => {
        onChange(!active);
        e.stopPropagation();
      }}
    />
  );
};

const PartFrame = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ComponentChildren;
}) => {
  return (
    <div class={cz("drum", active && "active")} onPointerDown={onClick}>
      {children}
    </div>
  );
};

const StepDots = ({ pattern }: { pattern: number }) => {
  return (
    <div class="step-dots">
      {seqNumbers(16).map((i) => {
        const active = (pattern & (1 << i)) > 0;
        return <div class={cz(active && "active")}></div>;
      })}
    </div>
  );
};

const ParametersEditPart = () => {
  const { parameters, currentPartKey, stepPatterns } = store.useSnapshot();
  return (
    <div id="drums">
      <PartFrame
        active={currentPartKey === "bd"}
        onClick={() => actions.setCurrentPart("bd")}
      >
        <RangeKnob
          label="Level"
          value={parameters.bdLevel}
          onChange={(v) => actions.setParameter("bdLevel", v)}
          min={0}
          max={10}
        />
        <RangeKnob
          label="Tone"
          value={parameters.bdTone}
          onChange={(v) => actions.setParameter("bdTone", v)}
          min={0}
          max={4}
        />
        <RangeKnob
          label="Decay"
          value={parameters.bdDecay}
          onChange={(v) => actions.setParameter("bdDecay", v)}
          min={0}
          max={4}
        />
        <h2>BassDrum</h2>
        <StepDots pattern={stepPatterns.bd} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "sd"}
        onClick={() => actions.setCurrentPart("sd")}
      >
        <RangeKnob
          label="Level"
          value={parameters.sdLevel}
          onChange={(v) => actions.setParameter("sdLevel", v)}
          min={0}
          max={10}
        />
        <RangeKnob
          label="Tone"
          value={parameters.sdTone}
          onChange={(v) => actions.setParameter("sdTone", v)}
          min={0}
          max={4}
        />
        <RangeKnob
          label="Snappy"
          value={parameters.sdSnappy}
          onChange={(v) => actions.setParameter("sdSnappy", v)}
          min={0}
          max={4}
        />
        <h2>SnareDrum</h2>
        <StepDots pattern={stepPatterns.sd} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "lc"}
        onClick={() => actions.setCurrentPart("lc")}
      >
        <RangeKnob
          label="Level"
          value={parameters.lcLevel}
          onChange={(v) => actions.setParameter("lcLevel", v)}
          min={0}
          max={10}
        />
        <RangeKnob
          label="Tuning"
          value={parameters.lcTuning}
          onChange={(v) => actions.setParameter("lcTuning", v)}
          min={0}
          max={4}
        />
        <h2>LowConga</h2>
        <ToggleButton
          active={parameters.lcAltPiece}
          onChange={(v) => actions.setParameter("lcAltPiece", v)}
        />
        <h2>LowTom</h2>
        <StepDots pattern={stepPatterns.lc} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "mc"}
        onClick={() => actions.setCurrentPart("mc")}
      >
        <RangeKnob
          label="Level"
          value={parameters.mcLevel}
          onChange={(v) => actions.setParameter("mcLevel", v)}
          min={0}
          max={10}
        />
        <RangeKnob
          label="Tuning"
          value={parameters.mcTuning}
          onChange={(v) => actions.setParameter("mcTuning", v)}
          min={0}
          max={4}
        />
        <h2>MidConga</h2>
        <ToggleButton
          active={parameters.mcAltPiece}
          onChange={(v) => actions.setParameter("mcAltPiece", v)}
        />
        <h2>MidTom</h2>
        <StepDots pattern={stepPatterns.mc} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "hc"}
        onClick={() => actions.setCurrentPart("hc")}
      >
        <RangeKnob
          label="Level"
          value={parameters.hcLevel}
          onChange={(v) => actions.setParameter("hcLevel", v)}
          min={0}
          max={10}
        />
        <RangeKnob
          label="Tuning"
          value={parameters.hcTuning}
          onChange={(v) => actions.setParameter("hcTuning", v)}
          min={0}
          max={4}
        />
        <h2>HiConga</h2>
        <ToggleButton
          active={parameters.hcAltPiece}
          onChange={(v) => actions.setParameter("hcAltPiece", v)}
        />
        <h2>HiTom</h2>
        <StepDots pattern={stepPatterns.hc} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "cl"}
        onClick={() => actions.setCurrentPart("cl")}
      >
        <RangeKnob
          label="Level"
          value={parameters.clLevel}
          onChange={(v) => actions.setParameter("clLevel", v)}
          min={0}
          max={10}
        />
        <h2>CLaves</h2>
        <ToggleButton
          active={parameters.clAltPiece}
          onChange={(v) => actions.setParameter("clAltPiece", v)}
        />
        <h2>RimShot</h2>
        <StepDots pattern={stepPatterns.cl} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "ma"}
        onClick={() => actions.setCurrentPart("ma")}
      >
        <RangeKnob
          label="Level"
          value={parameters.maLevel}
          onChange={(v) => actions.setParameter("maLevel", v)}
          min={0}
          max={10}
        />
        <h2>MAracas</h2>
        <ToggleButton
          active={parameters.maAltPiece}
          onChange={(v) => actions.setParameter("maAltPiece", v)}
        />
        <h2>ClaP</h2>
        <StepDots pattern={stepPatterns.ma} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "cb"}
        onClick={() => actions.setCurrentPart("cb")}
      >
        <RangeKnob
          label="Level"
          value={parameters.cbLevel}
          onChange={(v) => actions.setParameter("cbLevel", v)}
          min={0}
          max={10}
        />
        <h2>CowBell</h2>
        <StepDots pattern={stepPatterns.cb} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "cy"}
        onClick={() => actions.setCurrentPart("cy")}
      >
        <RangeKnob
          label="Level"
          value={parameters.cyLevel}
          onChange={(v) => actions.setParameter("cyLevel", v)}
          min={0}
          max={10}
        />
        <RangeKnob
          label="Tone"
          value={parameters.cyTone}
          onChange={(v) => actions.setParameter("cyTone", v)}
          min={0}
          max={4}
        />
        <RangeKnob
          label="Decay"
          value={parameters.cyDecay}
          onChange={(v) => actions.setParameter("cyDecay", v)}
          min={0}
          max={4}
        />
        <h2>CYmbal</h2>
        <StepDots pattern={stepPatterns.cy} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "oh"}
        onClick={() => actions.setCurrentPart("oh")}
      >
        <RangeKnob
          label="Level"
          value={parameters.ohLevel}
          onChange={(v) => actions.setParameter("ohLevel", v)}
          min={0}
          max={10}
        />
        <RangeKnob
          label="Decay"
          value={parameters.ohDecay}
          onChange={(v) => actions.setParameter("ohDecay", v)}
          min={0}
          max={4}
        />
        <h2>OpenHihat</h2>
        <StepDots pattern={stepPatterns.oh} />
      </PartFrame>
      <PartFrame
        active={currentPartKey === "ch"}
        onClick={() => actions.setCurrentPart("ch")}
      >
        <RangeKnob
          label="Level"
          value={parameters.chLevel}
          onChange={(v) => actions.setParameter("chLevel", v)}
          min={0}
          max={10}
        />
        <h2>Cls'dHihat</h2>
        <StepDots pattern={stepPatterns.ch} />
      </PartFrame>
    </div>
  );
};

const SequencerSection = () => {
  const { currentPartKey, stepPatterns, playStepPos } = store.useSnapshot();
  const pattern = stepPatterns[currentPartKey];
  const toggleStep = (i: number) => {
    const newPattern = pattern ^ (1 << i);
    actions.setStepCurrentPartStepPattern(newPattern);
  };
  return (
    <div id="sequencer">
      {seqNumbers(16).map((i) => {
        const active = (pattern & (1 << i)) > 0;
        const current = i === playStepPos;
        return (
          <button
            key={i}
            data-pos={i}
            class={cz(active && "active", current && "current")}
            onClick={() => toggleStep(i)}
          >
            &#9679;
          </button>
        );
      })}
    </div>
  );
};

const PlayButtonContainer = () => {
  const { stdPlaying } = store.useSnapshot();
  return (
    <button
      id="play"
      class={cz(stdPlaying && "playing")}
      onClick={actions.toggleStdPlayState}
    >
      <span>Start</span>
      <span>Stop</span>
    </button>
  );
};

const PageRoot = () => {
  return (
    <div id="drum-machine">
      <ParametersEditPart />
      <div class="name-row">
        <PlayButtonContainer />
        <div id="name">
          <h1>
            Rhythm Composer
            <span>JS808</span>
          </h1>
          <h2>Computer Controlled</h2>
        </div>
      </div>
      <SequencerSection />
    </div>
  );
};

export const App = () => {
  useSetupDrivers();
  return <PageRoot />;
};
