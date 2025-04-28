    // Helper function to handle click events
    export type ClickHandler = (() => void) | ((arg: number) => void);

    export const withClickHandler = (handler: ClickHandler) => 
        (e: React.MouseEvent, arg?: number) => {
            e.stopPropagation();
            if (arg !== undefined) {
                (handler as (arg: number) => void)(arg);
            } else {
                (handler as () => void)();
            }
        };