"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, PropsWithChildren, useEffect } from "react";

const prevPathKey = "prevPath";
const currentPathKey = "currentPath";

export const getPreviousPath = () => {
  return sessionStorage.getItem(prevPathKey);
};
export const getCurrentPath = () => {
  return sessionStorage.getItem(currentPathKey);
};

interface CanUseRouterBackProps {
  matches?: string;
  matchSearchParams?: boolean;
}

/**
 * Path to check against
 * @param matches
 * @returns
 */
export const canUseRouterBack = ({
  matches,
  matchSearchParams = false,
}: CanUseRouterBackProps) => {
  const previousPath = getPreviousPath();
  const currentPath = getCurrentPath();

  if (!previousPath || previousPath === currentPath) {
    return false;
  }

  if (matches) {
    if (matchSearchParams) {
      return matches === previousPath;
    }

    const [previousPathOnly] = previousPath.split("?");

    return matches === previousPathOnly;
  }

  return true;
};

interface SafeBackNavigationProps extends CanUseRouterBackProps {
  fallback: string;
}

export const useSafeBackNavigation = ({
  fallback,
  ...props
}: SafeBackNavigationProps) => {
  const router = useRouter();

  const safeBackNavigation = () => {
    if (canUseRouterBack(props)) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return { safeBackNavigation };
};

export const HistoryProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const searchString = searchParams?.toString();
      const currentPath = `${pathname}${
        searchString && searchString?.length > 0 ? `?${searchString}` : ""
      }`;
      const prevPath = getCurrentPath();

      if (currentPath !== prevPath) {
        sessionStorage.setItem(currentPathKey, currentPath);

        if (prevPath) {
          sessionStorage.setItem(prevPathKey, prevPath);
        }
      }
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
};

HistoryProvider.displayName = "Provider.History";
