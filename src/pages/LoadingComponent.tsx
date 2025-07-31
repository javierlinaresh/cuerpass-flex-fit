import React from 'react';

export const LoadingComponent = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      <p className="mt-4 text-lg">Cargando...</p>
    </div>
  </div>
);