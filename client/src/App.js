import "./index.css";

import Googlemap from "./components/Googlemap";


function App() {

    const renderPage = () => {
          return <Googlemap />;
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
