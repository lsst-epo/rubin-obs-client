import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

// const MODALS = ["signIn", "register", "forgotPassword"];

// const VARS = ["role"];

export default function useAuthModal() {
  const router = useRouter();
  const pathName = usePathname();

  const getModalUrlObj = useCallback(
    (nameParam, queryVars) => {
      const query = {
        ...(nameParam && {
          [nameParam]: true,
        }),
        ...(queryVars && {
          ...queryVars,
        }),
      };

      return { pathname: pathName, query };
    },
    [pathName]
  );

  const doRouterPush = useCallback(
    (nameParam, queryVars) => {
      const url = getModalUrlObj(nameParam, queryVars);

      router.push(url);
    },
    [router, getModalUrlObj]
  );

  return {
    openModal: (nameParam, queryVars) => doRouterPush(nameParam, queryVars),
    getModalUrl: (nameParam, queryVars) => getModalUrlObj(nameParam, queryVars),
    closeModal: () => doRouterPush(),
  };
}
