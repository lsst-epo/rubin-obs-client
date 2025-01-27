"use client";
import { usePathname } from "next/navigation";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface NavigationMenuState {
  open: boolean;
  pinned: boolean;
  activeSubmenu: Set<string>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setPinned: Dispatch<SetStateAction<boolean>>;
  openMenu: (id: string, closeExistingOpen?: boolean) => void;
  closeMenu: (id?: string) => void;
  close: () => void;
}

const NavigationMenuContext = createContext<NavigationMenuState | undefined>(
  undefined
);

export const NavigationMenuProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const pathname = usePathname();
  const [pinned, setPinned] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<Set<string>>(new Set());

  useEffect(() => {
    close();
  }, [pathname]);

  const close = () => {
    setOpen(false);
    setPinned(false);
    setActiveSubmenu(new Set());
  };

  const openMenu = (id: string, closeExistingOpen = false) => {
    setActiveSubmenu((prev) => {
      const next = new Set(prev);

      if (closeExistingOpen) {
        next.clear();
      }

      next.add(id);

      return next;
    });
  };

  const closeMenu = (id?: string) => {
    setActiveSubmenu((prev) => {
      const next = new Set(prev);

      if (id) {
        next.delete(id);
      } else {
        next.clear();
      }

      return next;
    });
  };

  return (
    <NavigationMenuContext.Provider
      value={{
        pinned,
        setPinned,
        open,
        setOpen,
        activeSubmenu,
        openMenu,
        closeMenu,
        close,
      }}
    >
      {children}
    </NavigationMenuContext.Provider>
  );
};

NavigationMenuProvider.displayName = "Provider.NavigationMenu";

const useNavigationMenu = () => {
  const context = useContext(NavigationMenuContext);
  if (context === undefined) {
    throw new Error(
      "useNavigationMenu must be used within a NavigationMenuContext"
    );
  }
  return context;
};

export default useNavigationMenu;
