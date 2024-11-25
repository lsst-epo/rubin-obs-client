"use client";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface HeadroomState {
  pinned: boolean;
  setPinned: Dispatch<SetStateAction<boolean>>;
}

const HeadroomContext = createContext<HeadroomState | undefined>(undefined);

export const HeadroomProvider: FunctionComponent<
  PropsWithChildren<HeadroomState>
> = ({ children, ...props }) => {
  return (
    <HeadroomContext.Provider value={{ ...props }}>
      {children}
    </HeadroomContext.Provider>
  );
};

HeadroomProvider.displayName = "Provider.Headroom";

const useHeadroom = () => {
  const context = useContext(HeadroomContext);
  if (context === undefined) {
    throw new Error("useHeadroom must be used within a HeadroomProvider");
  }
  return context;
};

export default useHeadroom;
