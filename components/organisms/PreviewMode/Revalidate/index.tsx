"use client";
import { FC, useEffect, useId, useState, useTransition } from "react";
import { usePathname } from "@/lib/i18n/navigation";
import { useTranslation } from "react-i18next";
import { Transition } from "@headlessui/react";
import styles from "./styles.module.css";
import revalidate from "@/services/actions/revalidate";

const RevalidateCurrentPath: FC<{ token: string }> = ({ token }) => {
  const id = useId();
  const [showTooltip, setShowTooltip] = useState(false);
  const [revalidationState, setRevalidationState] = useState<{
    state: "success" | "error";
    message: string;
  }>();
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    setRevalidationState(undefined);
  }, [pathname]);

  const handleRevalidate = async () => {
    const revalidated = await revalidate({ uri: pathname, token });

    if (revalidated) {
      setRevalidationState({
        state: "success",
        message: t("preview_mode.revalidate", {
          context: "success",
          pathname: revalidated.paths[0],
        }),
      });
    } else {
      setRevalidationState({
        state: "error",
        message: t("preview_mode.revalidate", { context: "error" }),
      });
    }
  };

  return (
    <div className={styles.revalidation}>
      <output htmlFor={id} className={styles.output}>
        <Transition show={!isPending && !!revalidationState}>
          <span className={styles.outputText}>
            {revalidationState?.message}
          </span>
        </Transition>
      </output>
      <div className={styles.buttonWrapper}>
        <button
          id={id}
          aria-describedby={`${id}-description`}
          className={styles.button}
          onClick={() => {
            setRevalidationState(undefined);
            startTransition(handleRevalidate);
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          disabled={isPending}
        >
          {t("preview_mode.revalidate")}
        </button>
        <Transition unmount={false} show={showTooltip}>
          <div id={`${id}-description`} className={styles.panel}>
            {t("preview_mode.revalidate_tooltip")}
          </div>
        </Transition>
      </div>
    </div>
  );
};

RevalidateCurrentPath.displayName = "Organism.PreviewMode.Revalidate";

export default RevalidateCurrentPath;
