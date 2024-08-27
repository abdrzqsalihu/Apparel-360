import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// Helper function to decode HTML entities
function decodeHtmlEntities(str) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
}

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
            // ["link", "image"], // Add more options as needed
          ],
        },
      });

      // Update the parent component when the editor content changes
      quillRef.current.on("text-change", () => {
        const content = quillRef.current.root.innerHTML;
        onChange(content);
      });

      // Set initial content
      quillRef.current.root.innerHTML = decodeHtmlEntities(value) || "";
    }
  }, [onChange, value]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = decodeHtmlEntities(value);
    }
  }, [value]);

  return (
    <div className="mt-2">
      <div
        ref={editorRef}
        className="h-[12.5rem] bg-gray-100 border rounded-lg p-2"
      ></div>
    </div>
  );
};

export default QuillEditor;
