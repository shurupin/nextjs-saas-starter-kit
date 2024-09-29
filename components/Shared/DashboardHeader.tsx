import React from 'react';

type DashboardHeaderProps = {
  title: string;
  description: string;
};

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold leading-9 mb-2 text-gray-900">
        {title}
      </h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default DashboardHeader;
