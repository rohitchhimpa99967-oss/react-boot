import React from 'react';

export default function DeleteButton({ text = "Delete", onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 px-5 py-2 rounded-lg shadow-md font-semibold flex items-center gap-2"
    >
      <i className="fa-solid fa-trash"></i>
      {text}
    </button>
  );
}
