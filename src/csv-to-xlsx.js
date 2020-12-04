#!/usr/bin/env node

/*
 Requires
 *********************************************************/
const path = require('path');

const fs = require('fs-extra');

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

const program = require('commander');

const convertCsvToXlsx = require('./convertCsvToXlsx');

if (module.parent) {
  module.exports = convertCsvToXlsx;
} else {
  /*
   Variables
   *********************************************************/
  const pkg = require('../package');

  /*
   Program
   *********************************************************/
  program
    .version(pkg.version, '-v, --version')
    .option('-i, --input-dir [dir]', 'Input directory that has the CSV files', 'csv')

  program.on('--help', function () {
    console.log(``);
    console.log(`Created by: ${pkg.author.name}`);
    console.log(`Please report bugs at: ${pkg.bugs.url}`);
    console.log(`Version: ${pkg.version}`);
  });

  program.parse(process.argv);

  const csvPath = program.inputDir;

  // check the csvPath
  if (!fs.existsSync(csvPath)) {
    // csv folder doesn't exist, doing it wrong
    console.error(`Invalid input directory: ${csvPath}\n`);
    process.exitCode = 1;
    program.help(); // exit immediately
  }
  
  const csvFiles = getAllFiles(csvPath);
  
  for (const file of csvFiles) {
    // parse file
    const fileObject = path.parse(file);
    // check file extension
    if (fileObject.ext !== '.csv') {
      continue;
    }
    // convert
    try {
      convertCsvToXlsx(file, path.join(fileObject.dir, `${fileObject.name}.xlsx`));
    } catch (e) {
      console.info(`Error while converting: ${fileObject.name}`);
      console.info(`${e.toString()}`);
    }
  }

  console.info(`Complete.`);
}
