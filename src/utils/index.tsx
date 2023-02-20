// If the cart value is less than minCartValue, a small order surcharge is added to the delivery price.
// The surcharge is the difference between the cart value and minCartValue.
export const calculateCartValue = (cartVal: number, minCartValue: number): number => {
  if (cartVal < minCartValue) {
    const surcharge: number = minCartValue - cartVal;
    return Math.round((surcharge + Number.EPSILON) * 100) / 100;
  }

  return 0;
};

// Delivery fee is based on how many extra extraTravelDist courier has to travel
export const deliveryDistanceExtra = (
  delDist: number,
  extraTravelDist: number,
  extraTravelDistCost: number
): number => {
  return Math.ceil(delDist / extraTravelDist) * extraTravelDistCost;
};

// If the number of items is itemSurchargeCount or more, an additional itemSurchargeCost is added for each item
// above and including the itemSurchargeCount item.
export const calculateItemSurcharge = (
  itemCount: number,
  itemSurchargeCount: number,
  itemSurchargeCost: number
): number => {
  if (itemCount > itemSurchargeCount) {
    return (itemCount - itemSurchargeCount) * itemSurchargeCost;
  }

  return 0;
};

// An extra "bulk" fee applies for more than itemBulkFeeCount items of extraBulkFee
export const calculateBulkFee = (itemCount: number, itemBulkFeeCount: number, extraBulkFee: number): number => {
  if (itemCount > itemBulkFeeCount) {
    return extraBulkFee;
  }

  return 0;
};

// During the rush day and its rush hours the delivery fee (the total fee including possible surcharges)
// will be multiplied by rushHourExtra.
export const checkRushHours = (
  time: string,
  rushDay: number,
  minRushHour: number,
  maxRushHour: number,
  rushHourExtra: number
): number => {
  const d = new Date(time);

  if (d.getDay() === rushDay && d.getHours() >= minRushHour && d.getHours() <= maxRushHour) {
    if (d.getHours() === maxRushHour && d.getMinutes() > 0) {
      return 1;
    }

    return rushHourExtra;
  }

  return 1;
};

// Delivery fee is all the possible surcharges added together and multiplied with rush hour extra cost
export const realPrice = (
  cartValSurcharge: number,
  travDistCost: number,
  itemSurcharge: number,
  needBulkFee: number,
  needRushHourExtra: number
): number => {
  return (cartValSurcharge + travDistCost + itemSurcharge + needBulkFee) * needRushHourExtra;
};

// The delivery fee can never be more than maxDelFee, including possible surcharges.
export const setFinalPrice = (deliveryFee: number, maxDelFee: number): number => {
  if (deliveryFee > maxDelFee) {
    return maxDelFee;
  }

  return deliveryFee;
};

// The delivery is free (0€) when the cart value is equal or more than freeDelLimit.
export const checkFreeDelivery = (cartVal: number, freeDelLimit: number): boolean => {
  if (cartVal >= freeDelLimit) {
    return true;
  }

  return false;
};

// Calculate the delivery price
export const calculatePrice = (calcInfo: any, e: React.FormEvent) => {
  const freeDelLimit: number = 100;
  const minCartValue: number = 10;
  const extraTravelDist: number = 500;
  const extraTravelDistCost: number = 1;
  const itemSurchargeCount: number = 4;
  const itemSurchargeCost: number = 0.5;
  const itemBulkFeeCount: number = 12;
  const extraBulkFee: number = 1.2;
  const rushDay: number = 5;
  const minRushHour: number = 15;
  const maxRushHour: number = 19;
  const rushHourExtra: number = 1.2;
  const maxDelFee: number = 15;

  if (calcInfo.cartVal < 0 || calcInfo.delDist < 0 || calcInfo.itemCount < 0) {
    console.log("Error: Values can't be negative!");
    return;
  }

  const freeDeliveryCheck: boolean = checkFreeDelivery(calcInfo.cartVal, freeDelLimit);

  if (freeDeliveryCheck) {
    return '0';
  }

  const cartValSurcharge: number = calculateCartValue(calcInfo.cartVal, minCartValue);
  const travDistCost: number = deliveryDistanceExtra(calcInfo.delDist, extraTravelDist, extraTravelDistCost);
  const itemSurcharge: number = calculateItemSurcharge(calcInfo.itemCount, itemSurchargeCount, itemSurchargeCost);
  const needBulkFee: number = calculateBulkFee(calcInfo.itemCount, itemBulkFeeCount, extraBulkFee);
  const needRushHourExtra: number = checkRushHours(calcInfo.time, rushDay, minRushHour, maxRushHour, rushHourExtra);
  const deliveryFee: number = realPrice(cartValSurcharge, travDistCost, itemSurcharge, needBulkFee, needRushHourExtra);
  const finalPrice: number = setFinalPrice(deliveryFee, maxDelFee);

  return finalPrice.toFixed(2);
};
