import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import HomeBanner from "./components/HomeBanner";
import Login from "./components/Login";
import Banner from "./components/Banner";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <Header />
      <HomeBanner />
      {/* <Login /> */}

      {/* <Banner /> */}
    </div>
  );
}

export default App;
