import React from 'react';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Stack, Card, CardContent, alpha } from '@mui/material';
import { useWardrobe } from '../../hooks/useWardrobe';
import { DimensionsCard } from './DimensionsCard';
import { PRODUCT_OPTIONS, THEME_COLORS } from '../../constants/wardrobe';
import { ProductType } from '../../types/wardrobe';

export const Step1_Dimensions: React.FC = () => {
  const { state, setProductType, setStep } = useWardrobe();

  const cardStyle = {
    mb: 1,
    backgroundColor: alpha(THEME_COLORS.primary, 0.05),
    border: `1px solid ${alpha(THEME_COLORS.primary, 0.2)}`,
    borderRadius: 2,
    boxShadow: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <Stack spacing={2} sx={{ p: 1 }}>
      {/* Product Selection */}
      <Card sx={cardStyle}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: THEME_COLORS.primary, mb: 1.5 }}>
            1. Select Product
          </Typography>
          <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
            <InputLabel>Product Type</InputLabel>
            <Select
              value={state.productType}
              label="Product Type"
              onChange={(e) => setProductType(e.target.value as ProductType)}
            >
              {PRODUCT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Dimensions - DimensionsCard already has its own card styling */}
      <Box>
        <DimensionsCard />
      </Box>

      {/* Uploads (Disabled) */}
      <Card sx={{ ...cardStyle, opacity: 0.7 }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
            Upload Design (Optional)
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" disabled fullWidth size="small">
              Upload Photo
            </Button>
            <Button variant="outlined" disabled fullWidth size="small">
              Upload AutoCAD
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Services (Disabled) */}
      <Card sx={{ ...cardStyle, opacity: 0.7 }}>
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
            Services
          </Typography>
          <Stack spacing={1}>
            <Button variant="outlined" disabled fullWidth size="small">
              Book Tech Support (Video)
            </Button>
            <Button variant="outlined" disabled fullWidth size="small">
              Book Home Visit (First 3 Free)
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Next Button */}
      <Box sx={{ mt: 'auto', pt: 2, pb: 2 }}>
        <Button 
          variant="contained" 
          fullWidth 
          onClick={() => setStep(2)}
          sx={{ 
            bgcolor: THEME_COLORS.primary,
            py: 1.2,
            fontWeight: 600,
            '&:hover': { bgcolor: THEME_COLORS.primaryDark }
          }}
        >
          Next: Structure
        </Button>
      </Box>
    </Stack>
  );
};
