import Favourite from "./Components/Favourite";

import Meals from "./Components/Meals.jsx";
import Modal from "./Components/Modal.jsx";
import Search from "./Components/Search";
import "./App.css";
import { useMyContext } from "./context";

function App() {
  const { showModal, favourite } = useMyContext();
  return (
    <main className="App">
      <Search />
      {favourite.length > 0 && <Favourite />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
