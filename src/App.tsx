import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import FactoryPage from "./pages/FactoryPage";
import SimulatorPage from "./pages/SimulatorPage";
import ActionPlanPage from "./pages/ActionPlanPage";
import RegulatorPage from "./pages/RegulatorPage";
import PortfolioPage from "./pages/PortfolioPage";
import IntakePage from "./pages/IntakePage";
import Co2ExchangePage from "./pages/Co2ExchangePage";
import Co2DealPage from "./pages/Co2DealPage";
import JarvisAssistant from "./components/assistant/JarvisAssistant";

function App() {
  return (
    <HashRouter>
      <div className="flex h-screen flex-col overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<FactoryPage />} />
          <Route path="/simulate" element={<SimulatorPage />} />
          <Route path="/plan" element={<ActionPlanPage />} />
          <Route path="/regulator" element={<RegulatorPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/intake" element={<IntakePage />} />
          <Route path="/intake/:factoryId" element={<IntakePage />} />
          <Route path="/co2-exchange" element={<Co2ExchangePage />} />
          <Route path="/co2-exchange/deal/:providerId/:recipientId" element={<Co2DealPage />} />
        </Routes>
        <JarvisAssistant />
      </div>
    </HashRouter>
  );
}

export default App;
