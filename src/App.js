import React, { useState, useEffect } from "react";
import "./Tamagotchi.css";

const Tamagotchi = () => {
  const [name, setName] = useState("Eros");
  const [age, setAge] = useState(0);
  const [hunger, setHunger] = useState(0);
  const [health, setHealth] = useState(100);
  const [happiness, setHappiness] = useState(100);
  const [causeOfDeath, setCauseOfDeath] = useState("");

  useEffect(() => {
    let interval;
    if (health > 0 && happiness > 0 && hunger < 100) {
      interval = setInterval(() => {
        setAge((age) => age + 1);
        setHunger((hunger) => Math.min(100, hunger + 5));
        setHealth((health) => Math.max(0, health - 5));
        setHappiness((happiness) => Math.max(0, happiness - 7));
      }, 800);
    } else {
      clearInterval(interval);
      setCauseOfDeath(
        health <= 0
          ? "Your virtual pet has died due to health problems"
          : happiness <= 0
          ? "Your virtual pet has died of sadness"
          : hunger >= 100
          ? "Your virtual pet has starved to death"
          : ""
      );
    }

    return () => clearInterval(interval);
  }, [health, happiness, hunger]);

  const feed = () => {
    setHunger((hunger) => Math.max(0, Math.min(100, hunger - 10)));
    setHealth((health) => Math.max(0, Math.min(100, health - 5)));
    setHappiness((happiness) => Math.max(0, Math.min(100, happiness + 7)));
  };

  const play = () => {
    setHunger((hunger) => Math.max(0, Math.min(100, hunger + 15)));
    setHealth((health) => Math.max(0, Math.min(100, health - 10)));
    setHappiness((happiness) => Math.max(0, Math.min(100, happiness + 5)));
  };

  const sleep = () => {
    setHunger((hunger) => Math.max(0, Math.min(100, hunger + 5)));
    setHealth((health) => Math.max(0, Math.min(100, health + 5)));
    setHappiness((happiness) => Math.max(0, Math.min(100, happiness - 5)));
  };

  const getBarColor = (value) => {
    if (value > 80) {
      return "green";
    } else if (value > 20) {
      return "yellow";
    } else {
      return "red";
    }
  };

  const getBarColorHunger = (value) => {
    if (value > 80) {
      return "red";
    } else if (value > 20) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <div
      style={{
        marginTop: "5%",
        marginLeft: "25%",
        padding: "20px",
        width: "50%",
        border: "2px solid black",
        boxSizing: "border-box",
        border:"2px solid white",
        borderRadius:"20px"
      }}
    >
      <div style={{ textAlign: "center", margin: "2vh 1vw" }}>
        <h1>{name}</h1>
        <p>Age: {age}</p>
        <p>
          Hunger:
          <div
            className="progress-bar"
            style={{
              width: `${hunger}%`,
              backgroundColor: getBarColorHunger(hunger),
            }}
          >
            {hunger}
          </div>
        </p>
        <p>
          Health:
          <div
            className="progress-bar"
            style={{
              width: `${health}%`,
              backgroundColor: getBarColor(health),
            }}
          >
            {health}
          </div>
        </p>

        <p>
          Happiness:
          <div
            className="progress-bar"
            style={{
              width: `${happiness}%`,
              backgroundColor: getBarColor(happiness),
            }}
          >
            {happiness}
          </div>
        </p>
        <p>
          <b style={{ color: "red" }}>{causeOfDeath}</b>
        </p>

        {!causeOfDeath && (
          <>
            <button style={{ margin: "5px" }} onClick={feed}>
              Feed
            </button>
            <button style={{ margin: "5px" }} onClick={play}>
              Play
            </button>
            <button style={{ margin: "5px" }} onClick={sleep}>
              Sleep
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tamagotchi;
