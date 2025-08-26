# Destitutes of India - Making the Invisible Visible

A platform to raise awareness about destitute individuals in India through geotagged photos. This web application allows users to share photos with location data to help connect compassion with need and foster community awareness.

## 🌟 Features

- **Instant Photo Upload**: Capture or select photos with one-click camera functionality
- **Geolocation Integration**: Automatic GPS tagging with user permission
- **Real-time Feed**: Dynamic, reverse-chronological display of shared photos
- **Google Authentication**: Secure login using Google Sign-In
- **Anonymous Posting**: Option to post without revealing identity
- **Responsive Design**: Mobile-first, modern UI built with Tailwind CSS
- **Responsibility Warnings**: Built-in cautionary measures before posting
- **Location Mapping**: Clickable links to Google Maps for each post

## 🛠️ Tech Stack

- **Frontend**: React 18 with Create React App
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Firebase Authentication (Google Provider)
- **Database**: Firestore (NoSQL)
- **Storage**: Firebase Cloud Storage
- **Deployment**: Hostinger (Frontend) + Google Cloud (Backend)
- **CI/CD**: GitHub Actions with automated deployment

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Google account for Firebase setup
- Hostinger hosting account (for deployment)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/destitutesofindia.git
cd destitutesofindia
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable the following services:
   - **Authentication**: Enable Google Sign-In
   - **Firestore Database**: Create database in production mode
   - **Storage**: Create storage bucket

4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click "Add app" > Web app
   - Copy the configuration object

5. Update the Firebase configuration:
   - Open `src/firebase/config.js`
   - Replace the placeholder config with your actual Firebase config

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 5. Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🔧 Configuration

### Firebase Security Rules

#### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read posts
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Allow users to read their own user data
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
  }
}
```

#### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload images
    match /images/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.uid == userId &&
        request.resource.size < 10 * 1024 * 1024 && // 10MB limit
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

### Tailwind CSS Configuration

The project uses a custom Tailwind configuration with:
- Primary color scheme (blue tones)
- Secondary color scheme (gray tones)
- Accent color scheme (red tones)
- Custom animations and components
- Responsive design utilities

## 📱 Usage

### For Users

1. **Sign In**: Click "Sign In" and authenticate with your Google account
2. **Take Photo**: Use the camera button to capture or select a photo
3. **Grant Location Permission**: Allow location access when prompted
4. **Add Details**: Optionally add a description and choose to post anonymously
5. **Confirm**: Review the responsibility warning and confirm your post
6. **View Feed**: Browse the real-time feed of all shared photos

### For Administrators

- Monitor user activity through Firebase Console
- Review and moderate content as needed
- Manage user accounts and permissions
- Access analytics and usage data

## 🚀 Deployment

### Automated Deployment (Recommended)

1. **Set up GitHub Secrets**:
   - Go to your GitHub repository > Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `FTP_SERVER`: Your Hostinger FTP server address
     - `FTP_USERNAME`: Your Hostinger FTP username
     - `FTP_PASSWORD`: Your Hostinger FTP password

2. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

3. **Monitor Deployment**:
   - Go to Actions tab in your GitHub repository
   - Check the deployment status

### Manual Deployment

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Upload to Hostinger**:
   - Connect to your Hostinger hosting via FTP
   - Upload the contents of the `build` folder to `public_html`

## 📁 Project Structure

```
destitutesofindia/
├── public/                 # Static files
│   ├── index.html         # Main HTML file
│   └── manifest.json      # PWA manifest
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── Navbar.js      # Navigation component
│   │   ├── Footer.js      # Footer component
│   │   ├── ImageFeed.js   # Photo feed component
│   │   ├── ImageCard.js   # Individual photo card
│   │   ├── UploadModal.js # Photo upload modal
│   │   └── LoginPrompt.js # Login prompt component
│   ├── contexts/          # React contexts
│   │   └── AuthContext.js # Authentication context
│   ├── pages/             # Page components
│   │   ├── HomePage.js    # Home page
│   │   ├── AboutPage.js   # About page
│   │   ├── ContactPage.js # Contact page
│   │   ├── DonatePage.js  # Donation page
│   │   └── [Legal Pages]  # Privacy, Terms, Disclaimer
│   ├── firebase/          # Firebase configuration
│   │   └── config.js      # Firebase setup
│   ├── App.js             # Main app component
│   ├── index.js           # App entry point
│   └── index.css          # Global styles
├── .github/               # GitHub Actions
│   └── workflows/         # Deployment workflows
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
└── README.md             # Project documentation
```

## 🔒 Security Considerations

- **Authentication**: Google OAuth for secure user authentication
- **Data Protection**: All data encrypted in transit and at rest
- **Privacy**: User consent required for location access
- **Content Moderation**: Built-in responsibility warnings
- **Rate Limiting**: Implemented to prevent abuse
- **Secure Headers**: HTTPS enforcement and security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase for backend services
- Tailwind CSS for styling framework
- React community for the amazing ecosystem
- All contributors and supporters of this project

## 📞 Support

For support and questions:

- **Email**: contact@destitutesofindia.com
- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

## 🌟 Mission

Our mission is to make the invisible visible by connecting compassionate citizens with those in need through technology. Every photo shared, every location mapped, and every story told brings us closer to a more compassionate and inclusive India.

---

**Built with ❤️ for a better India**
