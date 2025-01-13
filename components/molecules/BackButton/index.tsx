"use client";

import { useSafeBackNavigation } from "@/contexts/History";
import Button, { type ButtonProps } from "@rubin-epo/epo-react-lib/Button";
import { FC, PropsWithChildren } from "react";

interface BackButtonProps extends ButtonProps {
  fallback: string;
  matches?: string;
  matchSearchParams?: boolean;
}

const BackButton: FC<PropsWithChildren<BackButtonProps>> = ({
  children,
  fallback,
  matches,
  matchSearchParams,
  ...props
}) => {
  const { safeBackNavigation } = useSafeBackNavigation({
    fallback,
    matches,
    matchSearchParams,
  });

  return (
    <Button {...props} onClick={() => safeBackNavigation()}>
      {children}
    </Button>
  );
};

BackButton.displayName = "Molecule.BackButton";

export default BackButton;
