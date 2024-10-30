import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Chat = lazy(() => import("./pages/chat"));
const Group = lazy(() => import("./pages/group"));
const Login = lazy(() => import("./pages/login"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/group" element={<Group />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
