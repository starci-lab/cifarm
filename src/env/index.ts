export const envConfig = () => ({
    restApiUrl: process.env.NEXT_PUBLIC_REST_API_URL || "http://localhost:3001/api",
    graphqlUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3006/graphql",
    ioUrl: process.env.NEXT_PUBLIC_IO_URL || "ws://localhost:3003",
})