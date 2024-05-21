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

## Installation - loader API + Nextjs Pages router
To install this package in a Plasmic app using the loader API & Nextjs pages router, follow the instructions below.

### 01 - in Plasmic web interface
1. Create a new Plasmic app
2. Rename your app
3. Click the "Publish" button at top-right
4. Add a "Push to Github" step, publishing to a new repo, nextjs, loader method (recommended), typescript
5. Click "publish" and wait for the build to complete

### 02 - On your machine
1. Clone the repo you just created to your local machine
2. In terminal, run `npm install` to install plasmic & it's dependencies
3. `npm install plasmic-render-markdown` to install this package
4. Open `./plasmic-init.ts`. Modify it to import & register the component from `plasmic-render-markdown`. When you're finished it should look like this:
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


## Installation - codegen + Nextjs Pages router
To install this package in a Plasmic app using codegen & Nextjs pages router, follow the instructions below.

### 01 - in Plasmic web interface
1. Create a new Plasmic app
2. Rename your app
3. Click the "Publish" button at top-right
4. Add a "Push to Github" step, publishing to a new repo, nextjs, codegen method, typescript
5. Click "publish" and wait for the build to complete

### 02 - On your machine
1. Clone the repo you just created to your local machine
2. In terminal, run `npm install` to install plasmic & it's dependencies
3. `npm install plasmic-render-markdown` to install this package
4. Open `./pages/plasmic-host.tsx` and update it so it looks like this
```typescript
import * as React from 'react';
import { PlasmicCanvasHost, registerComponent } from '@plasmicapp/react-web/lib/host';

//Import the RenderMarkdown component and it's registration helper function
import { RenderMarkdown, renderMarkdownMeta } from "plasmic-render-markdown";

//Register the plasmic-render-markdown component
registerComponent(RenderMarkdown, renderMarkdownMeta);

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
```
6. In `./pages` directory modify the `_app.tsx` file so it looks like this (note we have removed the global CSS import that comes by default, but you can leave it there if needed):
```typescript
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import type { AppProps } from "next/app";
import Head from "next/head";

//Here we import the bundled CSS from the library
import 'plasmic-render-markdown/dist/assets/style.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlasmicRootProvider Head={Head}>
      <Component {...pageProps} />
    </PlasmicRootProvider>
  );
}
```
7. In terminal: `npm run dev` to start your Dev server


### 03 - in Plasmic web interface
1. Configure you Custom App host to point to http://localhost:3000/plasmic-host
2. When the page reloads, the registered components should be available in Add component -> Custom Components


## Dev notes
For instructions on local testing, testing in a Plasmic app & publishing, see the [plasmic-component-library-template](https://github.com/CallumBoase/plasmic-component-library-template/blob/main/README.md) README which this component library is based on.

### Procedure for publishing updates 
1. Update the version in `package.json` using semantic versioning
2. Update `changelog.md`
3. Push all changes to github
4. Run `npm publish` to publish the new version to npm
5. Create a new release & tag via the github user interface with the same version number as in `package.json`


