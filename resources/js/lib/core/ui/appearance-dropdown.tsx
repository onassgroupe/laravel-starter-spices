import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppearanceToggleDropdownProps {
    className?: string;
    iconClassName?: string;
    buttonClassName?: string;
}

export default function AppearanceToggleDropdown({
    className = '',
    iconClassName = '',
    buttonClassName = '',
}: AppearanceToggleDropdownProps) {
    const { appearance, updateAppearance } = useAppearance();

    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return <Moon className={cn('h-5 w-5', iconClassName)} />;
            case 'light':
                return <Sun className={cn('h-5 w-5', iconClassName)} />;
            default:
                return <Monitor className={cn('h-5 w-5', iconClassName)} />;
        }
    };

    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn('h-9 w-9 rounded-md', buttonClassName)}
                    >
                        {getCurrentIcon()}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateAppearance('light')}>
                        <span className="flex items-center gap-2">
                            <Sun className="h-5 w-5" />
                            Light
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppearance('dark')}>
                        <span className="flex items-center gap-2">
                            <Moon className="h-5 w-5" />
                            Dark
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => updateAppearance('system')}
                    >
                        <span className="flex items-center gap-2">
                            <Monitor className="h-5 w-5" />
                            System
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
