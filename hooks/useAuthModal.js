import { useCallback } from "react";
import { useRouter } from "next/router";

export default function useAuthModal() {
  const router = useRouter();

  const doRouterPush = useCallback(
    (nameParam, roleParam) => {
      const query = {
        ...(nameParam && {
          [nameParam]: true,
        }),
        ...(roleParam && {
          [roleParam]: true,
        }),
      };
      router.push({ query }, undefined, { shallow: true });
    },
    [router]
  );

  return {
    openModal: (nameParam, roleParam) => doRouterPush(nameParam, roleParam),
    closeModal: () => doRouterPush(),
  };
}
