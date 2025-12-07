export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat('fr-FR', options).format(value);
}

export function formatCurrency(value: number, currency = 'XOF'): string {
    return formatNumber(value, { style: 'currency', currency });
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('fr-FR', options).format(new Date(date));
}

export function formatPhone(phone: string): string {
    return phone.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}
