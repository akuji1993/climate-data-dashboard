import React from "react";
import style from "./welcome-page.module.scss";

const WelcomePage = () => (
  <div className={style.WelcomePage}>
    <h2>Welcome to visualized climate data</h2>
    <span>Pick a topic from the navigation to learn more</span>
  </div>
);

export default WelcomePage;
