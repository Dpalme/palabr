export function useToday() {
    return new Date().toISOString().slice(0, 10);
}