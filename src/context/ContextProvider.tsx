import { createContext, Dispatch, SetStateAction, useState } from "react";
import Login, { LoginInterface, LoginResponse } from "./Authentication/Login";
import Signup, {
  SignupInterface,
  SignupResponse,
} from "./Authentication/Signup";
import addBot, { addBotInterface, addBotResponse } from "./Overview/addBot";
import getBots, { botInterface, getBotsResponse } from "./Bots/getBots";
import deleteBot, { deleteBotResponse } from "./Bots/deleteBot";
import updateBot, { updateBotResponse } from "./Bots/updateBot";
import getNotifications, {
  getNotificationResponse,
  notificationInterface,
} from "./Notifications/getNotifications";
import downloadData from "./Bots/downloadData";
import saveCheckboxes from "./Bots/saveCheckboxes";
export interface LoggedInUser {
  id: string;
  name: string;
  email: string;
}

export interface ContextInterface {
  tabs: {
    currTab: string;
    setCurrTab: Dispatch<SetStateAction<string>>;
  };
  auth: {
    Login: (data: LoginInterface) => LoginResponse;
    Signup: (data: SignupInterface) => SignupResponse;
    signupData: SignupInterface;
    setSignupData: Dispatch<SetStateAction<SignupInterface>>;
    isLoggedIn: LoggedInUser | null;
    setIsLoggedIn: Dispatch<SetStateAction<LoggedInUser | null>>;
  };
  overview: {
    addBot: (data: addBotInterface) => addBotResponse;
  };
  bots: {
    getBots: () => addBotResponse;
    allBots: botInterface[];
    setAllBots: any;
    deleteBot: (data: string) => deleteBotResponse;
    updateBot: (data: any, id: string) => updateBotResponse;
    downloadData: (data: any, id: string) => any;
    saveCheckboxes: (data: any, id: string) => any;
  };
  notification: {
    getNotifications: () => getNotificationResponse;
    notifications: notificationInterface[];
    setNotifications: Dispatch<SetStateAction<notificationInterface[]>>;
  };
}

interface CtxChildren {
  children: JSX.Element;
}

export const ParentContext = createContext<ContextInterface | any>({});

const ContextProvider: any = ({ children }: CtxChildren) => {
  const [currTab, setCurrTab] = useState<string>("Overview");
  const [signupData, setSignupData] = useState<SignupInterface>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState<LoggedInUser | null>(null);
  const [allBots, setAllBots] = useState<botInterface[]>([]);
  const [notifications, setNotifications] = useState<notificationInterface[]>(
    []
  );

  const CtxValues: ContextInterface = {
    tabs: {
      currTab,
      setCurrTab,
    },
    auth: {
      Login,
      Signup,
      signupData,
      setSignupData,
      isLoggedIn,
      setIsLoggedIn,
    },
    overview: {
      addBot,
    },
    bots: {
      getBots,
      allBots,
      setAllBots,
      deleteBot,
      updateBot,
      downloadData,
      saveCheckboxes,
    },
    notification: {
      getNotifications,
      notifications,
      setNotifications,
    },
  };
  return (
    <ParentContext.Provider value={CtxValues}>
      {children}
    </ParentContext.Provider>
  );
};

export default ContextProvider;
