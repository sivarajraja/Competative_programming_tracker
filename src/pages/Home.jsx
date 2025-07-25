import bg from '../assets/contest2.jpg';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="flex flex-col items-center mt-16 text-center px-4 gap-8 pt-16">
      <div>
        <h1 className="text-5xl md:text-7xl font-bold text-purple-900">UpNext.codes</h1>
        <h2 className="text-2xl md:text-3xl mt-2">The Contest Ground</h2>
      </div>

      <div>
        <img src={bg} alt="Contest Illustration" className="h-80 w-auto object-contain" />
      </div>

      <div className="mt-4">
        <p className="text-lg md:text-xl italic">"Never miss a chance to compete."</p>
        <p className="text-2xl font-serif font-semibold text-purple-900 mt-1">
          Stay ahead! Stay UpNext!
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-9 my-8 w-2/3 justify-center">
        <Link to="/create-account">
          <button className="bg-purple-900 text-white rounded-md p-2 w-full md:w-48 hover:bg-purple-600">
            Let's Rock
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-purple-900 text-white rounded-md p-2 w-full md:w-48 hover:bg-purple-600">
            Already Rocking
          </button>
        </Link>
      </div>
    </div>
  );
};
