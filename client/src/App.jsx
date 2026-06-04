import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import History from "./pages/History";
import AnalysisDetail from "./pages/AnalysisDetail";

function App() {
  return (
    <BrowserRouter>

      <div className="app-layout">

        <Sidebar />

        <div className="page-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/analyze"
              element={<UploadResume />}
            />

            <Route
              path="/history"
              element={<History />}
            />

            <Route
              path="/analysis/:id"
              element={<AnalysisDetail />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;