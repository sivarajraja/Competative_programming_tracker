import { useState } from 'react';
import { auth, storage ,db} from '../../firebase/Firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

export const CreateAccount = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullname });

      let photoURL = '';
      if (profilePic) {
        const imageRef = ref(storage, `profiles/${userCredential.user.uid}`);
        await uploadBytes(imageRef, profilePic);
        photoURL = await getDownloadURL(imageRef);
      }

      await updateProfile(userCredential.user, {
        displayName: fullname,
        photoURL,
      });

      const db = getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: fullname,
        email: email,
        photoURL: photoURL || '',
        linkedin: '',
        github: '',
        portfolio: '',
        leetcode: '',
      });

      toast.success('Account created successfully!');
      navigate('/contests');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const additionalInfo = getAdditionalUserInfo(result);
    const isNewUser = additionalInfo?.isNewUser;

    const db = getFirestore();
    const userDocRef = doc(db, 'users', user.uid);

    if (isNewUser) {
      await setDoc(userDocRef, {
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        linkedin: '',
        github: '',
        portfolio: '',
        leetcode: '',
      });
    } else {
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || '',
          linkedin: '',
          github: '',
          portfolio: '',
          leetcode: '',
        });
      }
    }

    toast.success('Signed in with Google!');
    navigate('/contests');
  } catch (error) {
    setError(error.message);
    console.error('Error signing in with Google:', error);
  }
};

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-16 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        /> */}
        <h1 className="text-xl text-center md:text-3xl font-bold text-purple-900">
          Create New Account
        </h1>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          "Join the league of coders. Compete, grow, and stay ahead!"
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={fullname}
                onChange={e => setFullname(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-900 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="mt-4 ">
            <label className="block text-sm font-medium text-gray-900">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setProfilePic(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-900 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                New Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-900 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-900 sm:text-sm/6"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-md font-semibold text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-purple-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-purple-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 font-bold my-3">or</p>

        <div class="flex items-center justify-center dark:bg-gray-800">
          <button
            type="button"
            onClick={handleGoogleSignup}
            class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
          >
            <img
              class="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google"
            />
            <span>Login with Google</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-purple-900 hover:text-purple-700">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
