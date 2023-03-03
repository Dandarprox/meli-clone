import { mergeRefs } from "@/util/merge-refs";
import { Component, forwardRef, useRef, HTMLAttributes } from "react";
import s from "./Header.module.scss";
import Image from 'next/image'
import cn from 'clsx';
import Link from 'next/link';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> { }

const Header: React.FC<HeaderProps> = forwardRef((props, headerRef) => {
    const {
        children,
        className,
    } = props;
    const ref = useRef<typeof Component>(null);
    const rootClassName = cn(s.root, className);

    return (
        <div 
            className={rootClassName}
            ref={mergeRefs([ref, headerRef])} >
            <div className={s.container}>
                <Link 
                    href='/'>
                    <Image 
                        alt="Logo"
                        src={'/assets/logo.png'}
                        width={134}
                        height={34}
                    />
                </Link>
                {children}
            </div>
        </div>
    )
})

Header.displayName = "Header";

export default Header;
