import React from "react";
import style from "./App.module.scss";
import classNames from "classnames";
import { withRouter } from "react-router";
import { Route, Link } from "react-router-dom";
import GlobalCarbonBudgetPage from "./pages/global-carbon-budget/global-carbon-budget";
import EmissionsByCountryPage from "./pages/emissions-by-country/emissions-by-country";
import WelcomePage from "./pages/welcome-page/welcome-page";

const links = [
  {
    path: "/emissions-by-country",
    label: "Emissions by Country"
  },
  {
    path: "/global-carbon-budget",
    label: "Global Carbon Budget"
  },
  {
    path: "/somethingelse",
    label: "Something else"
  }
];

const App = props => {
  const isRoute = path => {
    const {
      location: { pathname }
    } = props;

    return pathname === path;
  };

  return (
    <div className={style.App}>
      <div className={style.navigation}>
        {links.map((link, idx) => (
          <Link
            key={`link-route-${idx}`}
            className={classNames(style.link, {
              [style.link__selected]: isRoute(link.path)
            })}
            to={link.path}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className={style.content}>
        <Route path="/" exact component={WelcomePage} />
        <Route
          path="/global-carbon-budget"
          component={GlobalCarbonBudgetPage}
        />
        <Route
          path="/emissions-by-country"
          component={EmissionsByCountryPage}
        />
        <Route path="/somethingelse" render={() => <div />} />
      </div>
    </div>
  );
};

export default withRouter(App);
