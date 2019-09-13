import React from "react";
import {
  FaPlug,
  FaIndustry,
  FaBuilding,
  FaCarSide,
  FaFlask
} from "react-icons/fa";

export const getIcon = category => {
  switch (category) {
    case "power_industry":
      return <FaPlug />;
    case "other_industrial_combustion":
      return <FaIndustry />;
    case "buildings":
      return <FaBuilding />;
    case "transport":
      return <FaCarSide />;
    case "non_combustion":
      return <FaFlask />;
    default:
      return <FaPlug />;
  }
};
