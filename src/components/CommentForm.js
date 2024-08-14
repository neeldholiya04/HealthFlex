import React, { useState } from 'react';

const CommentForm = ({ onSubmit, initialName = '', initialText = '', submitLabel }) => {
  const [name, setName] = useState(initialName);
  const [text, setText] = useState(initialText);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && text.trim()) {
      onSubmit({ name, text });
      if (!initialName && !initialText) {
        setName('');
        setText('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400 transition duration-150 ease-in-out sm:text-sm"
          required
          disabled={!!initialName}
        />
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Your Comment
        </label>
        <textarea
          id="comment"
          rows="4"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 hover:border-gray-400 transition duration-150 ease-in-out sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      >
        {submitLabel || 'Submit'}
      </button>
    </form>
  );
};

export default CommentForm;