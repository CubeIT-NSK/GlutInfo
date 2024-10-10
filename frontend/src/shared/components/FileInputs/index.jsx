import React, { useRef, useState } from 'react';
import styles from "./index.module.css";
import icons from '../../resources/icon';

const FileInput = ({ title, multiple = false, maxFiles = Infinity, acceptedFormats = [], onFileChange }) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const getFileWord = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) return 'файл';
    if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) return 'файла';

    return 'файлов';
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (!isFileSelectionValid(selectedFiles)) return;

    Promise.all(selectedFiles.map(convertToBase64))
      .then(newFiles => {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
        setError('');
        onFileChange?.([...files, ...newFiles]);
      })
      .catch(() => setError('Ошибка при конвертации файлов или недопустимая длина видео.'));
  };

  const isFileSelectionValid = (selectedFiles) => {
    if (multiple && files.length + selectedFiles.length > maxFiles) {
      setError(`Вы можете выбрать не более ${maxFiles} ${getFileWord(maxFiles)}.`);
      return false;
    }

    const invalidFiles = selectedFiles.filter(file =>
      acceptedFormats.length && !acceptedFormats.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError(`Разрешённые форматы: ${acceptedFormats.join(', ')}`);
      return false;
    }

    return true;
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => handleFileLoadEnd(reader, file, resolve, reject);
      reader.onerror = () => reject(new Error('Ошибка чтения файла.'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileLoadEnd = (reader, file, resolve, reject) => {
    const base64String = reader.result;
    const fileType = file.type;

    if (fileType.startsWith('video/')) {
      handleVideoFile(file, base64String, resolve, reject);
    } else {
      console.log(`Файл ${file.name} успешно конвертирован в base64. Длина: ${base64String.length} символов.`);
      resolve({ name: file.name, base64: base64String, type: fileType });
    }
  };

  const handleVideoFile = (file, base64String, resolve, reject) => {
    const videoURL = URL.createObjectURL(file);
    const videoElement = document.createElement('video');

    videoElement.src = videoURL;
    videoElement.onloadedmetadata = () => {
      const durationInMinutes = videoElement.duration / 60;
      if (durationInMinutes > 3) {
        setError(`Длительность видео не должна превышать 3 минут.`);
        reject(new Error(`Длительность видео превышает 3 минуты.`));
      } else {
        console.log(`Файл ${file.name} успешно конвертирован в base64. Длина: ${base64String.length} символов.`);
        resolve({ name: file.name, base64: base64String, type: file.type });
      }
    };

    videoElement.onerror = () => {
      reject(new Error('Ошибка загрузки видео.'));
    };
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileChange?.(updatedFiles);
  };

  const handleFileClick = (file) => {
    if (!file?.base64) {
      console.error("Base64 данные отсутствуют для этого файла.");
      return;
    }

    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      console.error("Не удалось открыть новое окно. Возможно, оно было заблокировано.");
      return;
    }

    const centeredStyles = `
      <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #000;
        }
        img, video {
          max-width: 100%;
          max-height: 100%;
        }
      </style>
    `;

    if (file.type.startsWith('image/')) {
      openImageInNewWindow(newWindow, file.base64, centeredStyles);
    } else if (file.type === 'video/mp4') {
      openVideoInNewWindow(newWindow, file.base64, centeredStyles);
    } else {
      console.error("Неподдерживаемый тип файла.");
    }
  };

  const openImageInNewWindow = (newWindow, base64, styles) => {
    const image = new Image();
    image.src = base64;
    image.onload = () => {
      newWindow.document.write(`
        ${styles}
        <img src="${base64}" alt="Image" />
      `);
      console.log(`Изображение открыто.`);
    };
  };

  const openVideoInNewWindow = (newWindow, base64, styles) => {
    newWindow.document.write(`
      ${styles}
      <video controls>
        <source src="${base64}" type="video/mp4">
        Ваш браузер не поддерживает тег видео.
      </video>
    `);
    console.log(`Видео открыто.`);
  };

  return (
    <div className={styles.chooseFileWrapper}>
      <button className={styles.chooseFile} onClick={handleButtonClick} type="button">
        <span>{title}</span>
        <img src={icons.copyIcon} alt="copyIcon" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        multiple={multiple}
        accept={acceptedFormats.join(',')}
      />
      {files.length > 0 && (
        <div className={styles.chosenFileWrapper}>
          {files.map((file, index) => (
            <div key={index} className={styles.fileBlock}>
              <span
                className={styles.fileName}
                onClick={() => handleFileClick(file)}
              >
                {file.name}
              </span>
              <button onClick={() => handleRemoveFile(index)} className={styles.removeButton} type="button">
                <img src={icons.closeIcon} alt="closeIcon" />
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FileInput;
