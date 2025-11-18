# TaskManager Pro

A modern, cloud-based task management application built with React, Vite, and Tailwind CSS. This application provides a comprehensive solution for managing tasks, projects, and team collaboration.

## 🚀 Live Demo

[Live Application](https://taskmanagerpro-mu.vercel.app/)

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **UI Components:** Headless UI
- **Icons:** React Icons
- **Charts:** Recharts
- **Forms:** React Hook Form
- **Routing:** React Router DOM
- **Date Handling:** Moment.js
- **Notifications:** Sonner

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git**

## 🔧 Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/iqbal-web/taskmanagerpro.git
cd taskmanagerpro
```

### 2. Navigate to Client Directory

```bash
cd client
```

### 3. Install Dependencies

```bash
npm install
```

or using yarn:

```bash
yarn install
```

### 4. Start Development Server

```bash
npm run dev
```

or using yarn:

```bash
yarn dev
```

The application will start on `http://localhost:3000`

## 📜 Available Scripts

In the client directory, you can run:

### `npm run dev`
Starts the development server using Vite. The app will reload automatically when you make changes.

### `npm run build`
Builds the app for production to the `dist` folder. The build is optimized and ready for deployment.

### `npm run preview`
Locally preview the production build. Run this after `npm run build`.

### `npm run lint`
Runs ESLint to check for code quality and formatting issues.

## 📁 Project Structure

```
taskmanagerpro/
├── client/                 # Frontend React application
│   ├── public/            # Public assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable React components
│   │   │   ├── Button.jsx
│   │   │   ├── MobileSidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Textbox.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── TaskDetails.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Trash.jsx
│   │   │   └── Users.jsx
│   │   ├── redux/         # State management
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── apiSlice.js
│   │   │       └── authSlice.js
│   │   ├── assets/        # Static assets
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # App entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Dependencies and scripts
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── vercel.json        # Vercel deployment configuration
└── README.md              # Project documentation
```

## 🚀 Deployment

### Deploy to Vercel

1. **Using Vercel CLI:**
   ```bash
   cd client
   npm install -g vercel
   vercel --prod
   ```

2. **Using Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `client`
   - Configure build settings:
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
     - **Install Command:** `npm install`

### Deploy to Netlify

```bash
cd client
npm run build
npx netlify deploy --prod --dir=dist
```

## 🔧 Environment Variables

If your application uses environment variables, create a `.env` file in the client directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=TaskManager Pro
```

**Note:** Environment variables in Vite must be prefixed with `VITE_`

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use:**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **Node modules issues:**
   ```bash
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors:**
   ```bash
   # Clear Vite cache
   npx vite --force
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation when necessary
- Run `npm run lint` before committing

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/iqbal-web/taskmanagerpro/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your environment and the issue

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Coding! 🎉**