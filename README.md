# NavisAI Lite

NavisAI Lite is a modern, AI-powered web application designed to streamline post-fixture operations in the shipping industry. It provides a suite of tools to help operators manage voyages, documents, and communications more efficiently.

This application is built with Next.js and leverages Google's Gemini AI through Genkit for its intelligent features.

## Key Features

- **Voyage Dashboard:** A central hub to view and track all your voyages, categorized into Active, Pending, and Completed.
- **AI Email Parser:** Paste the content of shipping-related emails (like NORs or SOFs), and the AI will automatically extract key information, saving you time and reducing manual errors.
- **Laytime Calculator:** Quickly calculate demurrage or despatch based on the allowed laytime, time used, and contractual rates.
- **Document Vault:** A secure and organized repository for all voyage-related documents, with AI-powered tagging for easy retrieval.
- **Collaboration Hub:** A real-time activity feed for each voyage, allowing teams to post comments, track updates, and receive AI-generated suggestions.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **AI Integration:** [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **UI:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

To get started with the application:

1.  **Run the development server:**
    ```bash
    npm run dev
    ```
2.  **Open your browser** to [http://localhost:9002](http://localhost:9002) to see the application.

The main dashboard is located at `src/app/page.tsx`, which serves as a great starting point to explore the codebase.