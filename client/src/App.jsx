import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ProtectedRoute from "./components/auth/protected-route";
import NotFound from "./pages/not-found";
import { LayoutLoader } from "./components/layout/loader";
import {server} from "./constants/config.js";

const Home = lazy(() => import("./pages/home"));
const Chat = lazy(() => import("./pages/chat"));
const Group = lazy(() => import("./pages/group"));
const Login = lazy(() => import("./pages/login"));

const AdminLogin = lazy(() => import("./pages/admin/admin-login"));
const Dashboard = lazy(() => import("./pages/admin/dashboard"));

const UserManagement = lazy(() => import("./pages/admin/user-management"));
const ChatManagement = lazy(() => import("./pages/admin/chat-management"));
const MessageManagement = lazy(() =>
  import("./pages/admin/message-management")
);

const user = true;
const App = () => {

  useEffect(() => {
    console.log(server);
  }, [])
  

  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/group" element={<Group />} />
        </Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
