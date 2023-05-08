const fs = require("fs").promises;
const path = require("path");

async function mergeStyles(
  sourceDirectory,
  destinationDirectory,
  bundleFileName
) {
  const stylesArray = [];
  const directoryEntries = await fs.readdir(sourceDirectory);

  for (const directoryEntry of directoryEntries) {
    if (path.extname(directoryEntry) === ".css") {
      const filePath = path.join(sourceDirectory, directoryEntry);
      const fileContent = await fs.readFile(filePath, "utf8");
      stylesArray.push(fileContent);
    }
  }

  await fs.mkdir(destinationDirectory, { recursive: true });
  await fs.writeFile(
    path.join(destinationDirectory, bundleFileName),
    stylesArray.join("\n")
  );
}

mergeStyles(
  path.join(__dirname, "styles"),
  path.join(__dirname, "project-dist"),
  "bundle.css"
);
