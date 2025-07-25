import { Mail, Linkedin, Github, Globe, Code } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import { getUserSocialLinks, updateUserSocialLink } from '../firebase/profileLinksFirestore';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [socials, setSocials] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async u => {
      setUser(u);
      if (u) {
        const data = await getUserSocialLinks();
        setSocials(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    toast.success('Logged out successfully');
    setUser(null);
    navigate('/login');
  };

  const handleAnotherAccount = () => {
    navigate('/create-account');
  };

  const renderSocial = (label, key, icon) => {
  const displayLink = (url) =>
    url.replace(/^https?:\/\//, ''); // removes https:// or http://

  return (
    <div
      className={`px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 ${
        key === 'linkedin' || key === 'portfolio' ? 'bg-white' : 'bg-gray-50'
      } sm:px-6`}
    >
      <dt className="flex items-center gap-2 text-sm font-medium text-gray-600">
        {icon}
        {label}
      </dt>

      <dd className="mt-3 sm:mt-0 sm:col-span-2">
        {socials[key] ? (
          <a
            href={socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm sm:text-base text-blue-600 hover:underline break-words"
          >
            {displayLink(socials[key])}
          </a>
        ) : (
          <button
            onClick={async () => {
              const link = prompt(`Enter your ${label} URL:`);
              if (link) {
                await updateUserSocialLink(key, link);
                setSocials(prev => ({ ...prev, [key]: link }));
                toast.success(`${label} link updated successfully`);
              }
            }}
            className="mt-2 sm:mt-0 inline-flex items-center bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition"
          >
            Add
          </button>
        )}
      </dd>
    </div>
  );
};



  return (
    <div className="flex flex-col items-center mt-16 text-center px-4 pt-20">
      <div className="flex flex-col items-center gap-4 w-full sm:w-2/3 lg:w-1/3">
        <div className="border-4 border-purple-900 p-2 rounded-b-full">
          <img
            src={user?.photoURL || 'https://via.placeholder.com/150'}
            alt="User Profile"
            className="h-48 w-40 border border-gray-600 object-fill rounded-b-full"
          />
        </div>
        <h1 className="text-xl font-semibold break-words">{user?.displayName || 'User'}</h1>
      </div>

      <div className="bg-white w-full sm:w-2/3 lg:w-1/3 shadow overflow-hidden sm:rounded-lg mx-auto my-11">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Info</h3>
          <p className="mt-1 text-sm text-gray-500">Details and information about the user.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {renderSocial('Email', 'email', <Mail className="w-5 h-5 text-blue-500" />)}
            {renderSocial('LinkedIn', 'linkedin', <Linkedin className="w-5 h-5 text-blue-700" />)}
            {renderSocial('GitHub', 'github', <Github className="w-5 h-5 text-gray-800" />)}
            {renderSocial('Portfolio', 'portfolio', <Globe className="w-5 h-5 text-green-600" />)}
            {renderSocial('LeetCode', 'leetcode', <Code className="w-5 h-5 text-orange-500" />)}
          </dl>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-10 w-full sm:w-2/3 lg:w-1/3 justify-between items-center">
        <button
          onClick={handleAnotherAccount}
          className="bg-purple-900 text-white rounded-md w-full sm:w-1/2 p-3 hover:bg-purple-600 transition"
        >
          Add Another Account
        </button>
        <button
          onClick={handleLogout}
          className="bg-purple-900 text-white rounded-md w-full sm:w-1/2 p-3 hover:bg-purple-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
