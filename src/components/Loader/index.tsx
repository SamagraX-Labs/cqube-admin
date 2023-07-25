import React from 'react';
import styles from './index.module.css';

function Loader() {
  return (
   <div className='flex items-center justify-center h-[100%] w-[100%]'>
     <div className={styles.newtonsCradle}>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
      <div className={styles.newtonsCradleDot}></div>
    </div>
   </div>
  );
}

export default Loader;
