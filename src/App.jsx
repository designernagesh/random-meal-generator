import { useState } from "react";
import Meal from "./components/Meal";

function App() {
  const [mealData, setMealData] = useState(null);
  const [ showModal, setShowModal ] = useState(false);
  const [ showMoreInstructions, setShowMoreInstructions ] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setMealData(data.meals[0]);
    }
    catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const buttonHandler = () => {
    fetchData();
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const readMoreHandler = () => {
    setShowMoreInstructions(!showMoreInstructions);
  }

  return (
    <>
      <div className="container">
        <h2 className="title">Random Meal Generator</h2>
        <p className="sub-title">Feeling Hungry? Click the button to get a Random Meal! 😊 </p>
        <button onClick={buttonHandler}>Get a Meal 🍔</button>
      </div>
      {mealData && 
      <Meal mealData={mealData} showModal={showModal} closeModal={closeModal} showMoreInstructions={showMoreInstructions} readMoreHandler={readMoreHandler} />
      }
    </>
  )
}

export default App;
