# Carrot Companion

Welcome to Carrot Companion, a full-stack React application built with Manifest. This app allows users to share and discover interesting facts about carrots.

## Features

- **User Authentication**: Secure user signup and login.
- **Fact Management**: Create, Read, Update, and Delete (CRUD) carrot facts.
- **Ownership**: Users can only edit or delete their own posts.
- **Public Feed**: All carrot facts are visible to everyone.
- **Admin Panel**: A built-in admin interface to manage users and content, accessible at `/admin`.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Manifest
- **Styling**: Tailwind CSS
- **SDK**: `@mnfst/sdk` for all backend communication

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Manifest account and backend project.

### Setup

1.  **Clone the repository**

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory and add your Manifest backend URL:
    ```
    VITE_BACKEND_URL=YOUR_MANIFEST_BACKEND_URL
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Admin Access

- **URL**: `YOUR_MANIFEST_BACKEND_URL/admin`
- **Default Credentials**: `admin@manifest.build` / `admin`
