export const isUserLoggedIn = () => {
  return !!localStorage.getItem("token"); // or any login identifier you store
};
