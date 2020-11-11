import fse from 'fs-extra';

export async function saveBase64File(dirName, file, fileName) {
  const path = `${__dirname}/../../files/${dirName}`;
  await fse.emptyDir(path);
  await fse.writeFile(`${path}/${fileName}`, file, { encoding: 'base64' });
  return `${path}/${fileName}`;
}
