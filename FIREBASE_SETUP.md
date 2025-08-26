# Firebase Setup Guide for Destitutes of India

This guide will walk you through setting up Firebase for the Destitutes of India platform, including Authentication, Firestore Database, and Cloud Storage.

## Prerequisites

- Google account
- Firebase project (we'll create one)
- Basic understanding of web development

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `destitutes-of-india` (or your preferred name)
4. Choose whether to enable Google Analytics (recommended)
5. Click "Create project"
6. Wait for project creation to complete

## Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Google" provider
5. Enable Google Sign-in:
   - Toggle "Enable" to ON
   - Enter a project support email
   - Click "Save"
6. (Optional) Configure authorized domains:
   - Go to "Settings" tab
   - Add your domain to "Authorized domains"

## Step 3: Set Up Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose security mode:
   - Select "Start in production mode"
   - Click "Next"
4. Choose location:
   - Select a region close to your users (e.g., `asia-south1` for India)
   - Click "Done"
5. Wait for database creation (may take a few minutes)

### Firestore Security Rules

1. Go to "Rules" tab in Firestore
2. Replace the default rules with:

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

3. Click "Publish"

## Step 4: Set Up Cloud Storage

1. Click "Storage" in the left sidebar
2. Click "Get started"
3. Choose security mode:
   - Select "Start in production mode"
   - Click "Next"
4. Choose location:
   - Select the same region as Firestore
   - Click "Done"
5. Wait for storage bucket creation

### Storage Security Rules

1. Go to "Rules" tab in Storage
2. Replace the default rules with:

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

3. Click "Publish"

## Step 5: Get Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register app:
   - Enter app nickname: `destitutes-of-india-web`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"
6. Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## Step 6: Update Application Configuration

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-actual-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-actual-project.appspot.com",
  messagingSenderId: "your-actual-messaging-sender-id",
  appId: "your-actual-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;
```

## Step 7: Environment Variables (Optional but Recommended)

1. Create a `.env` file in your project root:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

2. Update `src/firebase/config.js` to use environment variables:

```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```

## Step 8: Test the Setup

1. Start your development server:
   ```bash
   npm start
   ```

2. Test authentication:
   - Click "Sign In" button
   - Complete Google authentication
   - Verify user is logged in

3. Test photo upload:
   - Take or select a photo
   - Grant location permission
   - Submit the post
   - Check Firestore for the new document
   - Check Storage for the uploaded image

## Step 9: Production Considerations

### Domain Configuration

1. In Firebase Console, go to Authentication > Settings
2. Add your production domain to "Authorized domains"

### Security Rules Review

1. Review Firestore rules for production
2. Review Storage rules for production
3. Consider implementing additional security measures

### Monitoring and Analytics

1. Set up Firebase Analytics (if enabled)
2. Monitor usage in Firebase Console
3. Set up alerts for unusual activity

## Troubleshooting

### Common Issues

1. **Authentication not working**:
   - Check if Google provider is enabled
   - Verify domain is authorized
   - Check browser console for errors

2. **Upload failing**:
   - Check Storage security rules
   - Verify file size limits
   - Check file type restrictions

3. **Database access denied**:
   - Check Firestore security rules
   - Verify user authentication status
   - Check user permissions

### Debug Mode

Enable debug mode for development:

```javascript
// In src/firebase/config.js
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase config:', firebaseConfig);
}
```

## Security Best Practices

1. **Never expose API keys in client-side code** (use environment variables)
2. **Regularly review security rules**
3. **Monitor Firebase Console for unusual activity**
4. **Keep Firebase SDK updated**
5. **Implement proper error handling**
6. **Use HTTPS in production**

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Cloud Storage Documentation](https://firebase.google.com/docs/storage)

## Support

If you encounter issues with Firebase setup:

1. Check Firebase Console for error messages
2. Review Firebase documentation
3. Check browser console for JavaScript errors
4. Contact Firebase support if needed

---

**Note**: Keep your Firebase configuration secure and never commit API keys to version control. Use environment variables for sensitive information.
