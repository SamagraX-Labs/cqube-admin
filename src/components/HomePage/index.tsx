import React, { useRef, useState } from 'react';
import styles from './index.module.css';
import fileUpload from '@/assets/images/fileUpload.svg';
import Image from 'next/image';
import { useStateContext } from '@/context';
import { useRouter } from 'next/router';
import papa from 'papaparse';
import Sidebar from '../Sidebar';
import { toast } from 'react-hot-toast';
import Loader from '../Loader';

const HomePage = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [secondUploadLabel, setSecondUploadLabel] = useState('');
  const router = useRouter();
  const { setTabledata, setErrordata, isLoading, setIsLoading } =
    useStateContext();

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log('file chosen:', file);
    if (secondUploadLabel.length === 0) {
      toast.success('File uploaded!');
      setCsvFile(file);
    } else {
      toast.success('File uploaded!');
      const secondFile = event.target.files[0];
      console.log('Second file chosen:', secondFile);

      const apiUrl = 'https://cqube-admin.onrender.com/admin/validate';
      const formData = new FormData();
      if (csvFile) formData.append('grammar', csvFile, csvFile.name);
      formData.append('data', secondFile);
      formData.append(
        'type',
        secondUploadLabel.toLowerCase().split(' ').join('-')
      );
      const requestOptions = {
        method: 'POST',
        body: formData,
      };
      setIsLoading(true);
      // Make API call for multi-file upload
      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('API response:', data);
          // Process the API response here
          setIsLoading(false);
          setErrordata(data.errors);
          router.push('/data');
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error('Please try again later.');
          console.error('Error while making API call:', error);
        });
    }
    setShowUploadButton(false);
  };

  const handleButtonClick = (label: string) => {
    console.log(`Button "${label}" clicked.`);
    if (label === 'Event data' || label === 'Dimension data') {
      setSecondUploadLabel(label);
      setShowUploadButton(true);
    } else {
      // Make API call to upload single file
      const apiUrl = 'https://cqube-admin.onrender.com/admin/validate';
      console.log(csvFile);

      //@ts-ignore
      papa.parse(csvFile, {
        complete: function (results, file) {
          setTabledata(results?.data);
        },
      });

      const formData = new FormData();
      if (csvFile) formData.append('grammar', csvFile, csvFile.name);
      formData.append('type', label.toLowerCase().split(' ').join('-'));
      const requestOptions = {
        method: 'POST',
        body: formData,
      };
      setIsLoading(true);
      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('API response:', data);
          // Process the API response here
          setIsLoading(false);
          setErrordata(data.errors);
          router.push('/data');
        })
        .catch((error) => {
          setIsLoading(false);
          console.error('Error while making API call:', error);
        });
    }
  };

  return (
    <div className={styles.main}>
      <div className="w-[18%] bg-[#10004f]">
        <Sidebar />
      </div>
      {!isLoading ? (
        <div className={styles.rightSide}>
          <div className={styles.navbar}></div>
          <div className={styles.rightBody}>
            <div className={styles.fileImage}>
              <Image src={fileUpload} alt="" layout="responsive" />
            </div>
            {showUploadButton ? (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <div className={styles.buttonContainer}>
                  {secondUploadLabel.length > 0 && (
                    <h1 className="font-bold">
                      Please upload {secondUploadLabel.split(' ')[0]} Grammar
                      file.
                    </h1>
                  )}
                  <div className={styles.btn} onClick={handleFileUpload}>
                    Upload CSV
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.buttonContainer}>
                  <h1 className="font-bold">Which file is it?</h1>
                  <button
                    className={styles.btn}
                    onClick={() => handleButtonClick('Event Grammar')}>
                    Event Grammar
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => handleButtonClick('Event data')}>
                    Event data
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => handleButtonClick('Dimension Grammar')}>
                    Dimension Grammar
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => handleButtonClick('Dimension data')}>
                    Dimension data
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.rightSide}>
          <Loader />

        </div>
      )}
    </div>
  );
};

export default HomePage;
