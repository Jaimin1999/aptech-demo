import { type ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import type { Product } from "./DashboardData";

export const recentProductsColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "thumbnail",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.original.thumbnail}
        alt={row.original.title}
        className="h-10 w-10 rounded-md object-cover"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="capitalize text-muted-foreground">
        {row.original.category}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `₹${row.original.price}`,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <span
        className={
          row.original.stock < 10
            ? "text-destructive font-medium"
            : "text-foreground"
        }
      >
        {row.original.stock}
      </span>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        {row.original.rating}
      </div>
    ),
  },
];
