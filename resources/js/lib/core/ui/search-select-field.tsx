import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Loader2, X } from 'lucide-react';

export interface SearchSelectFieldProps<T> {
    data?: T[];
    label?: string;
    valueKey: keyof T;
    labelKey: keyof T | ((item: T) => string);
    placeholder?: string;
    noResultsLabel?: string;
    multiple?: boolean;
    selected?: T[keyof T] | T[keyof T][] | null;
    onSelectionChange: (selected: T[keyof T] | T[keyof T][] | null) => void;
    error?: string;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

function SearchSelectField<T>({
    data = [],
    label,
    valueKey,
    labelKey,
    placeholder = 'Sélectionner...',
    noResultsLabel = 'Aucun résultat',
    multiple = false,
    selected,
    onSelectionChange,
    error,
    helperText,
    required,
    disabled,
    loading,
    className,
}: SearchSelectFieldProps<T>) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputId = React.useId();

    const getLabel = React.useCallback(
        (item: T): string => {
            return typeof labelKey === 'function' ? labelKey(item) : String(item[labelKey] || '');
        },
        [labelKey]
    );

    const filteredData = React.useMemo(() => {
        if (!search.trim()) return data;
        return data.filter((item) =>
            getLabel(item).toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search, getLabel]);

    const selectedItems = React.useMemo(() => {
        if (!selected) return [];
        if (multiple && Array.isArray(selected)) {
            return data.filter((item) =>
                (selected as T[keyof T][]).includes(item[valueKey])
            );
        }
        const found = data.find((item) => item[valueKey] === selected);
        return found ? [found] : [];
    }, [selected, data, valueKey, multiple]);

    const handleSelect = (item: T) => {
        const itemValue = item[valueKey];
        if (multiple) {
            const currentSelected = (Array.isArray(selected) ? selected : []) as T[keyof T][];
            const isSelected = currentSelected.includes(itemValue);
            const newSelected = isSelected
                ? currentSelected.filter((v) => v !== itemValue)
                : [...currentSelected, itemValue];
            onSelectionChange(newSelected);
        } else {
            onSelectionChange(itemValue);
            setOpen(false);
            setSearch('');
        }
    };

    const handleRemove = (item: T, e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple) {
            const currentSelected = (Array.isArray(selected) ? selected : []) as T[keyof T][];
            onSelectionChange(currentSelected.filter((v) => v !== item[valueKey]));
        } else {
            onSelectionChange(null);
        }
    };

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="space-y-2" ref={containerRef}>
            {label && (
                <Label htmlFor={inputId}>
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            )}
            <div className="relative">
                <button
                    id={inputId}
                    type="button"
                    onClick={() => !disabled && setOpen(!open)}
                    disabled={disabled}
                    className={cn(
                        'border-input focus-visible:border-ring focus-visible:ring-ring/50 flex min-h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-destructive',
                        className
                    )}
                    aria-invalid={!!error}
                >
                    <div className="flex flex-1 flex-wrap items-center gap-1.5 overflow-hidden">
                        {selectedItems.length === 0 ? (
                            <span className="text-muted-foreground">{placeholder}</span>
                        ) : (
                            selectedItems.map((item) => (
                                <span
                                    key={String(item[valueKey])}
                                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs"
                                >
                                    {getLabel(item)}
                                    <X
                                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                                        onClick={(e) => handleRemove(item, e)}
                                    />
                                </span>
                            ))
                        )}
                    </div>
                    <ChevronDown
                        className={cn(
                            'h-4 w-4 text-muted-foreground transition-transform',
                            open && 'rotate-180'
                        )}
                    />
                </button>

                {open && (
                    <div className="bg-popover text-popover-foreground absolute z-50 mt-1 w-full overflow-hidden rounded-md border shadow-md">
                        <div className="border-b p-2">
                            <Input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher..."
                                className="h-8"
                                autoFocus
                            />
                        </div>
                        <div className="max-h-[240px] overflow-y-auto p-1">
                            {loading ? (
                                <div className="flex items-center justify-center py-6">
                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                </div>
                            ) : filteredData.length === 0 ? (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    {noResultsLabel}
                                </div>
                            ) : (
                                filteredData.map((item) => {
                                    const isSelected = selectedItems.some(
                                        (s) => s[valueKey] === item[valueKey]
                                    );
                                    return (
                                        <button
                                            key={String(item[valueKey])}
                                            type="button"
                                            onClick={() => handleSelect(item)}
                                            className={cn(
                                                'flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
                                                'hover:bg-accent hover:text-accent-foreground',
                                                isSelected && 'bg-accent/50'
                                            )}
                                        >
                                            <span>{getLabel(item)}</span>
                                            {isSelected && <Check className="h-4 w-4" />}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
            {(error || helperText) && (
                <p className={cn('text-sm', error ? 'text-destructive' : 'text-muted-foreground')}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
}

export { SearchSelectField };
