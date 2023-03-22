import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function CodeView({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  return (
    <SyntaxHighlighter language={language} style={docco}>
      {children}
    </SyntaxHighlighter>
  );
}
