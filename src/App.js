import MarketsTable from "./components/Markets/MarketsTable";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";

import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

function App() {
  const { isAuthenticated, isLoading: isLoadingAuth0 } = useAuth0();

  if (isLoadingAuth0) return <Loading />;
  return (
    <>
      <Navigation />
      {isAuthenticated && <MarketsTable />}
    </>
  );
}

export default App;
