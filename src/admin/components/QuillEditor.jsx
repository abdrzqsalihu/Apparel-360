import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// eslint-disable-next-line react/prop-types
const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null); // To hold the Quill instance

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });

      // Update the parent component when the editor content changes
      quillRef.current.on("text-change", () => {
        const content = quillRef.current.root.innerHTML;
        onChange(content);
      });
    }
  }, [onChange]);

  // Set initial content
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="mt-2">
      <div
        ref={editorRef}
        className="h-[12.5rem] bg-gray-100 border  rounded-b-lg  p-2"
      ></div>
    </div>
  );
};

export default QuillEditor;
