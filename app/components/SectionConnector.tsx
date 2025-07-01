import React from 'react';

interface SectionConnectorProps {
  connectorColor?: 'gdscred' | 'gdscblue' | 'gdscgreen' | 'gdscyellow';
}

const SectionConnector: React.FC<SectionConnectorProps> = ({ 
  connectorColor = 'gdscblue' 
}) => {
  const colorClasses: Record<string, string> = {
    gdscred: 'bg-gdscred',
    gdscblue: 'bg-gdscblue',
    gdscgreen: 'bg-gdscgreen',
    gdscyellow: 'bg-gdscyellow'
  };

  const gradientClasses: Record<string, string> = {
    gdscred: 'from-gdscred to-gdscblue',
    gdscblue: 'from-gdscblue to-gdscgreen',
    gdscgreen: 'from-gdscgreen to-gdscyellow',
    gdscyellow: 'from-gdscyellow to-gdscred'
  };

  return (
    <div className="flex flex-col items-center py-8 sm:py-12 md:py-16">
      {/* Circle */}
      <div className={`w-4 h-4 ${colorClasses[connectorColor]} rounded-full border-2 border-white shadow-lg`}></div>
      {/* Vertical line */}
      <div className={`w-0.5 bg-gradient-to-b ${gradientClasses[connectorColor]} h-8 sm:h-12 md:h-16 mt-1`}></div>
    </div>
  );
};

export default SectionConnector;