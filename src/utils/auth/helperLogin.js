export const handleLogin = (response) => {
  localStorage.setItem("accessToken", response?.accessToken);
  localStorage.setItem("refreshToken", response?.refreshToken);
};
