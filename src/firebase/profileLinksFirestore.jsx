import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './Firebase';

export const getUserSocialLinks = async () => {
  const user = auth.currentUser;
  if (!user) return {};
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : {};
};

export const updateUserSocialLink = async (platform, url) => {
  const user = auth.currentUser;
  if (!user) return;
  const ref = doc(db, 'users', user.uid);
  await setDoc(ref, {[platform]: url}, { merge: true });
};
