declare module Express{
    interface Request{
        user: string | Record<string,any>
    }
}