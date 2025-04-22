"use client";

import { FC, useLayoutEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { CantoVideoMetadata } from "@/lib/api/galleries/schema";
import IconButton from "@/components/atomic/Button/IconButton";
import CantoPlayer from "@/components/molecules/players/Canto";
import styles from "./styles.module.css";

interface FeaturedVideoDialogProps {
  videos: Array<{
    orientation: "portrait" | "landscape";
    asset: CantoVideoMetadata;
  }>;
  id: string;
  caption?: string;
}

const FeaturedVideoDialog: FC<FeaturedVideoDialogProps> = ({
  videos,
  caption,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [hasSeenVideo, setHasSeen] = useLocalStorage<boolean>(
    `video-${id}`,
    false
  );

  useLayoutEffect(() => {
    if (!hasSeenVideo) {
      setOpen(true);
    }
  }, [hasSeenVideo]);

  const handleClose = (shouldOpen: boolean) => {
    setOpen(shouldOpen);
    setHasSeen(!shouldOpen);
  };

  return (
    <Dialog
      transition
      className={styles.dialog}
      open={open}
      onClose={handleClose}
    >
      <DialogBackdrop className={styles.backdrop} />
      <DialogPanel className={styles.panel}>
        <CantoPlayer
          className={styles.video}
          videos={videos}
          playerProps={{
            controls: false,
            autoPlay: true,
            disablePictureInPicture: true,
            disableRemotePlayback: true,
            poster: videos[0].asset.url.directUrlPreview,
            muted: true,
            "aria-description": caption,
            onEnded: () => {
              handleClose(false);
            },
          }}
        />
        <IconButton
          icon="close"
          className={styles.close}
          onClickCallback={() => handleClose(false)}
          size={20}
        />
      </DialogPanel>
    </Dialog>
  );
};

FeaturedVideoDialog.displayName = "Organism.FeaturedVideoDialog";

export default FeaturedVideoDialog;
