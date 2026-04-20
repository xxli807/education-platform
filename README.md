# 🎓 Kids Learning Portal

A beautiful, interactive learning platform for Year 2 students built with React, TypeScript, Material-UI, and Vite. Designed to make learning engaging with Minecraft-themed UI and fun interactive quizzes.

## ✨ Features

### 📚 Learning Modules
- **Math Fun** - Auto-generated arithmetic questions with multiple difficulty levels (Standard, Advanced, Challenge)
- **English Adventure** - Reading comprehension exercises and creative writing tasks
- **Science Quest** - Explore topics like plants, animals, space, and more
- **Thinking Skills** - Logic puzzles, sequences, patterns, and analogies

### 🎯 Dashboard
- Quick access to all learning modules
- View recent session scores and progress
- Track completion stats for each subject

### 🏖️ Holiday Plans (NEW!)
- Create holiday activity plans with dates
- Add todo items with start/end times
- Check off completed activities
- Print-friendly holiday schedules
- Perfect for planning Lucas's holiday activities

### 💾 Data Persistence
- All data stored locally in browser (IndexedDB)
- No server or internet connection needed
- Data survives browser refresh
- Private - all learning happens offline

### 🎨 Features
- Beautiful dark theme with Minecraft-inspired styling
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Print-friendly layouts
- Proper form validation with inline error messages
- MUI confirmation dialogs (no browser alerts)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/xxli807/education-platform.git
   cd education-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

### Build for Production

```bash
npm run build
```

The production bundle will be in the `dist` folder.

## 📦 Deployment

This app can be deployed to GitHub Pages on every push to `main` for personal use.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

**Note**: This is a personal learning app for Lucas. Keep the repository settings private if desired.

## 🛠 Tech Stack

- **Frontend**: React 19 with TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **Build Tool**: Vite
- **Database**: Dexie.js (IndexedDB wrapper)
- **Styling**: Emotion CSS + MUI sx prop
- **Routing**: React Router v7

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── MathSection.tsx # Math questions
│   ├── EnglishSection.tsx
│   ├── ScienceSection.tsx
│   ├── ThinkingSection.tsx
│   ├── HolidayTodoSection.tsx  # Holiday planner
│   ├── Login.tsx       # Quick name entry
│   ├── CustomDatePicker.tsx    # Beautiful date picker
│   ├── AlertDialog.tsx         # Message dialogs
│   └── ConfirmDeleteDialog.tsx # Confirmation dialogs
├── db/                 # Database schemas
│   └── database.ts     # Dexie database setup
├── App.tsx             # Router setup
└── main.tsx            # Entry point
```

## 🎮 How to Use

1. **Login**: Enter username and password to access the platform
2. **Dashboard**: Choose from Math, English, Science, or Thinking Skills
3. **Complete Lessons**: Answer questions and see your score
4. **Track Progress**: View statistics and recent session results on the dashboard
5. **Plan Holiday**: Create holiday plans and manage activity todo lists
6. **Print Plans**: Print-friendly layout for holiday schedules

## 📊 Data Storage

All student data is stored in the browser's IndexedDB:
- Session results (scores, times, answers)
- Journal entries
- Holiday plans and todo items
- Writing tasks

Data is **never sent to a server** - everything stays on Lucas's device.

## 🔧 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## 📝 License

This project is open source and available for educational purposes.

## 🎯 Future Enhancements

- [ ] Progress tracking and analytics
- [ ] Achievement badges and rewards
- [ ] Parent dashboard
- [ ] Additional subjects
- [ ] Spaced repetition algorithm
- [ ] Multiplayer quiz mode

---

Built with ❤️ for Lucas's learning journey!
