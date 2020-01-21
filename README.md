
# react-file-viewer

Extendable file viewer for web

## Supported file formats:

 - Images: png, jpeg, gif, bmp, including 360-degree images
 - pdf
 - csv
 - xslx
 - docx
 - Video: mp4, webm
 - Audio: mp3

## Installation

```shell
$ npm i @marcioferlan/react-file-viewer
```

## Usage

There is one main React component, `FileViewer`, that takes the following props:

|Prop|Type|Required|Description|
|-|-|-|-|
|`fileType`|string|Yes|Type of resource to be shown (one of the supported file formats, eg `'png'`). Passing in an unsupported file type will result in displaying an `unsupported file type` message (or a custom component).|
|`filePath`|string|Yes|The url of the resource to be shown by the FileViewer.|
|`onError`|function|No|Function that will be called when there is an error in the file viewer fetching or rendering the requested resource. This is a place where you can pass a callback for a logging utility.|
|`errorComponent`|react element|No|A component to render in case of error instead of the default error component that comes packaged with react-file-viewer.|
|`unsupportedComponent`|react element|No|A component to render in case the file format is not supported.|
|`loaderComponent`|react element|No|A component to render when the documents is being fetched. If it is not supplied, the default loader will be rendered.|
|`headers`|object|No|Object to be used as headers when the documents are fetched. [ONLY SUPPORTED FOR .pdf .docx .jpeg .png FILES]. For example can be used to pass Authorization Headers.|

To use a custom error component, you might do the following:

```jsx
// MyApp.js
import React, { Component } from 'react';
import FileViewer from '@marcioferlan/react-file-viewer';
import { CustomErrorComponent } from './custom-error';

const file = 'http://example.com/image.png'
const type = 'png'

class MyComponent extends Component {
  render() {
    return (
      <FileViewer
        fileType={type}
        filePath={file}
        headers={{ Authorization: 'Bearer MY_TOKEN' }}
        loaderComponent={CustomLoaderComponent}
        errorComponent={CustomErrorComponent}
        onError={this.onError}/>
    );
  }

  onError(e) {
    console.log(e, 'error in file-viewer');
  }
}
```

## Development

There is a demo app built into this library that can be used for development
purposes. It is by default served via webpack-dev-server.

### To start demo app

`make start` will start the demo app served by webpack-dev-server

### Testing

Tests use Jest and Enzyme.

Run tests with:

```
make test
```

This starts Jest in watch mode. To run a particular test file, while in watch mode
hit `p` and then type the path or name of the file.

Some tests use snapshots. If intended changes to a component cause snapshot tests
to fail, snapshot files need to be updated (stored in `__snapshots__` directories).
To do this run:

```
npm run jest --updateSnapshot
```

### To run the linter

`make lint`

### Extending the file viewer

Adding supported file types is easy (and pull requests are welcome!). Say, for
example, you want to add support for `.rtf` files. First, you need to create a
"driver" for that file type. A driver is just a component that is capable of
rendering that file type. (See what exists now in `src/components/drivers`.) After
you've created the driver component and added it to `src/components/drivers`, you
simply need to import the component into `file-vewer.jsx` and add a switch clause
for `rtf` to the `getDriver` method. Ie:

```
case 'rtf':
  return RtfViewer;
```

## Roadmap

- Remove ignored linting rules and fix them
