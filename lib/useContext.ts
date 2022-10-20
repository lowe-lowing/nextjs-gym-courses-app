import { createContext } from "react";

interface AppContextInterface {
  currentUser: UserObject | null;
  setCurrentUser: (user: UserObject | null) => void;
}

const AppCtx = createContext<AppContextInterface | null>(null);

export default AppCtx;
