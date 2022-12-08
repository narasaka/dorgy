import config from './config.json' assert { type: 'json' };
import { ensureDir, path } from './deps.ts';
import Logger from './logger.ts';
const { watchFs, copyFile, remove } = Deno;

async function main() {
  const processing = new Set(); // keep track of on-going moves
  const watcher = watchFs(config.dirtyFolder);
  const logger = Logger.getLogger()

  for await (const event of watcher) {
    logger.info(event);
    const { kind, paths } = event;
    const srcPath = path.normalize(paths[0]);

    if (path.basename(srcPath) === '.DS_Store') continue;
    if (processing.has(srcPath)) continue;
    processing.add(srcPath);

    if (kind === 'create' || kind === 'modify') {
      const filename = path.basename(srcPath);
      const extname = path.extname(srcPath);
      const isStrayFile = extname.length === 0;
      const destFolder = isStrayFile ? 'stray' : extname.substring(1);
      const destPath = path.join(config.cleanFolder, destFolder, filename);
      await ensureDir(path.join(config.cleanFolder, destFolder));

      try {
        await copyFile(srcPath, destPath);
        await remove(srcPath);
      } catch (err) {
        logger.info(err);
      } finally {
        setTimeout(() => processing.delete(srcPath), 1000);
      }
    }

    // @ts-ignore handler is a FileHandler
    logger.handlers.forEach((handler) => handler.flush());
  }
}

function isGood() {
  if (config.cleanFolder === '') {
    console.log('Please setup your clean folder.');
    return false;
  }
  if (config.dirtyFolder === '') {
    console.log('Please setup your dirty folder.');
    return false;
  }
  if (!path.isAbsolute(config.cleanFolder)) {
    console.log('Please use absolute paths for your clean folder.');
    return false;
  }
  if (!path.isAbsolute(config.dirtyFolder)) {
    console.log('Please use absolute paths for your dirty folder.');
    return false;
  }
  if (config.cleanFolder === config.dirtyFolder) {
    console.log('Dirty and clean folder cannot be the same.');
    return false;
  }

  console.log('Checks completed. Running program...');
  return true;
}

if (import.meta.main) {
  if (isGood()) main();
}
