export function formatCurrency(
    amount: number,
    currencyCode: string = "IND"
): string {
    try {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currencyCode.toUpperCase(),
        }).format(amount)
    } catch (error) {
        console.error("Invaild currency code :", currencyCode, error)
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`
    }
}