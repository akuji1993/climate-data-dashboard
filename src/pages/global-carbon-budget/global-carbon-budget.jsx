import React from "react";
import style from "./global-carbon-budget.module.scss";
import GlobalCarbonBudgetChart from "../../components/global-carbon-budget-chart/global-carbon-budget-chart";
import data from "../../assets/data/global-carbon-budget.json";

const GlobalCarbonBudget = () => (
  <div className={style.GlobalCarbonBudget}>
    <GlobalCarbonBudgetChart data={data} />
    <h3>Sources</h3>
    <span className={style.paragraph}>
      Original data can be found here:{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/openclimatedata/global-carbon-budget">
        Open Climate Data Github
      </a>
    </span>
    <span className={style.paragraph}>
      You can learn more about this here:{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.earth-syst-sci-data.net/10/2141/2018/#abstract">
        Global Carbon Budget 2018 Paper
      </a>
    </span>
  </div>
);

export default GlobalCarbonBudget;
