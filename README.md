# notdilbarsl.github.io
Website Link : https://notdilbarsl.github.io/

## Assignment 2: Project Enhancements

### Tools Used

- **ESLint**: For linting the codebase.
- **SonarJS**: To identify code duplication and code smells.
- **Jest**: For system testing.

### How to Use the Tools

- **Linting**: Run `npx eslint .` in the terminal.
- **Testing**: Execute `npm test` in the terminal.

### Changes Made

1. **Initial Linting and Code Refactoring**:
   - During the initial linting process, I discovered numerous issues related to unused variables and imports. This was because functions were spread across various files without proper import/export statements.
   - To resolve this, I transitioned to JavaScript modules and ensured that all import/export statements were correctly implemented. This change resolved approximately 100 of the 400 errors flagged by the linter.
   - Addressed code duplication and complexity issues using SonarJS. Reconfigured ESLint to flag errors for cognitive and cyclomatic complexity exceeding a threshold of 10.

2. **Addressing Code Duplication and Complexity:**:
   - I used the SonarJS plugin to identify and eliminate code duplication.
   - I reconfigured the ESLint settings to flag errors if cognitive or cyclomatic complexity exceeded a threshold of 10. This led to several improvements and refactoring of code:
     - Cyclomatic Complexity:
       - Received an error in `movePlayer.js` due to high cyclomatic complexity. I refactored the code by breaking it into smaller functions such as `calculateDirection.js`, `checkLoss.js`, and `checkWin.js`, which simplified the logic and reduced the complexity.
     - Cognitive Complexity: 
       - Encountered issues in `generateRandomPath.js`, which was created to simplify `randomMinePlacement.js`. I rewrote this file and created a new file, `generateDirection.js`, which contains a single function to manage the complexity more effectively.

3. **Unit Testing**:
   - I initially wrote tests using Jasmine and nyc (Istanbul) for coverage reports but faced compatibility issues with ES6 dependencies. Consequently, I switched to Jest for testing.
   - Achieved the following coverage metrics with Jest:
     - **Statements**: 97.55%
     - **Branches**: 92.77%
     - **Lines**: 97.37%
     - **Functions**: 94.87%
   - These metrics significantly exceeded the required 50% coverage.

4. **CI/CD Pipeline**:
   - Implemented a GitHub Actions pipeline to automate the workflow:
     - **Linting**: Runs on every push to the main branch.
     - **Testing**: Executes unit tests if linting passes.
     - **Deployment**: Deploys to GitHub Pages if tests pass and coverage exceeds 50%.

These improvements were crucial in enhancing the quality and maintainability of the project.
