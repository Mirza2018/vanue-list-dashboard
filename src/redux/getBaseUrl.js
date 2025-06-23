export const getBaseUrl = () => {
  return import.meta.env.VITE_PUBLIC_SERVER_URL;
}; 

export const getImageUrl = (key) => {
  return import.meta.env.VITE_PUBLIC_IMAGE_URL;
};
 
export const getSocketUrl = () => {
  return import.meta.env.VITE_PUBLIC_SOCKET_URL;
};
