import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CommentForm from './CommentForm';

const Comment = ({ comment, onEdit, onDelete, onReply, depth = 0, isDeleting, onCancelDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [isAppearing, setIsAppearing] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAppearing(false), 500);
  }, []);

  const handleEdit = (updatedComment) => {
    onEdit(comment.id, updatedComment.text);
    setIsEditing(false);
  };

  const handleReply = (replyComment) => {
    onReply(comment.id, {
      id: Date.now(),
      ...replyComment,
      createdAt: new Date().toISOString(),
      replies: [],
    });
    setShowReplyForm(false);
  };

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 my-4 transition-all duration-300 ${
        isAppearing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      } ${isDeleting ? 'opacity-50 scale-95' : 'opacity-100 scale-100'} ${
        depth > 0 ? `ml-${Math.min(depth * 4, 12)} border-l-4 border-blue-200` : ''
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{comment.name}</h3>
          <p className="text-sm text-gray-500">
            {format(new Date(comment.createdAt), 'MMM d, yyyy HH:mm')}
          </p>
          {comment.editedAt && (
            <p className="text-xs text-gray-400 italic">
              (Edited: {format(new Date(comment.editedAt), 'MMM d, yyyy HH:mm')})
            </p>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
          aria-label="Delete comment"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {isEditing ? (
        <CommentForm
          initialName={comment.name}
          initialText={comment.text}
          onSubmit={handleEdit}
          submitLabel="Save"
        />
      ) : (
        <>
          <p className="text-gray-700 mb-4">{comment.text}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200"
            >
              Reply
            </button>
            {comment.replies && comment.replies.length > 0 && (
              <button
                onClick={toggleReplies}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors duration-200"
              >
                {showReplies ? 'Hide Replies' : 'Show Replies'}
              </button>
            )}
          </div>
        </>
      )}
      
      {showReplyForm && (
        <div className="mt-4">
          <CommentForm onSubmit={handleReply} submitLabel="Reply" />
        </div>
      )}
      
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onEdit={onEdit}
              onDelete={onDelete}
              onReply={onReply}
              depth={depth + 1}
              isDeleting={isDeleting}
              onCancelDelete={onCancelDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;