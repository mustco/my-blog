"use client";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import { LuClipboard, LuClipboardCheck } from "react-icons/lu";
import { useState } from "react";

SyntaxHighlighter.registerLanguage("javascript", js);
const CodeSyntaxHighlight = ({ code }: { code: string }) => {
  const [clipboard, setClipboard] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setClipboard(true);
    setTimeout(() => {
      setClipboard(false);
    }, 5000);
  };
  return (
    <div className="relative w-full md:w-2/3 mb-5">
      <SyntaxHighlighter
        language="javascript"
        style={darcula}
        className="rounded-lg relative"
      >
        {code}
      </SyntaxHighlighter>
      <div className="absolute h-full bottom-0 right-0 ">
        <button
          onClick={handleCopy}
          className="sticky top-4 mt-1 mr-1 mb-1  rounded-md px-[1px] py-[3px] text-gray-200 text-sm bg-blue-700 dark:bg-green-800 dark:text-gray-200"
        >
          {clipboard ? (
            <LuClipboardCheck className="text-xl" />
          ) : (
            <LuClipboard className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};
export default CodeSyntaxHighlight;
