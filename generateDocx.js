import * as fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

const doc = new Document({
    creator: "AI Assistant",
    title: "Daily Task Tracker Documentation",
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "Daily Task Tracker - Development Documentation",
                    heading: HeadingLevel.TITLE,
                }),
                new Paragraph({
                    text: "Overview",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("This document serves as a comprehensive guide to building the Daily Task Tracker web application from start to finish. It covers every command used, the architectural decisions made, and simple explanations of the underlying technologies used.")
                    ]
                }),
                new Paragraph({
                    text: "1. Environment Setup & Project Initialization",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("The application uses React as its frontend library. We initialized it using Vite, which provides a lightning-fast development environment and optimized production builds.")
                    ]
                }),
                new Paragraph({ text: "Commands Executed:", heading: HeadingLevel.HEADING_3 }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "npx -y create-vite@latest ./ --template react", font: "Courier New" })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "npm install", font: "Courier New" })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "npm install -D @tailwindcss/vite tailwindcss postcss autoprefixer", font: "Courier New" })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "npm install lucide-react date-fns clsx tailwind-merge", font: "Courier New" })
                    ]
                }),
                new Paragraph({ text: "Explaining the Dependencies:", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "lucide-react: ", bold: true }),
                        new TextRun("Provides modern, clean SVG icons (like the hamburger menu, checkmarks, etc.).")
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "date-fns: ", bold: true }),
                        new TextRun("A lightweight Javascript library for parsing, formatting, and calculating dates (crucial for our Calendar and Monthly features).")
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "clsx & tailwind-merge: ", bold: true }),
                        new TextRun("Utilities to conditionally combine CSS classes cleanly without styling conflicts.")
                    ]
                }),
                new Paragraph({
                    text: "2. Configuring TailwindCSS",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("TailwindCSS allows us to style our application directly inside our React components using utility classes, instead of writing separate large CSS files.")
                    ]
                }),
                new Paragraph({
                    text: "3. Data Persistence (Local Storage)",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("Because the prompt requested 'no backend required,' we must save user data directly in the browser. We achieve this using the browser's native LocalStorage API. LocalStorage is a tiny, persistent key-value database built into every modern web browser. Data saved here survives page refreshes and browser closures. It only stores strings, so we must convert our Javascript Objects to strings before saving them (using JSON.stringify()), and convert them back to objects when reading them.")
                    ]
                }),
                new Paragraph({
                    text: "The Custom React Hook",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    children: [
                        new TextRun("Instead of rewriting LocalStorage logic everywhere, we created a reusable React Hook (useLocalStorage.js). It intercepts calls to read/write state. When the App loads, the hook attempts to read from localStorage. Whenever the task data changes in React, the hook automatically saves it back.")
                    ]
                }),
                new Paragraph({
                    text: "4. UI Architecture & Components",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("React is completely modular, meaning we break the App down into lego-like pieces (components). Fundamental components include the Navbar, SidebarMenu, TaskItem, and ProgressWheel. The ProgressWheel is particularly interesting, utilizing SVG math stroke-dashoffset to visually 'fill' a circle based on completion percentage.")
                    ]
                }),
                new Paragraph({
                    text: "5. Application Views",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("The App's state tracks which 'page' the user is on and renders the corresponding View Component. Views include HomeView (Dashboard), EditTasksView (Master tasks), CalendarView, and MonthlySummaryView.")
                    ]
                }),
                new Paragraph({
                    text: "6. Beautification and UI Polish",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("To ensure the app felt premium, we applied glassmorphism (backdrop-blur), rich gradients, micro-interactions, and soft drop shadows using Tailwind utility classes.")
                    ]
                })
            ]
        }
    ]
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Track_App_Documentation.docx", buffer);
    console.log("Document created successfully");
});
