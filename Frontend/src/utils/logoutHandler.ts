import { asyncPost } from '../utils/fetch';
import { auth_api } from '../enum/api';

export const handleLogout = async (onLogoutSuccess?: () => void) => {
  const token = localStorage.getItem('token');
  
  try {
    if (token) {
      await asyncPost(auth_api.logout, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    }
  } catch (error) {
    console.log("logout error: ", error);
  }
  
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  if (onLogoutSuccess) {
    onLogoutSuccess();
  }
  
  window.location.reload();
};