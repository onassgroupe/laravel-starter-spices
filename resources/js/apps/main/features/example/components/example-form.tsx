import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useExampleForm } from '../hooks/use-example-form.hooks';
import { Example } from '../types/example.types';

interface ExampleFormProps {
    example?: Example;
    onSubmit: (data: any) => void;
}

export function ExampleForm({ example, onSubmit }: ExampleFormProps) {
    const { data, setData, errors, processing, submit } = useExampleForm(example);

    return (
        <form onSubmit={(e) => submit(e, example ? `/examples/${example.id}` : '/examples')} className="space-y-4">
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <Button type="submit" disabled={processing}>
                {example ? 'Update' : 'Create'}
            </Button>
        </form>
    );
}
