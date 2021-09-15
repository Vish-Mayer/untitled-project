const tabBarIconHelper = (focused, route) => {
  let iconName;

  if (route.name === "Home") {
    iconName = focused ? "home-outline" : "home-outline";
  } else if (route.name === "TeeOff") {
    iconName = focused ? "golf-outline" : "golf-outline";
  } else if (route.name === "GolfBag") {
    iconName = focused ? "basket-outline" : "basket-outline";
  } else if (route.name === "Settings") {
    iconName = focused ? "settings-outline" : "settings-outline";
  }

  return iconName;
};

export default tabBarIconHelper;
