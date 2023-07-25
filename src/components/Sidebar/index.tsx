import React from 'react'
import styles from './index.module.css'
import Logo from '@/assets/images/logo.png';
import Image from 'next/image';

const Sidebar = () => {
  return (
    <div className={styles.leftSide}>
        <div className={styles.brandName}>
          <div className={styles.logo}>
            <Image src={Logo} alt="" layout="responsive" />
          </div>
          <h1 className='font-bold'>cQube Admin</h1>
        </div>
        <div className={styles.linebreak}></div>
      </div>
  )
}

export default Sidebar