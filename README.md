
# Kids Learning Portal

A React app with TypeScript, Material-UI, and Tailwind CSS for Year 2 students to practice Math, English, and Science.

## Setup

1. **Install Node.js**: Ensure Node.js (v16 or later) is installed.
2. **Install Yarn**: Run `npm install -g yarn` to install Yarn globally.
3. **Create Project Directory**: Set up the file structure and copy the provided files.
4. **Install Dependencies**:
   ```bash
   yarn install
   ```
5. **Run the App**:
   ```bash
   yarn dev
   ```
   Open `http://localhost:3000` in your browser.
6. **Build for Production**:
   ```bash
   yarn build
   ```
7. **Linting**:
   ```bash
   yarn lint
   ```

## Features
- **Login Page**: Dummy login with username and password.
- **Dashboard**: Three panels for Math, English, and Science.
- **Math Section**: 20 auto-generated questions for Year 2 kids with a "More" button to generate new questions.
- **English Section**: Reading passages and writing tasks for Year 2 students.
- **Science Section**: 20 questions with answers for Year 2 students.

## Notes
- The app uses client-side authentication for simplicity.
- Math questions are generated dynamically; English and Science content is static.
- Tailwind CSS is used for styling, combined with Material-UI components.
- ESLint ensures code quality with TypeScript and React rules.
