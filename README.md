# Comments Section Project

## Table of Contents
- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Component Breakdown](#component-breakdown)
- [State Management](#state-management)
- [Styling](#styling)
- [Responsive Design](#responsive-design)
- [Deployment](#deployment)

## Overview

This project is a dynamic, interactive comments section built with React and Zustand. It allows users to post comments, reply to existing comments with unlimited nesting depth, edit their comments, and delete comments. The application features a modern, responsive design with smooth animations and a user-friendly interface.

## Live Demo

You can view the live demo of the project here: [Comments Section Demo](https://health-flex-alpha.vercel.app/)

## Features

- Add new comments
- Reply to existing comments with unlimited nesting depth
- Edit comments
- Delete comments with confirmation
- Sort comments by newest or oldest
- Nested replies with collapsible threads
- Responsive design for mobile and desktop
- Smooth animations for better user experience
- Persistent storage using Zustand and localStorage
- Accessibility considerations

## Technologies Used

- React 17.0.2
- Zustand 3.5.7 (for state management)
- Tailwind CSS 2.2.19 (for styling)
- date-fns 2.28.0 (for date formatting)
- Vercel (for deployment)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 14.0 or later)
- npm (usually comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/neeldholiya04/HealthFlex.git
   ```

2. Navigate to the project directory:
   ```
   cd HealthFlex
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

1. **Adding a Comment**: Use the comment form at the top of the page to add a new comment. Enter your name and the comment text, then click "Post Comment".

2. **Replying to a Comment**: Click the "Reply" button on any comment to open a reply form. Enter your name and reply text, then click "Reply". You can reply to replies, creating nested conversations.

3. **Viewing Nested Replies**: Replies to comments are indented and can be collapsed or expanded. Click the "Show Replies" or "Hide Replies" button to toggle the visibility of nested replies.

4. **Editing a Comment**: Click the "Edit" button on your comment to edit it. Update the text and click "Save".

5. **Deleting a Comment**: Click the "X" button on a comment to delete it. A confirmation modal will appear before the comment is permanently deleted. Deleting a parent comment will also remove all its nested replies.

6. **Sorting Comments**: Use the dropdown menu at the top of the comments section to sort comments by newest or oldest. This sorting applies to top-level comments only; replies remain in chronological order within their threads.

## Project Structure

```
HealthFlex/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Comment.js
│   │   ├── CommentForm.js
│   │   └── Modal.js
│   ├── store/
│   │   └── commentStore.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Component Breakdown

- `App.js`: The main component that orchestrates the entire application.
- `Comment.js`: Renders individual comments and handles comment actions.
- `CommentForm.js`: Provides a form for adding new comments or replies.
- `Modal.js`: A reusable modal component for confirmations.

## State Management

This project uses Zustand for state management. The store is defined in `src/store/commentStore.js` and includes actions for adding, editing, and deleting comments, as well as adding replies.

## Styling

Tailwind CSS is used for styling the application. Custom styles are defined in `src/styles/index.css`.

## Responsive Design

The application is fully responsive and works well on both mobile and desktop devices. Media queries and Tailwind's responsive utilities are used to ensure a good user experience across all screen sizes.


## Deployment

The application is deployed on Vercel. The live demo can be accessed at [https://health-flex-alpha.vercel.app/](https://health-flex-alpha.vercel.app/).

