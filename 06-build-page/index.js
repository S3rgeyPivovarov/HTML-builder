const fs = require("fs").promises;
const path = require("path");

async function buildPage() {
  const destinationDirectory = path.join(__dirname, "project-dist");
  await fs.mkdir(destinationDirectory, { recursive: true });

  const templateFile = await fs.readFile(
    path.join(__dirname, "template.html"),
    "utf8"
  );
  const componentsDirectory = path.join(__dirname, "components");
  const componentFiles = await fs.readdir(componentsDirectory);

  let pageContent = templateFile;
  for (const componentFile of componentFiles) {
    if (path.extname(componentFile) === ".html") {
      const componentName = path.parse(componentFile).name;
      const componentContent = await fs.readFile(
        path.join(componentsDirectory, componentFile),
        "utf8"
      );
      pageContent = pageContent.replace(
        new RegExp(`{{${componentName}}}`, "g"),
        componentContent
      );
    }
  }
  await fs.writeFile(
    path.join(destinationDirectory, "index.html"),
    pageContent
  );

  const stylesDirectory = path.join(__dirname, "styles");
  const styleFiles = await fs.readdir(stylesDirectory);
  let stylesContent = "";
  for (const styleFile of styleFiles) {
    if (path.extname(styleFile) === ".css") {
      const styleContent = await fs.readFile(
        path.join(stylesDirectory, styleFile),
        "utf8"
      );
      stylesContent += styleContent;
    }
  }
  await fs.writeFile(
    path.join(destinationDirectory, "style.css"),
    stylesContent
  );

  await copyDirectory(
    path.join(__dirname, "assets"),
    path.join(destinationDirectory, "assets")
  );
}

async function copyDirectory(sourceDirectory, destinationDirectory) {
  try {
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

buildPage();
