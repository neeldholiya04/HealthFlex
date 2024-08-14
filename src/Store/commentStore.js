import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCommentStore = create(
  persist(
    (set) => ({
      comments: [],
      addComment: (comment) => set((state) => ({ comments: [...state.comments, comment] })),
      editComment: (id, text) =>
        set((state) => ({
          comments: state.comments.map((c) => updateComment(c, id, text)),
        })),
      deleteComment: (id) =>
        set((state) => ({
          comments: deleteCommentRecursive(state.comments, id),
        })),
      addReply: (parentId, reply) =>
        set((state) => ({
          comments: state.comments.map((c) => addReplyToComment(c, parentId, reply)),
        })),
    }),
    {
      name: 'comments-storage',
    }
  )
);

// Helper function to recursively update a comment or its nested replies
const updateComment = (comment, id, text) => {
  if (comment.id === id) {
    return { ...comment, text, editedAt: new Date().toISOString() };
  }
  if (comment.replies) {
    return {
      ...comment,
      replies: comment.replies.map((reply) => updateComment(reply, id, text)),
    };
  }
  return comment;
};

// Helper function to recursively add a reply to a comment or its nested replies
const addReplyToComment = (comment, parentId, reply) => {
  if (comment.id === parentId) {
    return {
      ...comment,
      replies: [...(comment.replies || []), reply],
    };
  }
  if (comment.replies) {
    return {
      ...comment,
      replies: comment.replies.map((r) => addReplyToComment(r, parentId, reply)),
    };
  }
  return comment;
};

// Helper function to recursively delete a comment and its replies
const deleteCommentRecursive = (comments, id) => {
  return comments.filter((comment) => comment.id !== id).map((comment) => {
    if (comment.replies) {
      return {
        ...comment,
        replies: deleteCommentRecursive(comment.replies, id),
      };
    }
    return comment;
  });
};

export default useCommentStore;