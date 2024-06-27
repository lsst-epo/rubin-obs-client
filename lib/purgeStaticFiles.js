import { stat, unlink, readdir, rmdir } from "node:fs/promises";

const purgeNextjsStaticFiles = async (pathSlugs) => {
  if (!Array.isArray(pathSlugs) || pathSlugs.length < 1) {
    return false;
  }

  const fullSlugPath = `${process.env.PWD}/.next/server/pages/${pathSlugs.join(
    "/"
  )}`;

  const parentFolder = `${process.env.PWD}/.next/server/pages/${pathSlugs
    .slice(0, pathSlugs.length - 1)
    .join("/")}`;

  const htmlPath = `${fullSlugPath}.html`;
  const jsonPath = `${fullSlugPath}.json`;

  try {
    const htmlStat = await stat(htmlPath);
    const jsonStat = await stat(jsonPath);
    if (htmlStat && jsonStat) {
      try {
        await unlink(htmlPath);
        await unlink(jsonPath);

        if (pathSlugs.length > 1) {
          const readParent = await readdir(parentFolder);

          if (readParent.length === 0) {
            // the folder is now empty, let's delete it
            await rmdir(parentFolder);
          }
        }
      } catch (unlinkError) {
        console.error(
          `Error trying to purge nextjs static files with base (ending in .json or .html) ${fullSlugPath}`
        );

        console.error(unlinkError);
      }
    }
  } catch (e) {
    // expected in certain scenarios, stating non existant files etc
  }
};

export { purgeNextjsStaticFiles };
