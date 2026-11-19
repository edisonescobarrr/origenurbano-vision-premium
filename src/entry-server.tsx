import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";

export { absoluteUrl, getIndexablePaths, getPageMeta } from "./lib/routeMeta";
export { COMPANY } from "./data/company";
export { SERVICES } from "./data/services";

/** HTML de una página ya dibujada, esperando a que carguen sus partes diferidas (React.lazy) */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    let html = "";
    stream.on("data", (chunk) => {
      html += chunk.toString();
    });
    stream.on("end", () => resolve(html));

    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>,
      {
        onAllReady() {
          pipe(stream);
        },
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
