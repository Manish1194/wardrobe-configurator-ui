/**
 * Pricing Engine Utility Functions
 * Calculates wardrobe pricing based on dimensions, material, and color
 */

import { WardrobeDimensions, MaterialConfig } from '../types/wardrobe';
import { BASE_MATERIAL_OPTIONS, AESTHETIC_OPTIONS, HARDWARE_OPTIONS } from '../constants/wardrobe';

/**
 * Convert feet and inches to decimal feet
 */
export const convertToDecimalFeet = (feet: number, inches: number): number => {
  return feet + inches / 12;
};

/**
 * Convert decimal feet to feet and inches object
 */
export const convertFromDecimalFeet = (decimalFeet: number): { feet: number; inches: number } => {
  const feet = Math.floor(decimalFeet);
  const inches = Math.round((decimalFeet - feet) * 12);
  return { feet, inches: inches === 12 ? 0 : inches };
};

/**
 * Calculate square footage (footprint area)
 * Area = width × height (user said "Total area = Height * width")
 * Note: Usually wardrobe pricing is based on Frontal Area (Height * Width) for sliding doors/shutters calculation.
 */
export const calculateSquareFootage = (dimensions: WardrobeDimensions): number => {
  const widthFt = convertToDecimalFeet(dimensions.widthFeet, dimensions.widthInches);
  const heightFt = convertToDecimalFeet(dimensions.heightFeet, dimensions.heightInches);
  return widthFt * heightFt;
};

/**
 * Calculate Hardware Price based on Height
 */
export const calculateHardwarePrice = (hardwareBrand: string, heightFeet: number): number => {
  const hardwareOption = HARDWARE_OPTIONS.find(h => h.value === hardwareBrand);
  if (!hardwareOption) return 0;

  // Simple logic: Find the price tier that matches or exceeds the height
  // If height is less than smallest tier, use smallest tier.
  // If height is greater than largest tier, use largest tier (or maybe extrapolate, but for now max tier).
  
  const sortedPrices = [...hardwareOption.prices].sort((a, b) => a.heightFt - b.heightFt);
  
  // Find first tier where tier.heightFt >= heightFeet
  const tier = sortedPrices.find(p => p.heightFt >= heightFeet);
  
  if (tier) return tier.price;
  
  // If height is larger than all tiers, return the max tier price
  return sortedPrices[sortedPrices.length - 1].price;
};

/**
 * Calculate total price based on dimensions and material config
 * Formula: (Area * Base_Price) + (Area * Aesthetic_Price) + Hardware_Price
 */
export const calculatePrice = (
  dimensions: WardrobeDimensions,
  config: MaterialConfig
): number => {
  // Calculate square footage (Height * Width)
  const area = calculateSquareFootage(dimensions);
  const heightFt = convertToDecimalFeet(dimensions.heightFeet, dimensions.heightInches);

  // Get Base Material Price
  const baseMaterial = BASE_MATERIAL_OPTIONS.find(m => m.value === config.baseMaterial);
  const basePrice = baseMaterial ? baseMaterial.pricePerSqFt : 0;

  // Get Aesthetic Price
  const aesthetic = AESTHETIC_OPTIONS.find(a => a.value === config.aesthetic);
  const aestheticPrice = aesthetic ? aesthetic.pricePerSqFt : 0;

  // Get Hardware Price
  const hardwarePrice = calculateHardwarePrice(config.hardwareBrand, heightFt);

  // Total Calculation
  const totalBaseCost = area * basePrice;
  const totalAestheticCost = area * aestheticPrice;
  
  const totalPrice = totalBaseCost + totalAestheticCost + hardwarePrice;

  // Round to nearest integer
  return Math.round(totalPrice);
};

/**
 * Format price with currency symbol and thousands separator
 */
export const formatPrice = (price: number, currency: string = '₹'): string => {
  return `${currency}${price.toLocaleString('en-IN')}`;
};

