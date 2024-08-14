import React, { useState } from 'react';
import CommentForm from './components/CommentForm';
import Comment from './components/Comment';
import Modal from './components/Modal';
import useCommentStore from './Store/commentStore';

const App = () => {
  const { comments, addComment, editComment, deleteComment, addReply } = useCommentStore();
  const [sortOrder, setSortOrder] = useState('desc');
  const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, commentId: null });
  const [deletingComments, setDeletingComments] = useState(new Set());

  const handleAddComment = (newComment) => {
    addComment({
      id: Date.now(),
      ...newComment,
      createdAt: new Date().toISOString(),
      replies: [],
    });
  };

  const handleDeleteClick = (commentId) => {
    setDeletingComments(prev => new Set(prev).add(commentId));
    setDeleteModalState({ isOpen: true, commentId });
  };

  const handleDeleteConfirm = () => {
    deleteComment(deleteModalState.commentId);
    setDeleteModalState({ isOpen: false, commentId: null });
    setDeletingComments(prev => {
      const newSet = new Set(prev);
      newSet.delete(deleteModalState.commentId);
      return newSet;
    });
  };

  const handleCloseModal = () => {
    setDeleteModalState({ isOpen: false, commentId: null });
    setDeletingComments(prev => {
      const newSet = new Set(prev);
      newSet.delete(deleteModalState.commentId);
      return newSet;
    });
  };

  const sortedComments = [...comments].sort((a, b) => {
    return sortOrder === 'desc'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Comments Section</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a Comment</h2>
          <CommentForm onSubmit={handleAddComment} submitLabel="Post Comment" />
        </div>
        <div className="mb-6 flex justify-end">
          <label className="mr-2 text-gray-700">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        <div className="space-y-6">
          {sortedComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onEdit={editComment}
              onDelete={handleDeleteClick}
              onReply={addReply}
              isDeleting={deletingComments.has(comment.id)}
              onCancelDelete={handleCloseModal}
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={deleteModalState.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone and will remove all replies to this comment."
      />
    </div>
  );
};

export default App;