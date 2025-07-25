import { db } from './Firebase';
import { collection, getDocs,setDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const getBookmarks = async () => {
  const user = getAuth().currentUser;
  if (!user) return [];

  const snapshot = await getDocs(collection(db, 'users', user.uid, 'bookmarks'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addBookmark = async contest => {
  const user = getAuth().currentUser;
  if (!user) return;

  await setDoc(doc(db, 'users', user.uid, 'bookmarks', contest.id.toString()), {
    name: contest.name,
    platform: contest.platform,
    link: contest.link,
    date: contest.date,
    time: contest.time,
  });
};

export const removeBookmark = async (contestId) => {
  const user = getAuth().currentUser;
  if (!user) return;

  await deleteDoc(doc(db, 'users', user.uid, 'bookmarks', contestId.toString()));
};
