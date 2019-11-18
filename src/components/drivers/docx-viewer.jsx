// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';
import mammoth from 'mammoth';

import 'styles/docx.scss';
import Loading from '../loading';

export default class extends Component {
  componentDidMount() {
    const { headers, filePath } = this.props;
    const jsonFile = new XMLHttpRequest();
    jsonFile.open('GET', filePath, true);
    if (headers) {
      for (const prop in headers) {
        jsonFile.setRequestHeader(prop, headers[prop]);
      }
    }
    jsonFile.send();
    jsonFile.responseType = 'arraybuffer';
    jsonFile.onreadystatechange = () => {
      if (jsonFile.readyState === 4 && jsonFile.status === 200) {
        mammoth.convertToHtml(
          { arrayBuffer: jsonFile.response },
          { includeDefaultStyleMap: true },
        )
          .then((result) => {
            const docEl = document.createElement('div');
            docEl.className = 'document-container';
            docEl.innerHTML = result.value;
            document.getElementById('docx').innerHTML = docEl.outerHTML;
          })
          .catch((a) => {
            console.log('alexei: something went wrong', a);
          })
          .done();
      }
    };
  }

  render() {
    const { loaderComponent } = this.props;
    return (
      <div id="docx">
        {loaderComponent ? loaderComponent : <Loading />}
      </div>);
  }
}
