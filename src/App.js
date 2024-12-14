import './App.css';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout/AppLayout';
import Home from './pages/Home';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from 'axios';
import Error from './pages/Error';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setValidationData } from './features/validateSlice';

function App() {
  const dispatch = useDispatch();
  const validatedData = useSelector((state) => state.validate)

  useEffect(() => {
    if (!validatedData.isLoggedIn) {
      checkUserLoggedIn()
    }
  }, [validatedData])

  const checkUserLoggedIn = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/user/check/islogeed/in`, {}, { withCredentials: true })
      if (res.data.data.user.isLoggedIn) {
        dispatch(setValidationData(res.data.data.user))
      }
    } catch (error) {
      dispatch(
        setValidationData({
          isLoggedIn: false,
          email: "",
          userName: ""
        })
      )
    }
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children:
        [
          {
            path: "/",
            element: <Home />
          },
          {
            path: "/login",
            element: <Login />
          },
          {
            path: "/signup",
            element: <Signup />
          },
          {
            path: "/*",
            element: <Error />
          }
        ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App;
