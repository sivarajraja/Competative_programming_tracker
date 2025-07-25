import { Bell, Bookmark, BookmarkCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FilterBar } from '../services/Filter';
import { getBookmarks, addBookmark, removeBookmark } from '../firebase/BookmarksFirestore';
import { toast } from 'react-toastify';
import { sendEmailNotification } from '../services/Alerts';
import { getAuth } from 'firebase/auth';

export const Contests = () => {
  const [AllContests, setAllContests] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [platforms, setPlatforms] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  const filteredContests =
    filters.length === 0
      ? AllContests
      : AllContests.filter(contest => filters.includes(contest.platform.toLowerCase()));

  const toggleBookmark = contestName => {
    setAllContests(prev =>
      prev.map(contest =>
        contest.name === contestName ? { ...contest, isBookmarked: !contest.isBookmarked } : contest
      )
    );
  };

  const toggleBookmarkHandler = async contest => {
    const userBookmarks = await getBookmarks();
    const isAlreadyBookmarked = userBookmarks.some(bookmark => bookmark.id === contest.id);

    if (isAlreadyBookmarked) {
      await removeBookmark(contest.id);
      toggleBookmark(contest.name);
      toast.success('Bookmark removed');
      console.log(`Bookmark removed for contest: ${contest.name}`);
    } else {
      await addBookmark(contest);
      toggleBookmark(contest.name);
      toast.success('Bookmark added');
      console.log(`Bookmark added for contest: ${contest.name}`);
    }
  };

  const formatDateTime = iso => {
    const date = new Date(iso);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  useEffect(() => {
    const username = 'shivaa11';
    const apiKey = '4dcb14d47515957a347f5564abe5537dad0fd45a';

    const now = new Date().toISOString();

    const apiUrl = `https://clist.by/api/v2/contest/?start__gte=${now}&order_by=start`;

    fetch(apiUrl, {
      headers: {
        Authorization: `ApiKey ${username}:${apiKey}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const contests = data.objects.map(contest => {
          const { date, time } = formatDateTime(contest.start);

          return {
            id: contest.id,
            name: contest.event,
            platform: contest.resource.replace('.com', '').toLowerCase(),
            start_time: contest.start,
            end_time: contest.end,
            duration: contest.duration,
            link: contest.href,
            date,
            time,
          };
        });

        const uniquePlatforms = [...new Set(contests.map(c => c.platform))];

        setAllContests(contests);
        setPlatforms(uniquePlatforms);
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center mt-16 text-center px-4 gap-8 pt-16 w-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-900">All Contest</h1>
        <p className="text-xl font-light p-3 text-gray-600">
          All upcoming contests in different platform will appear here.
        </p>

        <div className="w-screen">
          <FilterBar onFilterChange={setFilters} platforms={platforms} />
        </div>
      </div>

      {loading && (
        <p className="text-center text-gray-500 text-3xl mt-24 mb-3">Loading Contests...</p>
      )}

      {error && (
        <p className="text-center text-red-500 text-3xl mt-24 mb-3">
          Error fetching contests: {error}
        </p>
      )}

      {!loading && AllContests.length === 0 ? (
        <div>
          <p className="text-center text-gray-500 text-3xl mt-24 mb-3">
            No contests Available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 my-9 w-4/5 h-auto">
          {filteredContests.map(contest => {
            const { date, time } = formatDateTime(contest.start_time);
            return (
              <div
                key={contest.id}
                className="flex flex-col justify-between border rounded-xl p-5 shadow-md bg-white hover:shadow-lg transition min-h-[320px] max-h-[320px]"
              >
                <div className="items-end flex justify-end">
                  {contest.isBookmarked ? (
                    <div className="relative group w-fit cursor-pointer">
                      <span className="absolute -top-11 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        Remove bookmark
                      </span>
                      <BookmarkCheck
                        onClick={() => toggleBookmarkHandler(contest)}
                        size={24}
                        className="text-purple-900 mb-3 hover:text-purple-600 transition"
                      />
                    </div>
                  ) : (
                    <div className="relative group w-fit cursor-pointer">
                      <span className="absolute -top-11 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                        Add bookmark
                      </span>
                      <Bookmark
                        onClick={() => toggleBookmarkHandler(contest)}
                        size={24}
                        className="text-purple-900 mb-3 hover:text-purple-600 transition"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl mt-2 font-semibold text-purple-900 truncate">
                    {contest.name}
                  </h2>
                  <p className="text-lg mt-2 text-gray-600 my-2 font-semibold truncate">
                    {contest.platform}
                  </p>
                  <p className="text-md mt-3 font-semibold text-gray-600 truncate">
                    Date : {date} - Time : {time}
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
