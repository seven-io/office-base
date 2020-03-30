const fs = require('fs-extra');
const FS = require('fs');
const path = require('path');
const pkgPath = path.resolve(path.join(__dirname, '..'));
const pkg = require(path.join(pkgPath, 'package.json'));
const appPath = process.env.INIT_CWD;
const publicPath = path.join(pkgPath, 'public');
const assetsPath = path.join(publicPath, 'assets');
const appAssetsPath = path.join(appPath, 'assets');
const templatePath = path.join(pkgPath, 'template');
const isSelfInstall = pkg.name === require(path.join(process.env.INIT_CWD, 'package.json')).name;

const copyIfNotNotExists = (from, to) => {
    try {
        FS.copyFileSync(from, to, FS.constants.COPYFILE_EXCL);

        return true;
    } catch (e) {
        if (e.message.startsWith('EEXIST')) {
            return false;
        }

        throw e;
    }
};

if (appPath && !isSelfInstall) {
    //fs.copySync(assetsPath, appAssetsPath);

    for (const name of fs.readdirSync(templatePath)) {
        copyIfNotNotExists(path.join(templatePath, name), path.join(appPath, name));
    }

    //FS.copyFileSync(publicPath + '/index.html', appPath + '/src/taskpane/taskpane.html');
}