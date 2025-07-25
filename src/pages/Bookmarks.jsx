import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, BookmarkCheck } from 'lucide-react';
import { getBookmarks, removeBookmark } from '../firebase/BookmarksFirestore';
import { toast } from 'react-toastify';
import { sendEmailNotification } from '../services/Alerts';

export const Bookmarks = () => {
  const [bookmarkedContests, setBookmarkedContests] = useState([
    // {
    //   id: 101,
    //   name: 'Leetcode Weekly Contest 401',
    //   platform: 'leetcode',
    //   start_time: '2025-08-02T14:30:00',
    //   end_time: '2025-08-02T16:30:00',
    //   duration: '7200',
    //   link: 'https://leetcode.com/contest/weekly-contest-401',
    //   date: '8/2/2025',
    //   time: '02:30 PM',
    // },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      setLoading(true);
      const data = await getBookmarks();
      setBookmarkedContests(data);
      console.log('Fetched Bookmarks:', bookmarkedContests);
      setLoading(false);
    };
    fetchBookmarks();
  }, []);

  const handleRemoveBookmark = async (contestId) => {
    await removeBookmark(contestId);
    setBookmarkedContests(prev => prev.filter(c => c.id !== contestId));
    toast.success('Bookmark removed');
  };

  return (
    <div className="flex flex-col items-center mt-16 text-center px-4 gap-8 pt-16">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-900">Bookmarked Contest</h1>
        <p className="text-xl font-light p-3 text-gray-600">
          Your Saved Contests will appear here.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-3xl mt-24 mb-3">Loading...</p>
      ) : bookmarkedContests.length === 0 ? (
        <div>
          <p className="text-center text-gray-500 text-3xl mt-24 mb-3">
            No contests bookmarked yet.
          </p>
          <Link to={'/contests'} className="text-purple-900 underline p-5 text-2xl font-semibold">
            Explore Contests
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 my-9 w-4/5 h-auto justify-center">
          {bookmarkedContests.map(contest => {
            return (
              <div
                key={contest.id}
                className="flex flex-col justify-between border rounded-xl p-5 shadow-md bg-white hover:shadow-lg transition min-h-[320px] max-h-[320px]"
              >
                <div className="items-end flex justify-end">
                  <div className="relative group w-fit cursor-pointer">
                    <span className="absolute -top-11 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                      Remove bookmark
                    </span>
                    <BookmarkCheck
                      onClick={() => handleRemoveBookmark(contest.id)}
                      size={24}
                      className="text-purple-900 mb-3 hover:text-purple-600 transition"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl mt-2 font-semibold text-purple-900 truncate">
                    {contest.name}
                  </h2>
                  <p className="text-lg mt-2 text-gray-600 my-2 font-semibold truncate">
                    {contest.platform}
                  </p>
                  <p className="text-md mt-3 font-semibold text-gray-600 truncate">
                    Date : {contest.date} - Time : {contest.time}
                  </p>

                  <a
                    href={contest.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg text-blue-600 underline underline-offset-2 my-5 inline-block"
                  >
                    Visit Contest →
                  </a>
                </div>

                <button
                  onClick={() =>
                    sendEmailNotification({
                      userName : user ? user.displayName : 'UpNexter',
                      userEmail: user ? user.email : 'upnextcodes@gmail.com',
                      name: contest.name,
                      platform: contest.platform,
                      date: date,
                      time: time,
                      link: contest.link,
                    })
                  }
                  className="flex items-center justify-center gap-2 bg-transparent border-2 border-gray-300 mt-auto px-5 py-2 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  <Bell size={20} />
                  Notify Me
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
