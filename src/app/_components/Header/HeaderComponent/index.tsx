'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '../../../../payload/payload-types';
import { Gutter } from '../../Gutter';
import Link from 'next/link';
import { HeaderNav } from '../Nav';
import { noHeaderFooterUrls } from '../../../constants';
import { usePathname } from 'next/navigation';
import classes from './index.module.scss';

const HeaderComponent: React.FC<{ header: Header }> = ({ header }) => {
    const pathname = usePathname();
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const navbarHeight = document.querySelector('.header')?.offsetHeight || 0;
            if (window.pageYOffset > navbarHeight) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerClasses = [classes.header, isSticky && classes.sticky, noHeaderFooterUrls.includes(pathname) && classes.hide]
        .filter(Boolean)
        .join(' ');

    return (
        <nav className={headerClasses}>
            <Gutter className={classes.wrap}>
                <Link href="/">
                    <Image src="/logo-black.svg" alt="logo" width={170} height={50} />
                </Link>
                <HeaderNav header={header} />
                {/* <MobileNav header={header} /> */}
            </Gutter>
        </nav>
    );
};

export default HeaderComponent;
