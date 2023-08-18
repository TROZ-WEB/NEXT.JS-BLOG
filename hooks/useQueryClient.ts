//https://www.youtube.com/watch?v=zwQs4wXr9Bg&t=531s
const useQueryClient = () => {
  function makeQueryClient() {
    const fetchMap = new Map<string, Promise<any>>();
    return function queryClient<QueryResult>(
      name: string,
      query: () => Promise<QueryResult>
    ): Promise<QueryResult> {
      if (!fetchMap.has(name)) {
        fetchMap.set(name, query());
      }
      return fetchMap.get(name)!;
    };
  }
  const queryClient = makeQueryClient();
  return queryClient;
};

export default useQueryClient;
