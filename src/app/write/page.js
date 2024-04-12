"use client";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import "react-quill/dist/quill.snow.css";

export default function Write() {
  const QuillNoSSRWrapper = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
        loading: () => <p>Loading ...</p>,
      }),
    []
  );

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["image"],
      ],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "image",
  ];

  const [value, setValue] = useState("");
  console.log(value);
  const inputStyle = "w-full p-4 outline-none"
  return (
    <form>
      <input type="text" className={inputStyle} 
      placeholder="제목을 입력해 주세요." />
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder= "내용을 입력해 주세요."
        style={{
          padding: "0 1rem",
          paddingBottom: "5rem",
          height: "60vh"
        }}
      />
      <div className="flex px-4">
        <label className="w-16 flex items-center">업체명<span className="text-red-500">*</span></label>
        <input type="text" className={inputStyle} placeholder="업체명을 입력해 주세요."/>
      </div>
      <div className="flex px-4">
        <label className="w-16 flex items-center">일정<span className="text-red-500">*</span></label>
        <input type="date" className="p-4" />
        <span className="flex items-center">~</span>
        <input className="p-4" type="date"/>
      </div>
      <div className="flex px-4">
        <label className="w-16 flex items-center">지역<span className="text-red-500">*</span></label>
        <input type="text" className={inputStyle} placeholder="지역을 입력해 주세요."/>
      </div>
      <div className="flex px-4">
        <label className="w-16 flex items-center">장소<span className="text-red-500">*</span></label>
        <input type="text" className={inputStyle} placeholder="장소를 입력해 주세요."/>
      </div>
      <div className="flex justify-end p-4">
        <button className="p-2 bg-[#F08080] text-white font-bold">등록하기</button>
      </div>
    </form>
  );
}