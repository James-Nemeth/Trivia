import { useNavigate } from "react-router-dom";

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/game");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse"></div>
      <h1 className="text-3xl font-extrabold mb-1 drop-shadow-lg animate-fade-in">
        Welcome To
      </h1>
      <h1 className="text-6xl font-extrabold mb-10 drop-shadow-lg animate-fade-in underline">
        Master Minds
      </h1>
      <button
        className="bg-white text-purple-700 px-10 py-4 mb-5 text-2xl font-semibold rounded-full shadow-lg hover:bg-purple-100 transition-transform transform hover:scale-105 cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="bg-white text-purple-700 px-10 py-4 text-2xl font-semibold rounded-full shadow-lg hover:bg-purple-100 transition-transform transform hover:scale-105 cursor-pointer"
        onClick={handleStartGame}
      >
        Start Game as Guest
      </button>
    </div>
  );
};

export default MainMenu;
