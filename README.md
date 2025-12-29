# React + Vite Project

This project is built with **React** and **Vite**, providing a fast development experience with Hot Module Replacement (HMR) and modern tooling.

## Tech Stack

* React
* Vite
* ESLint
* Node.js / npm

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the app in your browser at:

   ```
   http://localhost:5173
   ```

## Build

Before deployment, make sure all changes are complete and tested locally.

1. Run the production build:

   ```bash
   npm run build
   ```

2. This command generates the production-ready files and **updates the `docs/` folder**, which is used for deployment.

## Deployment

This project is deployed using the contents of the `docs` folder.

### Deployment Steps

1. Make code changes.
2. Test locally using:

   ```bash
   npm run dev
   ```
3. Create a production build:

   ```bash
   npm run build
   ```
4. Commit the updated `docs/` folder:

   ```bash
   git add docs
   git commit -m "Build: update production files"
   ```
5. Push changes to the main branch:

   ```bash
   git push origin main
   ```

Once pushed, the application will be updated automatically based on the deployment configuration (e.g., GitHub Pages).

## Notes

* Always run `npm run build` **after** making code changes and **before** deploying.
* Do not manually edit files inside the `docs/` folder—these are auto-generated.
* If deployment issues occur, delete `docs/`, rebuild, and redeploy.

