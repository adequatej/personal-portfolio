import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, increment, set, onValue, get, child, Database } from 'firebase/database';

const firebaseConfig = {
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

let db: Database | null = null;

function getDb(): Database | null {
  if (db) return db;
  if (!firebaseConfig.databaseURL) return null;
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getDatabase(app);
    return db;
  } catch {
    return null;
  }
}

// Visitor counter
export const incrementVisitorCount = async () => {
  const database = getDb();
  if (!database) return;
  try {
    const countRef = ref(database, 'visitorCount');
    await set(countRef, increment(1));
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
  }
};

export const subscribeToVisitorCount = (callback: (count: number) => void) => {
  const database = getDb();
  if (!database) return () => {};
  const countRef = ref(database, 'visitorCount');
  return onValue(countRef, (snapshot) => {
    callback(snapshot.val() || 0);
  });
};

// Writing posts
export type WritingPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category?: 'cs' | 'life';
};

export const getWritingPosts = async (): Promise<WritingPost[]> => {
  const database = getDb();
  if (!database) return [];
  try {
    const snapshot = await get(child(ref(database), 'writing'));
    if (!snapshot.exists()) return [];
    const data = snapshot.val();
    return Object.values(data) as WritingPost[];
  } catch (error) {
    console.error('Error fetching writing posts:', error);
    return [];
  }
};

export const getWritingPost = async (slug: string): Promise<WritingPost | null> => {
  const database = getDb();
  if (!database) return null;
  try {
    const snapshot = await get(child(ref(database), `writing/${slug}`));
    if (!snapshot.exists()) return null;
    return snapshot.val() as WritingPost;
  } catch (error) {
    console.error('Error fetching writing post:', error);
    return null;
  }
};

export const subscribeToWritingPosts = (callback: (posts: WritingPost[]) => void) => {
  const database = getDb();
  if (!database) {
    callback([]);
    return () => {};
  }
  const postsRef = ref(database, 'writing');
  return onValue(postsRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback([]);
      return;
    }
    const data = snapshot.val();
    const posts = Object.values(data) as WritingPost[];
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    callback(posts);
  });
};