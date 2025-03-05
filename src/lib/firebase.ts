import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, increment, set, onValue, push, serverTimestamp } from 'firebase/database';

const firebaseConfig = {
  // TODO: Replace with your Firebase config
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

// Visitor counter functions
export const incrementVisitorCount = async () => {
  try {
    const countRef = ref(db, 'visitorCount');
    await set(countRef, increment(1));
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
  }
};

export const subscribeToVisitorCount = (callback: (count: number) => void) => {
  const countRef = ref(db, 'visitorCount');
  return onValue(countRef, (snapshot) => {
    callback(snapshot.val() || 0);
  });
};

// Contact form functions
export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const submitContactForm = async (data: ContactFormData) => {
  try {
    const messagesRef = ref(db, 'contactMessages');
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      ...data,
      timestamp: serverTimestamp(),
      status: 'unread'
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
}; 