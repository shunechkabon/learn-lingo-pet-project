# 🌍 LearnLingo

## 📌 Project Description

**LearnLingo** is a web application that connects students with language tutors. The platform allows users to **search for teachers**, **filter results**, and **book trial lessons** directly through the app. Authentication and data management are powered by **Firebase**, and **Netlify Functions** handle server-side operations like email notifications.

## 🎯 Key Features

- 🔐 **User Authentication** via Firebase (Login, Registration, Logout).
- 📚 **Filter & Search** for teachers by **language, price and experience**.
- 📝 **Booking Trial Lessons** with email confirmation via **Brevo API**.
- 🌙 **Customizable Themes** (Yellow, Green, Blue, Pink, Orange).
- 💖 **Favorites List** for students to save preferred teachers.
- 🎨 **Responsive UI** with a **custom design system**.

## 🔧 Tech Stack

### **Frontend:**

- ⚛️ React + Vite
- 🛤 React Router
- 🎨 CSS Modules
- 🌍 Redux for state management
- 🔄 Axios (for API requests)
- 🧑‍🔬 React Hook Form + Yup (for validation)

### **Backend & Database:**

- 🔥 Firebase Authentication (for user login & registration)
- 🔥 Firebase Realtime Database (for storing user, teacher, and theme data)
- 🔥 Firebase Storage (for profile images, if needed)
- 🌐 **Netlify Functions** (for handling backend logic, including email sending via Brevo API)

### **Other Tools:**

- ✅ ESLint + Prettier (code formatting)
- ✅ Jest + React Testing Library (unit testing)
- ✅ **CI/CD:**
  - **Frontend deployed on Netlify**
  - **Netlify Functions handle backend logic**
  - **Firebase handles authentication & data storage**

## 🎨 Design

The project design is available in **Figma**:  
[🔗 Figma Link](<https://www.figma.com/design/L0mOQc9qxq8UeawF8NLxay/Learn-Lingo-(Copy)?t=jMaHAAEuRonGDnJ5-0>)

## 🚀 Deployment

### **Live Version:**

[🌍 LearnLingo on Netlify](https://learnlingo-project.netlify.app/)

### **Local Setup**

1. Clone the _repository_:

```sh
git clone https://github.com/shunechkabon/learn-lingo-pet-project
```

2. Navigate to the _project folder_:

```sh
cd learn-lingo-pet-project
```

3. Install _dependencies_:

```sh
npm install
```

4. Create a `.env` file in the root directory and add Firebase and Brevo credentials:

```sh
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
BREVO_API_KEY=your_brevo_api_key
```

5. Run the _development server_:

```sh
npm run dev
```

6. Open the project in the browser:

```sh
http://localhost:5173
```

### **Netlify Functions Setup**

1. Install Netlify CLI if not installed:

```sh
npm install -g netlify-cli
```

2. Login to Netlify:

```sh
netlify login
```

3. Link the project to Netlify:

```sh
netlify link
```

4. Set environment variables on Netlify:

```sh
netlify env:set BREVO_API_KEY your_brevo_api_key
```

5. Deploy Netlify Functions:

```sh
netlify deploy --prod
```

## **🔧 Technical Specifications**

For full project requirements, check:  
📜 [Google Docs](https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0)
