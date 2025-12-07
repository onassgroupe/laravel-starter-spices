import { useForm } from '@inertiajs/react';
import { ExampleFormData } from '../types/example.types';

export function useExampleForm(initialData?: Partial<ExampleFormData>) {
    const form = useForm<ExampleFormData>({
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
        status: initialData?.status ?? 'active',
    });

    const submit = (e: React.FormEvent, routeName: string) => {
        e.preventDefault();
        form.post(routeName);
    };

    return {
        data: form.data,
        setData: form.setData,
        errors: form.errors,
        processing: form.processing,
        submit,
        reset: form.reset,
    };
}
