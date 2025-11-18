# Overview

This is a modern web application for filtering mobile phone numbers. The application helps users identify which phone numbers have not yet been processed by comparing two lists: "All Numbers" and "Numbers in Progress". Built with React and Vite, it features a contemporary user interface with gradient backgrounds, smooth animations, and responsive design.

**Date Created**: November 18, 2025

## Purpose

The application solves a common business problem: filtering lists of mobile phone numbers to find which ones haven't been contacted or processed yet. Users can input numbers either by uploading .txt files or by copying and pasting directly into text areas. The filtered results can be copied to clipboard or downloaded as a .txt file for further use.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React 19.2.0 with Vite as the build tool

The frontend uses a modern React setup with:
- Vite for fast development and optimized production builds
- React with JSX for component-based UI
- ESLint for code quality with React-specific rules (hooks and refresh plugins)

**Development Server Configuration**: The Vite server is configured to run on host `0.0.0.0` (accessible externally) on port 5000, which is essential for Replit's environment where the application needs to be accessible from outside the container.

**Rationale**: Vite was chosen over Create React App for faster Hot Module Replacement (HMR) and better build performance, which is critical in educational environments where students need immediate feedback.

## Application State Management

The application uses React's built-in state management with hooks:
- `useState` for managing input text, filtered results, and UI state
- `useEffect` for automatic recalculation of filtered numbers when inputs change
- No external state management library needed due to simple, self-contained logic

## Core Features

1. **Dual Input System**: Two independent input areas for phone number lists
2. **Flexible Data Entry**: 
   - Upload .txt files with FileReader API
   - Direct copy/paste into text areas
3. **Real-time Filtering**: 
   - Automatic deduplication using Set data structure
   - Instant calculation of differences between lists
4. **Export Options**:
   - One-click copy to clipboard
   - Download results as .txt file with Blob API
5. **Visual Feedback**: 
   - Live counters showing unique number counts
   - Success animation on copy
   - Disabled state for buttons when no results

# External Dependencies

## Frontend Dependencies

**Core Libraries**:
- `react` (^19.2.0): UI component framework
- `react-dom` (^19.2.0): React DOM rendering

**Development Tools**:
- `vite` (^7.2.2): Build tool and development server
- `@vitejs/plugin-react` (^5.1.0): React integration for Vite
- ESLint ecosystem for code quality

**TypeScript Support**: Type definitions are included (`@types/react`, `@types/react-dom`) even though the project uses JavaScript, suggesting potential future TypeScript migration or better IDE support.

## Build and Development Tools

**Package Manager**: npm (evidenced by package-lock.json)

**Linting Configuration**: Modern flat config ESLint setup with:
- Browser globals
- React Hooks linting rules
- React Refresh rules for Fast Refresh support
- Custom rule to allow unused variables with uppercase names (likely for constants)

**No Database**: The application is purely client-side and requires no backend or database. All processing happens in the browser.

**No Backend API**: This is a static client-side application with no server-side logic required.

## Development Environment

**Replit-Specific Configuration**: The Vite server configuration with `host: '0.0.0.0'` and `allowedHosts: true` indicates this is specifically configured for Replit's container environment where applications need to bind to all network interfaces.
