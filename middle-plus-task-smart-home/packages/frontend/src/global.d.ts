declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        'on:outclick'?: (event: CustomEvent) => any;
    }
}