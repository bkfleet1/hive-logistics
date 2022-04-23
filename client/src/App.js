import "./App.css";
import Map from "./components/Map";


function App() {

    const renderPage = () => {
          return <Map />;
      }
 
    return (
        <div>
          <div>
            <section>{renderPage()}</section>
          </div>
          <div>
          </div>
        </div>
      );
    }

export default App;
