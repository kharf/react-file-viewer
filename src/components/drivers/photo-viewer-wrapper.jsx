// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';

import * as THREE from 'three';
import PhotoViewer from './photo-viewer';
import Photo360Viewer from './photo360-viewer';
import Loading from '../loading';

function getPhotoDriver(width, height, fileType) {
  if (fileType === 'jpg' && window.Math.abs((width / height) - 2) <= 0.01) {
    return Photo360Viewer;
  }
  return PhotoViewer;
}

export default class PhotoViewerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originalWidth: 0,
      originalHeight: 0,
      imageLoaded: false,
    };
  }

  componentDidMount() {
    const { headers } = this.props;
    // spike on using promises and a different loader or adding three js loading manager
    const loader = new THREE.FileLoader();
    loader.crossOrigin = '';
    loader.mimeType = 'image/png';
    loader.responseType = 'blob';
    if (headers) loader.requestHeader = headers;
    // load a resource
    loader.load(
      // resource URL
      this.props.filePath,
      // Function when resource is   loaded
      (response) => {
        const image = new Image();
        const blobUrl = URL.createObjectURL(response);
        image.onload = function () {
          const texture = new THREE.Texture(image);
          this.setState({
            originalWidth: texture.image.width,
            originalHeight: texture.image.height,
            imageLoaded: true,
            texture,
          });
        }.bind(this);
        image.src = blobUrl;
      },
      (xhr) => {
        console.log(`${xhr.loaded / xhr.total * 100}% loaded`);
      },
      (xhr) => {
        console.log('An error happened', xhr);
      },
    );
  }

  render() {
    if (!this.state.imageLoaded) {
      if (this.props.loaderComponent) return this.props.loaderComponent;
      return <Loading />;
    }
    const { originalWidth, originalHeight } = this.state;
    const PhotoDriver = getPhotoDriver(originalWidth, originalHeight, this.props.fileType);

    return (
      <PhotoDriver {...this.state} {...this.props} />
    );
  }
}
