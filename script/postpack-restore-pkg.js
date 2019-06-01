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

if (!stats || !stats.isFile()) {
  throw new Error(`Backup file "${path.basename(backupFilePath)}" does not exist to restore!`)
}

// Restore (will overwrite)
fs.copyFileSync(backupFilePath, primaryFilePath)

// Cleanup
fs.unlinkSync(backupFilePath)
