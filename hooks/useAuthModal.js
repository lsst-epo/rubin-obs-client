import { useCallback } from "react";
import { useRouter } from "next/router";

// const MODALS = ["signIn", "register", "forgotPassword"];

// const VARS = ["role"];

export default function useAuthModal() {
  const router = useRouter();

  const getModalUrlObj = useCallback(
    (nameParam, queryVars) => {
      const path = router.asPath.split("?");

      const query = {
        ...(nameParam && {
          [nameParam]: true,
        }),
        ...(queryVars && {
          ...queryVars,
        }),
      };

      return { pathname: path[0], query };
    },
    [router]
  );

  const doRouterPush = useCallback(
    (nameParam, queryVars) => {
      const url = getModalUrlObj(nameParam, queryVars);

      router.push(url, undefined, {
        shallow: true,
      });
    },
    [router, getModalUrlObj]
  );

  return {
    openModal: (nameParam, queryVars) => doRouterPush(nameParam, queryVars),
    getModalUrl: (nameParam, queryVars) => getModalUrlObj(nameParam, queryVars),
    closeModal: () => doRouterPush(),
  };
}
