import { render } from "preact";
import "./style.css";
import { App } from "@/root/app";
import { onIframeUnitUnloading } from "wafer-host/unit-types";

const root = document.getElementById("app")!;
render(<App />, root);

onIframeUnitUnloading(() => {
  render(null, root);
});
