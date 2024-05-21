# plasmic-render-markdown
A component for rendering github flavored markdown for use in a Plasmic app. This component is a wrapper around the `react-markdown` package.

## Contributors
- Callum Boase
   * Github: [CallumBoase](https://github.com/CallumBoase)
   * Website: [Enliven IT](https://enliven-it.com.au/contact)
   * Email: callum.boase@gmail.com
   * Mobile (Australia): +61409 378 253

## Getting help
**Need help with your project?**
Contact one of the contributors using their contact details above.

We provide general support for this package, as well as paid coaching & development in Plasmic & Supabase.

## Installation

### 01 - in Plasmic web interface
1. Create a new Plasmic app
2. Rename your app
3. Click the "Publish" button at top-right
4. Add a "Push to Github" step, publishing to a new repo, nextjs, loader (recommended) method, typescript
5. Click "publish" and wait for the build to complete

### 02 - On your machine
1. Clone the repo you just created to your local machine
2. In terminal, run `npm install` to install plasmic & it's dependencies
3. `npm install plasmic-render-markdown` to install this package
4. Open `./plasmic-init.ts`. It should look like this to start with (default Plasmic comments removed for brevity)
```ts
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "your-plasmic-project-id",
      token: "your-plasmic-project-token",
    },
  ],

  preview: false,
});

```
5. Modify `plasmic-init.ts` to import the component from `plasmic-render-markdown`
```ts
import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { RenderMarkdown, renderMarkdownMeta } from "plasmic-render-markdown";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "your-plasmic-project-id",
      token: "your-plasmic-project-token",
    },
  ],

  preview: true,
});

//Register the plasmic-render-markdown component
PLASMIC.registerComponent(RenderMarkdown, renderMarkdownMeta);

```
6. In `./pages` directory add a new file called `_app.tsx` and add the following content. Save your file
```js
import type { AppProps } from "next/app";

//Here we import the default styling for the plasmic-render-markdown component
//This can be overridden in Plasmic studio via the style props of the component
//Or you could provide your own CSS file/s and import them here instead
//See https://github.com/CallumBoase/plasmic-render-markdown/tree/main/lib/components/RenderMarkdown/light-theme for raw unbundled CSS files
import 'plasmic-render-markdown/dist/assets/style.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}
```
7. In terminal: `npm run dev` to start your Dev server


### 03 - in Plasmic web interface
1. Configure you Custom App host to point to http://localhost:3000/plasmic-host
2. When the page reloads, the registered components should be available in Add component -> Custom Components

## Dev notes
For instructions on local testing, testing in a Plasmic app & publishing, see the [plasmic-component-library-template](https://github.com/CallumBoase/plasmic-component-library-template/blob/main/README.md) README which this component library is based on.


