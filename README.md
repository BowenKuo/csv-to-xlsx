# @bowenkuo/csv-to-xlsx

Convert CSV files to XLSX (Excel 2007+ XML Format) files.

Written in JavaScript. Available for Node.js CLI and API.

Binaries are available for:

- Linux x64

## Features

- Binaries - download and run via your OS's command-line utility
- Fast and Reliable
- Full UTF-8 support
- CSV Column detection
- Batch mode - convert a CSV folder to an XLSX folder
- Node.js CLI and API

## Usage

### How to build binary file from JS source

Start a node container

```bash
docker run -it \
  --name build_csv2xlsx \
  -v /path/to/csv-to-xlsx/git:/path/to/csv-to-xlsx/git \
  node:12.16.2-alpine \
  sh
# Now we're in the container
cd /path/to/csv-to-xlsx/git
# install package nexe
npm install nexe -g
# compile to binary file using nexe
nexe ./src/csv-to-xlsx.js -o ./bin/csv-to-xlsx
```

### Binaries

Download the executables from the `bin` folder.

```bash
./csv-to-xlsx -i "input-directory"
# for example
./csv-to-xlsx -i test && ls test
# after running this line, transformed xlsx will 
# be generated under the same folder 'test'
```

## License

Released under the MIT License - see `LICENSE.md` for details.
