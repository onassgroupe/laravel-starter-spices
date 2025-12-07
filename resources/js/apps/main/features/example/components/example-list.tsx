import { Example } from '../types/example.types';

interface ExampleListProps {
    items: Example[];
    onEdit?: (item: Example) => void;
    onDelete?: (item: Example) => void;
}

export function ExampleList({ items, onEdit, onDelete }: ExampleListProps) {
    if (items.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No items found
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                        <h3 className="font-medium">{item.name}</h3>
                        {item.description && (
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {onEdit && (
                            <button onClick={() => onEdit(item)} className="text-sm text-blue-500">
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button onClick={() => onDelete(item)} className="text-sm text-red-500">
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
