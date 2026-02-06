import { useGetTodos } from "@/services";

export default function ReactQueryExample() {
  const { data: todos, isLoading, isError, error } = useGetTodos();

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-card border rounded-lg p-6 shadow-sm text-center">
          <p className="text-muted-foreground">Loading todos...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="bg-card border rounded-lg p-6 shadow-sm text-center">
          <p className="text-destructive">
            Error loading todos:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Todo List (JSONPlaceholder)
        </h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="flex items-start gap-3 p-3 border rounded-md bg-background hover:bg-muted/50 transition-colors"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    todo.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {todo.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  User ID: {todo.userId} | Todo ID: {todo.id}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Total todos: {todos?.length || 0}
        </p>
      </div>
    </div>
  );
}
