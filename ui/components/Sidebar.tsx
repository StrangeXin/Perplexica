'use client';

import { cn } from '@/lib/utils';
import { BookOpenText, Home, Search, SquarePen, Settings, ArrowLeftToLine, ArrowRightFromLine, School } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { useState, type ReactNode } from 'react';
import Layout from './Layout';
import SettingsDialog from './SettingsDialog';
import Image from 'next/image';

const VerticalIconContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-y-3 w-full">{children}</div>
  );
};

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navLinks = [
    {
      icon: Home,
      href: '/',
      active: segments.length === 0 || segments.includes('c'),
      label: '首页',
    },
    {
      icon: Search,
      href: '/discover',
      active: segments.includes('discover'),
      label: '发现',
    },
    {
      icon: BookOpenText,
      href: '/library',
      active: segments.includes('library'),
      label: '历史',
    },
  ];

  return (
    <div>
      <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex ${isCollapsed ? 'lg:w-20' : 'lg:w-48'} transition-all duration-300 lg:flex-col`}>
        <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto bg-light-secondary dark:bg-dark-secondary px-2 py-8">
          <div>
            <a href="/" className='flex items-center'>
              {/* <School className="cursor-pointer"/> */}
              <Image
                src="/logo.png"
                alt="Log.AI"
                width={60}
                height={60}
              />
              {!isCollapsed && <p className="text-2xl pl-4 font-bold">Log.AI</p>}
            </a>
            <a href="/" className='flex pt-8 justify-center'>
              <SquarePen className="cursor-pointer" />
              {!isCollapsed && <p className="text-2xs pl-4">新建帖子</p>}
            </a>
          </div>
          <VerticalIconContainer>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={cn(
                  'relative flex flex-row items-center justify-center cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 duration-150 transition w-full py-2 rounded-lg',
                  link.active
                    ? 'text-black dark:text-white'
                    : 'text-black/70 dark:text-white/70',
                )}
              >
                <link.icon />
                {!isCollapsed && <p className="text-2xs pl-4">{link.label}</p>}
                {link.active && (
                  <div className="absolute right-0 -mr-2 h-full w-1 rounded-l-lg bg-black dark:bg-white" />
                )}
              </Link>
            ))}
          </VerticalIconContainer>

          <div>
            <button
              onClick={toggleSidebar}
              className="pb-8 flex"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ArrowRightFromLine />
              ) : (
                <ArrowLeftToLine />
              )}
              {!isCollapsed && <p className="text-2xs pl-4">收起</p>}
            </button>
            
            <div className='cursor-pointer flex' onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
              <Settings />
              {!isCollapsed && <p className="text-2xs pl-4">设置</p>}
            </div>

            <SettingsDialog
              isOpen={isSettingsOpen}
              setIsOpen={setIsSettingsOpen}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full z-50 flex flex-row items-center gap-x-6 bg-light-primary dark:bg-dark-primary px-4 py-4 shadow-sm lg:hidden">
        {navLinks.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className={cn(
              'relative flex flex-col items-center space-y-1 text-center w-full',
              link.active
                ? 'text-black dark:text-white'
                : 'text-black dark:text-white/70',
            )}
          >
            {link.active && (
              <div className="absolute top-0 -mt-4 h-1 w-full rounded-b-lg bg-black dark:bg-white" />
            )}
            <link.icon />
            <p className="text-xs">{link.label}</p>
          </Link>
        ))}
      </div>

      <Layout isCollapsed={isCollapsed}>{children}</Layout>
    </div>
  );
};

export default Sidebar;
