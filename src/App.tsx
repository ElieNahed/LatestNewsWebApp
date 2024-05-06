import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import HomePage from "./components/pages/Home/HomePage";
import NewsPage from "./components/pages/news/NewsPage";
import { useEffect } from "react";
import { AppDispatch } from "./store/store";
import { refreshToken, setAccessToken } from "./store/user/userSlice";
import getCookie from "./utils/getCookie";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    // get access token from cookie
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    } else {
      const token = getCookie("refreshToken");
      if(token){
        dispatch(refreshToken({token, token_expires_in: '30m'}))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {accessToken ? <NewsPage /> : <HomePage />}
    </div>
  );
}

export default App;
