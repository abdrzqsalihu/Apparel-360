import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = () => {
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
            // [{ color: [] }, { background: [] }],

            // ["link", "image"],
          ],
        },
      });
    }
  }, []);

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
