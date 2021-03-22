export interface NavigationBarProps {
  isActive?: boolean;
  isLoading?: boolean;
  auth: {
    isAuthenticated: boolean;
  };

  signoutUser
}
