import React from 'react';

export const AboutUs = () => {
  return (
    <div className="flex flex-col items-center mt-16 text-center px-4 gap-8 pt-16">
      <div>
        <h2 className="text-2xl md:text-3xl mt-2 text-purple-900 font-semibold">✨ About us</h2>
        {/* <p className="text-2xl font-serif font-semibold text-purple-900 mt-1">
          Stay ahead! Stay UpNext!
        </p> */}
      </div>

      <div className="md:w-2/3">
        <p className="text-lg md:text-xl italic p-5 my-3">
          At <span className="font-semibold">UpNext.codes</span>, we help competitive programmers
          never miss a beat. Our mission is simple — to keep you updated with upcoming coding
          contests across all major platforms like
          <span className="text-orange-500"> LeetCode, Codeforces, CodeChef, AtCoder,</span> and
          more.
        </p>
      </div>

      <div className="md:w-2/3 my-3">
        <h2 className="text-2xl md:text-3xl mt-3 text-purple-900 font-semibold">
          🎨 Our Great Things
        </h2>
        <p className="text-lg md:text-xl italic p-5 my-3">
          We built <span className="font-semibold">UpNext.codes</span> for students, professionals,
          and competitive programming enthusiasts who want to:
        </p>

        <div className="md:w-3/5 mx-auto border border-gray-500 my-3 p-5 rounded-2xl">
          <ul className="flex flex-col font-semibold font-sans items-center gap-6 md:text-xl p-3">
            <li className="before:content-['•'] before:mr-2">Track all contests in one place</li>
            <li className="before:content-['•'] before:mr-2">Set reminders and notifications</li>
            <li className="before:content-['•'] before:mr-2">Improve their coding skills</li>
            <li className="before:content-['•'] before:mr-2">
              Bookmark favorite contests or platforms
            </li>
            <li className="before:content-['•'] before:mr-2">
              Plan smarter with filters by platform, duration, or start time
            </li>
          </ul>
        </div>

        <p className="text-lg md:text-xl italic p-5 my-3">
          No more scattered calendars, missed contests, or last-minute panic. Whether you're
          preparing for placements, improving your DSA skills, or just love the thrill of a good
          problem set — <span className="font-semibold">UpNext.codes</span> is your daily ally.
        </p>
      </div>

      <div className="md:w-2/3 my-3">
        <h2 className="text-2xl md:text-3xl mt-3 text-purple-900 font-semibold">
          🚀 Why We Built This
        </h2>
        <p className="text-lg md:text-xl italic p-5 my-3">
          <span className="font-semibold text-orange-500">We know the struggle: </span> juggling
          college, internships, and a dozen coding platforms. That's why we created a platform that
          does the tracking for you — so you can focus on solving problems, not finding them.
        </p>
      </div>

      <div className="md:w-2/3 my-3">
        <h2 className="text-2xl md:text-3xl mt-3 text-purple-900 font-semibold">💡 Our Vision</h2>
        <p className="text-lg md:text-xl italic p-5 my-3">
          To become the go-to productivity tool for competitive coders — one that makes tracking
          contests as effortless as submitting an AC.
        </p>
      </div>

      <div className="md:w-2/3 my-3">
        <h2 className="text-2xl md:text-3xl mt-3 text-purple-900 font-semibold">👨‍💻 Creator</h2>
        <p className="text-lg md:text-xl italic p-5 my-3">
          <span className="font-semibold">UpNext.codes</span> was created by{' '}
          <span className="text-orange-500 font-sans text-2xl font-semibold">Sivaraj VR</span>, a
          passionate developer and final-year Computer Science student at
          <span className="font-sans font-semibold"> SRM University</span>. With a strong foundation
          in full-stack web development and a deep interest in competitive programming, he built
          this platform to solve a real problem he and many peers faced.
        </p>
        <p className="text-lg md:text-3xl italic p-5 my-3 text-emerald-600 underline underline-offset-4 font-sans">
          “I created UpNext.codes to help coders like me stay organized, stay sharp, and never miss
          a chance to compete.”
        </p>
      </div>

      <div className="text-center sm:max-w-screen w-screen mx-3 mt-6 border border-gray-300  p-5 bg-gray-50">
        <h3 className="text-base sm:text-lg md:text-xl my-3 text-gray-700">
          🔗 Connect with the creator:
        </h3>
        <p className="my-1">
          Email:
          <a href="mailto:sivarajraja47@gmail.com" className="ml-2 text-blue-600 hover:underline">
            sivarajraja47@gmail.com
          </a>
        </p>
        <p className="my-1">
          LinkedIn:
          <a
            href="https://linkedin.com/in/sivarajvr494506"
            target="_blank"
            className="ml-2 text-blue-600 hover:underline"
          >
            linkedin.com/in/sivarajvr494506
          </a>
        </p>
        <p className="my-1">
          GitHub:
          <a
            href="https://github.com/sivarajraja"
            target="_blank"
            className="ml-2 text-blue-600 hover:underline"
          >
            github.com/sivarajraja
          </a>
        </p>
      </div>

      <div className="md:flex md:gap-5 justify-center w-2/3 mt-3 mb-11 p-3">
        <h2 className="text-2xl md:text-3xl mt-3 text-purple-900 font-semibold">
          Stay Ready !
        </h2>
        <h2 className="text-2xl md:text-3xl mt-3 text-purple-900 font-semibold">
          Stay Ahead !
        </h2>
        <h2 className="text-2xl md:text-3xl mt-3 text-purple-900 font-semibold">
          Stay UpNext !
        </h2>
      </div>

      <div className="my-7">
        <h2 className="font-nudge-extrabold mx-auto max-w-2xl text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          Join our community now
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Experience the benefits of our community. No obligations, just join and explore.
        </p>

        <div className="isolate mt-8 flex items-center justify-center -space-x-2 overflow-hidden">
          <img
            className="relative z-30 inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://randomuser.me/api/portraits/men/34.jpg"
            alt=""
          />
          <img
            className="relative z-20 inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://randomuser.me/api/portraits/women/2.jpg"
            alt=""
          />
          <img
            className="relative z-10 inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://randomuser.me/api/portraits/women/3.jpg"
            alt=""
          />
          <img
            className="relative z-0 inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src="https://randomuser.me/api/portraits/men/4.jpg"
            alt=""
          />
          <span className="!ml-2 p-2 font-bold italic text-teal-600">
            Join these awesome members
          </span>
        </div>

        <div className="mt-9 flex items-center justify-center gap-x-6">
          <button
            type="button"
            className="text-md relative inline-flex items-center gap-x-2 rounded-lg bg-teal-600 px-6 py-4 font-semibold text-white shadow-sm hover:bg-teal-500"
          >
            <a href="https://discord.gg/5hWG7JSyY7" target="_blank">
              Join Now
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="-mr-0.5 h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
