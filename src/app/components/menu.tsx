// menu.tsx

'use client'

import React from 'react';

import CartBadge from './cartBadge';
import CartNumber from './cartNumber';
import Link from 'next/link';

import styles from './header.module.css';

export default function Menu() {
  return (
    <>
      <ul className={styles.menu}>
        <li className={styles.menuItem}><Link href={"/"}>Home</Link></li>
        <li className={styles.menuItem}><Link href={"/about"}>About</Link></li>
        <li className={styles.menuItem}><Link href={"/news"}>News</Link></li>
        <li className={styles.menuItem}><Link href={"/contact"}>Contact</Link></li>
        <li className={styles.menuItem}><Link href={"/cart"}>Cart<CartNumber /></Link></li>
      </ul>
      <div
        className={styles.hamburger}
        onPointerDown={toggleMenu}>
        <svg viewBox="0 0 100 80" width="40" height="40">
            <rect y="0"  width="100" height="12" rx="8"></rect>
            <rect y="30" width="100" height="12" rx="8"></rect>
            <rect y="60" width="100" height="12" rx="8"></rect>
        </svg>
        <CartBadge />
      </div>
    </>
  );
}

const toggleMenu = (e: React.PointerEvent<HTMLElement>) => {
  const hamburger = (e.currentTarget.tagName == 'svg'
    ? e.currentTarget
    : e.currentTarget.firstElementChild) as HTMLElement;
  if (hamburger !== null && hamburger.tagName == 'svg') {
    if (hamburger.classList.contains(styles.pressed)) {
      dismissMenuWithHamburger(hamburger);
    } else {
      openMenuWithHamburger(hamburger);
    }
  }
  e.stopPropagation();
}

const openMenuWithHamburger = (hamburger: HTMLElement) => {
  hamburger.classList.add(styles.pressed);
  const menu = document.querySelector(`.${styles.menu}`);
  menu?.classList.add(styles.menuDropDown);
}

const dismissMenuWithHamburger = (hamburger: HTMLElement) => {
  hamburger.classList.remove(styles.pressed);
  const menu = document.querySelector(`.${styles.menu}`);
  menu?.classList.remove(styles.menuDropDown);
}

export const dismissMenu = (e: React.PointerEvent<HTMLElement>) => {
  e.stopPropagation();

  const target = e.target as HTMLElement;
  if (target.tagName.toLowerCase() === 'a') {
    // Invoke the click event on the anchor tag to ensure navigation.
    // Otherwise, the click event on the anchor tag will not be invoked due to removing the
    // .menuDropDown CSS class from the .menu element and thus reapplying display:none.
    target.click();
  }

  const hamburger = document.querySelector(`.${styles.hamburger}`)?.firstElementChild as HTMLElement;
  if (hamburger !== null && hamburger.classList.contains(styles.pressed)) {
    hamburger.classList.remove(styles.pressed);
    const menu = document.querySelector(`.${styles.menu}`);
    menu?.classList.remove(styles.menuDropDown);
  }
}