// Node.js core modules
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

// Userland modules
const tar = require('tar')

// Local modules
const pkg = require('../package.json')

function getTarballName () {
  const name = pkg.name.replace(/^@([^/]+)\/([^/]+)$/, '$1-$2')
  return `${name}-${pkg.version}`
}

const pathToExtract = 'package/package.json'
const tarballBasename = getTarballName()
const tgzFile = path.join(__dirname, '..', `${tarballBasename}.tgz`)
const tarFile = path.join(__dirname, '..', `${tarballBasename}.tar`)
const unpackedPkgFile = path.join(__dirname, '..', ...pathToExtract.split('/'))

process.on('uncaughtException', (err) => {
  console.error('Uncaught error!\n' + err.stack)
})

fs.createReadStream(tgzFile)
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream(tarFile))
  .on('close', () => {
    // Extract just the "package.json" from the tarball archive
    tar.extract(
      {
        cwd: path.resolve(__dirname, '..'),
        file: tarFile,
        sync: true,
        strict: true,
        preserveOwner: true
      },
      [pathToExtract]
    )

    const unpackedPkg = require(unpackedPkgFile)
    delete unpackedPkg.scripts
    delete unpackedPkg.standard
    delete unpackedPkg.jest
    delete unpackedPkg.devDependencies

    // Write the altered contents back to the file
    fs.writeFileSync(unpackedPkgFile, JSON.stringify(unpackedPkg, null, 2), { encoding: 'utf8' })

    // Overwrite the tarball archive's "package.json" file
    tar.replace(
      {
        cwd: path.resolve(__dirname, '..'),
        file: tarFile,
        sync: true,
        strict: true
      },
      [pathToExtract]
    )

    fs.createReadStream(tarFile)
      .pipe(zlib.createGzip())
      .pipe(fs.createWriteStream(tgzFile))
      .on('close', () => {
        console.log('Successfully rewrote the packed "package.json"')

        fs.unlinkSync(unpackedPkgFile)
        fs.rmdirSync(path.dirname(unpackedPkgFile))
        fs.unlinkSync(tarFile)
      })
  })
