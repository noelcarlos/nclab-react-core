# nclab-react-core

> nclab react core library

[![NPM](https://img.shields.io/npm/v/nclab-react-core.svg)](https://www.npmjs.com/package/nclab-react-core) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## How to install

```bash
cd nclab-react-core
sudo npm link
cd [proyecto]
npm install --save nclab-react-core
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'nclab-react-core'
import 'nclab-react-core/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [Noel Hernandez](https://github.com/Noel Hernandez)

## Development

lanzar en cada actualizacion, para que publique.

```bash
yarn 
sudo yarn link
yarn start
```

En la carpeta del proyecto donde se va a usar
```bash
yarn 
sudo yarn link shared-bigblue-react-core 
yarn start
```
## Upgrade node version

```bash
brew update
brew doctor
brew upgrade node
sudo chown -R $USER /usr/local
brew link --overwrite node
```