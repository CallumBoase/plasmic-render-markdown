import "../dist/assets/style.css";
import { RenderMarkdown } from "../";

function App() {

  return (
    <>
      <RenderMarkdown markdownText="# Some markdown content" />
    </>
  );
}

export default App;
