// header.tsx

import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/app/components//menu';

import styles from '@/app/components/header.module.css';
import utilStyles from '@/styles/utils.module.css';

export default function Header({ name, tagline }: { name: string, tagline: string }) {
  return (
      <header className={styles.header}>
        <div className={styles.innerHeader}>
          <Link href="/">
            <Image
              priority
              src="/images/octopus-arts-logo-400x400.png"
              sizes="(min-width: 1171px) 50px, (max-width: 1170px) 100px"
              className={utilStyles.borderCircle}
              fill={true}
              alt="OCTOVOLT logo"
            />
          </Link>
          <div className={styles.menuContainer}>
            <h2 className={utilStyles.headingMd}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
              <span className={styles.taglineContainer}>
                <span className={styles.titleDivider}>{"//"}</span>
                <span className={styles.tagline}>{tagline}</span>
              </span>
            </h2>
            <Menu />
          </div>
        </div>
      </header>
    );
}
