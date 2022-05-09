import React from 'react';
import { Button, Upload } from 'antd';
import propTypes from 'prop-types';
import 'antd/dist/antd.css';
import './imageUploader.scss';
import UploadIcon from '../../constants/icons/Upload';

function ImageUploader({ handlePreview, handleUpload }) {
  return (
    <div className="uploader-container">
      <div className="uploader-wrapper">
        <h1>Ürün Görseli</h1>
        <Upload.Dragger
          action="https://localhost:3000/"
          listType="picture"
          maxCount={1}
          onPreview={handlePreview}
          onChange={handleUpload}
          showUploadList={{ showRemoveIcon: true }}
          accept=".png, .jpg, .jpeg"
          progress={{
            strokeWidth: 3,
            format: (percent) => `${percent}%`,
            strokeColor: '#4B9CE2',
          }}
        >
          <div className="uploader-content">
            <UploadIcon />
            <br />
            Sürükleyip bırakarak yükle veya
            <br />
            <Button className="uploader-content-button">Click Upload</Button>
          </div>
          <div className="uploader-info-warning">
            PNG ve JPEG Dosya boyutu max. 400kb
          </div>
        </Upload.Dragger>
      </div>
    </div>
  );
}
ImageUploader.propTypes = {
  handlePreview: propTypes.func.isRequired,
  handleUpload: propTypes.func.isRequired,
};
export default ImageUploader;
