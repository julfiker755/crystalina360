"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const colorBox = [
  "#828282",
  "black",
  "red",
  "green",
  "blue",
  "yellow",
  "pink",
  "purple",
  "orange",
  "brown",
  "white",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "#FF5733",
  "#33FF57",
  "#5733FF",
  "#FF33A6",
  "#33A6FF",
  "#FFC300",
  "#DAF7A6",
  "#C70039",
  "#900C3F",
  "#344e41",
  "#3a86ff",
  "#5e503f",
  "#7b435b",
];

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto min-h-[280px] flex items-center justify-center">
      <Loader className="animate-spin text-reds" />
    </div>
  ),
});

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  className,
}) => {
  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: colorBox }, { background: colorBox }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "align",
    "list",
    "indent",
    "blockquote",
    "code-block",
    "link",
  ];

  return (
    <div className="w-full space-y-1">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className={cn(
          `min-h-[280px] prose text-black! rounded-b-xl`,
          className
        )}
        style={{ color: "#000" }}
      />
    </div>
  );
};

export default TextEditor;

interface QuillTextProps {
  text: string;
  className?: string;
  conStyle?: string;
  editorStyle?: string;
}

//  ========== show text =========
export const QuillText = ({
  text,
  className,
  conStyle,
  editorStyle,
}: QuillTextProps) => {
  return (
    <article className={cn("mb-2", className)}>
      <div className={cn("ql-container ql-snow", conStyle)}>
        <div
          className={cn("ql-editor prose p-0!", editorStyle)}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </article>
  );
};
