import { Renderers } from "helpers/Renderers";
import { createRef, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import ReactMarkdown from "react-markdown";

export default function TextEditor({ value, setValue, rows }) {
  const [currentPage, setCurrentPage] = useState("markdown");

  const setPreview = () => setCurrentPage("preview");
  const setMarkdown = () => setCurrentPage("markdown");

  const EditorEditable = createRef();

  const onChange = (event) => {
    setValue({ text: event.currentTarget.innerText, html: event.target.value });
  };

  useEffect(() => {
    if (currentPage === "preview") {
      console.log(value);
    }
  }, [currentPage]);

  return (
    <div className="w-full rounded-sm pb-0">
      <header className="bg-white ">
        <button
          onClick={setMarkdown}
          className={`px-6 py-2 text-sm rounded-md font-semibold ${
            currentPage === "markdown" ? "text-blue-500" : "text-gray-200 hover:text-gray-400"
          } outline-none focus:outline-none`}
        >
          Markdown
        </button>
        <button
          onClick={setPreview}
          className={`px-6 py-2 text-sm rounded-md font-semibold ${
            currentPage === "preview" ? "text-blue-500" : "text-gray-200 hover:text-gray-400"
          } outline-none focus:outline-none`}
        >
          Önizleme
        </button>
      </header>
      {currentPage === "markdown" ? (
        <ContentEditable
          className="w-full bg-gray-100 rounded-md mb-0 mhe resize-none outline-none focus:outline-none px-6 py-4"
          ref={EditorEditable}
          html={value.html}
          placeholder="Markdown yazdığını unutma"
          onChange={onChange}
        />
      ) : (
        <ReactMarkdown
          renderers={Renderers}
          allowDangerousHtml
          className="w-full mb-0 bg-gray-100 rounded-md mhe resize-none contentMarkdown outline-none focus:outline-none px-6 py-4"
          children={value.text}
        />
      )}
      <style jsx>
        {`
          .mhe {
            height: 120px;
            min-height: 120px;
          }
        `}
      </style>
    </div>
  );
}
