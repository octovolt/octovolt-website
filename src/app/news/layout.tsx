// news/layout.tsx

import React from 'react';
import BasicLayout from '../components/basicLayout';

export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <BasicLayout>{children}</BasicLayout>
  );
}
