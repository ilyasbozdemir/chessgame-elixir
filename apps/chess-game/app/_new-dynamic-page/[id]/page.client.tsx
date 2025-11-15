"use client";

import React from "react";

interface PageClientProps {
  id: string;
}


const PageClient: React.FC<PageClientProps> = ({id}) => {
  return (
    <>
      <>{id}</>
    </>
  );
};

export default PageClient;
