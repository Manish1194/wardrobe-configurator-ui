/**
 * Wardrobe 3D Mesh Component
 * Renders the 3D wardrobe model with dynamic dimensions and materials
 */

import React, { useMemo } from 'react';
import { Mesh } from 'three';
import { AESTHETIC_OPTIONS, COLOR_VARIANTS } from '../../constants/wardrobe';
import { WardrobeDimensions, MaterialConfig } from '../../types/wardrobe';
import { convertToDecimalFeet } from '../../utils/pricingEngine';

interface Wardrobe3DProps {
  dimensions: WardrobeDimensions;
  config: MaterialConfig;
}

/**
 * Wardrobe3D Component
 * Renders a 3D rectangular mesh representing the wardrobe
 * Updates in real-time when dimensions, material, or color changes
 */
export const Wardrobe3D = React.forwardRef<Mesh, Wardrobe3DProps>(
  ({ dimensions, config }, ref) => {
    // Memoize material and color lookup
    // Use Aesthetic for the visible surface finish
    const aestheticData = useMemo(
      () => AESTHETIC_OPTIONS.find((m) => m.value === config.aesthetic),
      [config.aesthetic]
    );

    const colorData = useMemo(
      () => COLOR_VARIANTS.find((c) => c.value === config.aestheticColor),
      [config.aestheticColor]
    );

    // Convert feet and inches to decimal feet
    const width = useMemo(
      () => convertToDecimalFeet(dimensions.widthFeet, dimensions.widthInches),
      [dimensions.widthFeet, dimensions.widthInches]
    );

    const height = useMemo(
      () => convertToDecimalFeet(dimensions.heightFeet, dimensions.heightInches),
      [dimensions.heightFeet, dimensions.heightInches]
    );

    const depth = useMemo(
      () => convertToDecimalFeet(dimensions.depthFeet, dimensions.depthInches),
      [dimensions.depthFeet, dimensions.depthInches]
    );

    // Default fallbacks if data not found (shouldn't happen with correct defaults)
    const colorHex = colorData?.hex || '#ffffff';
    const roughness = aestheticData?.roughness ?? 0.5;
    const metalness = aestheticData?.metalness ?? 0;

    return (
      <mesh ref={ref} position={[0, height / 2, 0]} castShadow receiveShadow>
        {/* Box geometry centered at origin, so we move it up by height/2 */}
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={colorHex}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>
    );
  }
);

Wardrobe3D.displayName = 'Wardrobe3D';
