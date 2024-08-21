import "./App.css";
import Currency from "./components/Currency";

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-200">
      <h1 className="text-3xl font-bold">Currency Converter</h1>
      <Currency />
    </div>
  );
}

export default App;
