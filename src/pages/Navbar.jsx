import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Menu, X } from 'lucide-react'; // use `lucide-react` icons or swap with your own

export const Navbar = () => {
  const location = useLocation();
  const selected = location.pathname;

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: 'Contests', path: '/Contests' },
    { name: 'Bookmarks', path: '/bookmarks' },
    { name: 'About us', path: '/about' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 border-b-2 border-gray-200 ">
      <div className="flex justify-between items-center px-5 md:px-10 py-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-bold">
          UpNext.codes
        </h2>

        {user && (
          <>
            {/* Desktop Menu */}
            <ul className="hidden md:flex text-gray-600 gap-8 font-semibold items-center">
              {navItems.map(item => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`transition px-4 py-2 ${
                      selected === item.path
                        ? 'bg-purple-900 text-white rounded-2xl'
                        : 'hover:text-purple-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Nav Menu */}
      {user && menuOpen && (
        <ul className="md:hidden flex flex-col text-gray-700 font-medium bg-white shadow-md px-6 pb-4 space-y-3">
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block w-full py-2 ${
                  selected === item.path
                    ? 'bg-purple-900 text-white rounded-xl px-3'
                    : 'hover:text-purple-900 px-3'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
