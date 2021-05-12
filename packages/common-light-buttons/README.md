<header>
  <h1 align="center">
    <a href="https://github.com/guanghechen/yozora-react/tree/master/packages/common-light-buttons#readme">@yozora/react-common-light-buttons</a>
  </h1>
  <div align="center">
    <a href="https://www.npmjs.com/package/@yozora/react-common-light-buttons">
      <img
        alt="Npm Version"
        src="https://img.shields.io/npm/v/@yozora/react-common-light-buttons.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-common-light-buttons">
      <img
        alt="Npm Download"
        src="https://img.shields.io/npm/dm/@yozora/react-common-light-buttons.svg"
      />
    </a>
    <a href="https://www.npmjs.com/package/@yozora/react-common-light-buttons">
      <img
        alt="Npm License"
        src="https://img.shields.io/npm/l/@yozora/react-common-light-buttons.svg"
      />
    </a>
    <a href="#install">
      <img
        alt="Module formats: cjs, esm"
        src="https://img.shields.io/badge/module_formats-cjs%2C%20esm-green.svg"
      />
    </a>
    <a href="https://github.com/nodejs/node">
      <img
        alt="Node.js Version"
        src="https://img.shields.io/node/v/@yozora/react-common-light-buttons"
      />
    </a>
    <a href="https://github.com/facebook/react">
      <img
        alt="React version"
        src="https://img.shields.io/npm/dependency-version/@yozora/react-common-light-buttons/peer/react"
      />
    </a>
    <a href="https://github.com/facebook/jest">
      <img
        alt="Tested with Jest"
        src="https://img.shields.io/badge/tested_with-jest-9c465e.svg"
      />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img
        alt="Code Style: prettier"
        src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"
      />
    </a>
  </div>
</header>
<br/>

Light buttons, imitate the window action icons in MacOS.

## Install

* npm

  ```bash
  npm install --save @yozora/react-common-light-buttons
  ```

* yarn

  ```bash
  yarn add @yozora/react-common-light-buttons
  ```


## Usage

* Use in React project

  ```tsx
  import React from 'react'
  import LightButtons from '@yozora/react-common-light-buttons'

  const wrapper = (
    <LightButtons
      onClose={...} 
      onMinimize={...}
      onMaximize={...}
    />
  )
  ```

### Props

Name        | Type                  | Required  | Default | Description
:----------:|:---------------------:|:---------:|:-------:|:-------------
`className` | `string`              | `false`   | -       | Root css class
`onClose`   | `function`            | `false`   | -       | Called when the close button clicked.
`onMaximize`| `function`            | `false`   | -       | Called when the maximize button clicked.
`onMinimize`| `function`            | `false`   | -       | Called when the minimize button clicked.
`style`     | `React.CSSProperties` | `false`   | -       | Root css style

* `className`: The root element of this component will always bind with the
  CSS class `'yozora-common-light-buttons'`.


## Related

None.
