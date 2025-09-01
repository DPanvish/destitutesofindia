# Destitutes of India

A platform to raise awareness about destitute individuals in India through geotagged photos. Users can upload photos with location data to help identify areas that need attention and support.

## Features

- 📸 **Photo Upload**: Upload photos with geolocation data
- 🗺️ **Location Tracking**: Automatic GPS capture and mapping
- 🔐 **User Authentication**: Secure login with Firebase Auth
- 💳 **Donation System**: Integrated Razorpay payment gateway
- 📧 **Contact Form**: Web3Forms integration for inquiries
- 📱 **Responsive Design**: Works on all devices
- 🔒 **Privacy Controls**: Anonymous posting options

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Payments**: Razorpay
- **Forms**: Web3Forms
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project
- Razorpay account
- Web3Forms account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd destitutes-of-india
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

4. Start the development server:
```bash
npm start
```

## Deployment to Netlify

### Method 1: Deploy via Netlify UI

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your GitHub repository
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

3. **Environment Variables**:
   - Go to Site settings > Environment variables
   - Add your environment variables:
     - `REACT_APP_FIREBASE_API_KEY`
     - `REACT_APP_FIREBASE_AUTH_DOMAIN`
     - `REACT_APP_FIREBASE_PROJECT_ID`
     - `REACT_APP_FIREBASE_STORAGE_BUCKET`
     - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
     - `REACT_APP_FIREBASE_APP_ID`
     - `REACT_APP_FIREBASE_MEASUREMENT_ID`
     - `REACT_APP_RAZORPAY_KEY_ID`
     - `REACT_APP_RAZORPAY_KEY_SECRET`
     - `REACT_APP_WEB3FORMS_ACCESS_KEY`

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build the project**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=build
```

### Method 3: Drag and Drop

1. **Build the project**:
```bash
npm run build
```

2. **Drag the `build` folder** to [netlify.com](https://netlify.com)

## Configuration Files

### `netlify.toml`
- Build settings and redirects
- Security headers
- Cache optimization

### `public/_redirects`
- Handles React Router client-side routing
- Ensures all routes work properly

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_FIREBASE_API_KEY` | Firebase API key | Yes |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `REACT_APP_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `REACT_APP_FIREBASE_MEASUREMENT_ID` | Firebase analytics ID | No |
| `REACT_APP_RAZORPAY_KEY_ID` | Razorpay public key | Yes |
| `REACT_APP_RAZORPAY_KEY_SECRET` | Razorpay secret key | No (backend only) |
| `REACT_APP_WEB3FORMS_ACCESS_KEY` | Web3Forms access key | Yes |

## Firebase Setup

1. **Create a Firebase project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one

2. **Enable Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Enable Email/Password provider

3. **Create Firestore Database**:
   - Go to Firestore Database
   - Create database in production mode
   - Set up security rules

4. **Enable Storage**:
   - Go to Storage
   - Create storage bucket
   - Set up security rules

5. **Add Authorized Domains** (IMPORTANT for Netlify):
   - Go to Authentication > Settings > Authorized domains
   - Add your Netlify domain: `your-app-name.netlify.app`
   - Add `localhost` for local development

6. **Update Firebase Config**:
   - Copy config from Project Settings > General
   - Update `src/firebase/config.js` or use environment variables

## Razorpay Setup

1. Create a Razorpay account
2. Get your test/live keys
3. Update the key in the DonatePage component
4. Set up webhook endpoints (for production)

## Web3Forms Setup

1. Get your access key from [web3forms.com](https://web3forms.com)
2. Update the access key in ContactPage component

## Build and Test

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Test build locally
npx serve -s build
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version (should be 18+)
2. **Routing issues**: Ensure `_redirects` file is in `public/` folder
3. **Environment variables**: Make sure they're set in Netlify dashboard
4. **Firebase errors**: Verify Firebase config and rules
5. **Google Auth not working**: 
   - Add your Netlify domain to Firebase Auth authorized domains
   - Go to Firebase Console > Authentication > Settings > Authorized domains
   - Add: `your-app-name.netlify.app` and `localhost`
6. **CORS errors**: Check Firebase Storage and Firestore security rules

### Performance Optimization

- Images are optimized automatically
- Static assets are cached
- Code splitting is enabled
- Lazy loading for components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email contact@destitutesofindia.com or use the contact form on the website.
