import "./App.css";

function App() {
  // test routing
  const testFunc = async () => {
    const response = await fetch("/test_route");
    console.log(response);
  };
  testFunc();

  return (
    <div className="App">
      <h1>Cafe App</h1>
    </div>
  );
}

export default App;
