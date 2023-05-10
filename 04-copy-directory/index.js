const fs = require("fs").promises;
const path = require("path");

async function copyDirectory(sourceDirectory, destinationDirectory) {
  try {
    await fs.rmdir(destinationDirectory, { recursive: true });
    await fs.mkdir(destinationDirectory);
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }

  const directoryEntries = await fs.readdir(sourceDirectory, {
    withFileTypes: true,
  });

  for (const directoryEntry of directoryEntries) {
    const sourcePath = path.join(sourceDirectory, directoryEntry.name);
    const destinationPath = path.join(
      destinationDirectory,
      directoryEntry.name
    );

    if (directoryEntry.isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }
}

copyDirectory(
  path.join(__dirname, "files"),
  path.join(__dirname, "files-copy")
);
