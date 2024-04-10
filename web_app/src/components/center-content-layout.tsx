import React from 'react';

export default function CenterContentLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-grow">
      {/* Container for the possible left side content to be displayed */}
      <div className="w-0 md:w-1/5 2xl:w-1/3 "></div>
      {/* Container for the main content */}
      <div className="w-full md:w-3/5 2xl:w-1/3  bg-white rounded-lg p-4">
        {children}
      </div>
      {/* Container for the possible right side content to be displayed */}
      <div className="w-0 md:w-1/5 2xl:w-1/3 "></div>
    </div>
  );
}
