import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ProtectedRoute from "./components/auth/protected-route";
import NotFound from "./pages/not-found";
import { LayoutLoader } from "./components/layout/loader";
import {server} from "./constants/config.js";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth.js";
import {Toaster} from "react-hot-toast";

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
                           
const App = () => {

  const {user, loader} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/user/me`, { withCredentials: true })
      .then((response) => {
        dispatch(userExists(response.data.user));
      })
      .catch((error) => {
        dispatch(userNotExists());
      });
  }, [dispatch]);

  

  return loader ? (
    <LayoutLoader />
  ) : (
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

      <Toaster />
    </BrowserRouter>
  );
};

export default App;
