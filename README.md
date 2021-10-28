# jbrowse-plugin-autocreatespreadsheet

A demo to auto-launch a SpreadsheetView on startup with a plugin

Ways to use

- Can run `yarn build` then outputs built files to dist directory. Copy the
  built file to your webserver, and reference it in your plugins section of
  your config

## Developing the code

```
git clone https://github.com/cmdcolin/jbrowse-plugin-autocreatespreadsheet
cd jbrowse-plugin-autocreatespreadsheet
yarn
yarn start
```

This launches the code on port 9000

Then you can visit in your jbrowse

http://localhost/jbrowse/?config=http://localhost:9000/config.json

This will load a demo instance of this config
