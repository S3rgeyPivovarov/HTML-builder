const fs = require("fs").promises;
const path = require("path");

async function filesInfo() {
  const folderPath = path.join(__dirname, "secret-folder");
  const files = await fs.readdir(folderPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile()) {
      const fileInfo = await fs.stat(path.join(folderPath, file.name));
      const fileSize = (fileInfo.size / 1024).toFixed(1);
      const fileName = path.parse(file.name).name;
      const fileExt = path.parse(file.name).ext.slice(1);

      console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
    }
  }
}

filesInfo();
