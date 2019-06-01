const fs = require('fs')
const path = require('path')

const backupFilePath = path.join(__dirname, '..', 'cached-package.json')
const primaryFilePath = path.join(__dirname, '..', 'package.json')

let stats
try {
  stats = fs.statSync(backupFilePath)
} catch (err) {
  stats = null
}

if (stats && stats.isFile()) {
  console.warn(`Backup file "${path.basename(backupFilePath)}" already exists!`)
  process.exit(0)
}

// Backup
fs.copyFileSync(primaryFilePath, backupFilePath)

// Alter the primary contents
const pkg = require(backupFilePath)
delete pkg.devDependencies
delete pkg.standard
delete pkg.jest
delete pkg.scripts.test

// Write the altered contents back to the primary file
fs.writeFileSync(primaryFilePath, JSON.stringify(pkg, null, 2), { encoding: 'utf8' })
