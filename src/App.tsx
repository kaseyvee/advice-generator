import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

type IAdvice = {
  id: number;
  advice: string;
}

const App: React.FC = () => {  
  const [advice, setAdvice] = useState<IAdvice>({
    id: 42,
    advice: "Roll the dice to get advice."
  });
  const [loading, setLoading] = useState(false);

  function fetchAdvice() {
    setLoading(true);

    axios.get("https://api.adviceslip.com/advice")
      .then((result) => {
        let advice = result.data.slip;
        setAdvice(advice);
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      })
      .catch((err) => console.log(err.message))
  }

  return (
    <main>
      <motion.div
        className="App"
        animate={loading ? { scaleY: [1, 0] } : { scaleY: [0, 1] }}
      >
        <h1>ADVICE #{advice.id}</h1>
        <p>"{advice.advice}"</p>

        <picture>
          <source media="(min-width: 769px)" srcSet="pattern-divider-desktop.svg" />
          <img src="pattern-divider-mobile.svg" alt="" />
        </picture>

        <button aria-label="get new quote" onClick={() => fetchAdvice()}>
          <img src="icon-dice.svg" alt="" />
        </button>
      </motion.div>

      {loading && <motion.img
        className="loader"
        src="icon-dice-loading.svg"
        alt="loading dice icon"
        animate={{ y: [0, 5, -50, 5, 0], rotate: [0, 0, 360, 0, 0] }}
        transition={{ repeat: Infinity }}
      />}
    </main>
  )
}

export default App;
