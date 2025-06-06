import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Scores from "./pages/Scores";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-600">
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/*" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
