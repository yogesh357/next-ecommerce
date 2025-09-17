export const COUPON_CODES = {
    BAPPA: "BAPPA",
    BFRIDAY: "BFRIDAY",
    BCJI: "DBCJI"
} as const;

export type CouponCode = keyof typeof COUPON_CODES;