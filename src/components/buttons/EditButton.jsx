

import React from "react";

export default function EditButton({ text = "Edit", onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white bg-green-500 hover:bg-green-600 active:bg-green-700 
                 transition-colors duration-200 px-5 py-2 rounded-lg shadow-md 
                 font-semibold flex items-center gap-2"
    >
      <i className="fa-solid fa-pen-to-square"></i>
      {text}
    </button>
  );
}
