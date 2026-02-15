import React from 'react';
import { Box } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';

export const ExternalPreview: React.FC = () => {
  const { state } = useWardrobe();
  const design = state.materialConfig.exteriorDesign ?? 'pu_panel';
  const colors = state.materialConfig.exteriorColors ?? { c1: '#cccccc', c2: '#999999', c3: '#666666' };

  const imageUrl =
    design === 'pu_panel'
      ? 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=60'
      : design === 'wood_glass'
      ? 'https://images.unsplash.com/photo-1616594039964-ae9021a98567?auto=format&fit=crop&w=1200&q=60'
      : 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=60';

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundImage: `
          linear-gradient(90deg, ${colors.c1}88, ${colors.c2}88),
          url('${imageUrl}')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(0deg, ${colors.c3}44, transparent)`,
        }}
      />
    </Box>
  );
};

