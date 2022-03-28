import { lazy, Suspense } from "react";

import { BrowserRouter as Router } from "react-router-dom";
// import { useMount } from "react-use";

import LoadingSpinner from "@app/components/atoms/LoadingSpinner/LoadingSpinner";

// import { useAppDispatch } from "./redux/store";

const Routes = lazy(() => import("./routes/Routes"));

const App = () => {
  // const { accessToken } = getTokens();
  // const dispatch = useAppDispatch();
  // const { loadingUser } = useAppSelector(state => ({
  //   isAuthenticated: state.auth.isAuthenticated,
  //   loadingUser: state.auth.loading,
  // }));

  // useMount(() => {
  //   if (accessToken) {
  //     dispatch(getMe());
  //   }
  // });

  const loading = <LoadingSpinner isFullscreen text="Loading Admin Panel" />;

  return (
    <Suspense fallback={loading}>
      <Router>
        <Routes />
      </Router>
    </Suspense>
  );
};

export default App;
