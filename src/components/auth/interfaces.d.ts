export interface HomeState {
  // clickQuickView: boolean;
  [key: string]: any;
}

export interface HomeProps {
  currentUser: User;

  signUpUser: (user: User) => Promise<any>;
  signInUser: (user: User) => Promise<any>;
  match: {
    url: string;
  };
  location: {
    pathname: string;
  };
}
