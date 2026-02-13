const PIE_COLORS = [
    "#3b82f6", // blue
    "#22c55e", // green
    "#f97316", // orange
    "#a855f7", // purple
    "#ef4444", // red
    "#14b8a6", // teal
    "#eab308", // yellow
];

const BAR_COLOR = "#3b82f6";

import { Card, CardContent, CardHeader, CardTitle, SidebarLayout } from "@/components";
import { useProducts, useUsers, useProductCategories } from "./DashboardData";
import {
    Package,
    Users,
    AlertTriangle,
    IndianRupee,
    Star,
    Layers,
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import { StatCard } from "./StatCard";
import { recentProductsColumns } from "./RecentProductsColumns";
import { DataTable } from "@/CommonComponents";
import { Link } from "react-router-dom";



export default function Dashboard() {
    const { data, isLoading, isError } = useProducts();
    const { data: userData } = useUsers();
    const { data: categoriesData } = useProductCategories();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading dashboard</div>;

    const products = data?.products ?? [];


    const totalProducts = data?.total ?? 0;
    const totalUsers = userData?.total ?? 0;

    const lowStockItems = products.filter(p => p.stock < 10).length;

    const averagePrice =
        products.length > 0
            ? (
                products.reduce((sum, p) => sum + p.price, 0) / products.length
            ).toFixed(2)
            : "0";

    const averageRating =
        products.length > 0
            ? (
                products.reduce((sum, p) => sum + p.rating, 0) / products.length
            ).toFixed(1)
            : "0";

    const categoriesCount = categoriesData?.length ?? 0;


    const productsByCategory = Object.values(
        products.reduce((acc: Record<string, { name: string; value: number }>, product) => {
            acc[product.category] = acc[product.category] || {
                name: product.category,
                value: 0,
            };
            acc[product.category].value += 1;
            return acc;
        }, {})
    );

    // Price Range Distribution (Bar)
    const priceRanges = [
        { label: "₹0-500", min: 0, max: 500 },
        { label: "₹500-1000", min: 500, max: 1000 },
        { label: "₹1000-2000", min: 1000, max: 2000 },
        { label: "₹2000+", min: 2000, max: Infinity },
    ];

    const priceRangeData = priceRanges.map(range => ({
        name: range.label,
        count: products.filter(
            p => p.price >= range.min && p.price < range.max
        ).length,
    }));

    const topRatedProducts = [...products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10)
        .map(product => ({
            name: product.title,
            rating: product.rating,
        }));

    return (
        <SidebarLayout>
            <div className="p-4 space-y-8">

                {/* =======================
              STAT CARDS
          ======================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard title="Total Products" value={totalProducts} icon={<Package />} />
                    <StatCard title="Total Users" value={totalUsers} icon={<Users />} />
                    <StatCard title="Low Stock Items" value={lowStockItems} icon={<AlertTriangle />} />
                    <StatCard title="Average Price" value={`₹${averagePrice}`} icon={<IndianRupee />} />
                    <StatCard title="Average Rating" value={averageRating} icon={<Star />} />
                    <StatCard title="Categories" value={categoriesCount} icon={<Layers />} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Products by Category</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={productsByCategory}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={4}
                                    >
                                        {productsByCategory.map((_, index) => (
                                            <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Price Range Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Price Range Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={priceRangeData}>
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend />

                                    <Bar
                                        dataKey="count"
                                        name="Number of Products"
                                        fill={BAR_COLOR}
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Top 10 Rated Products</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={topRatedProducts}
                                layout="vertical"
                                margin={{ left: 120 }}
                            >
                                <XAxis type="number" domain={[0, 5]} />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={180}
                                />
                                <Tooltip />
                                <Legend />

                                <Bar
                                    dataKey="rating"
                                    name="Rating"
                                    fill="#facc15" // gold
                                    radius={[0, 4, 4, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Products</CardTitle>

                        <Link
                            to="/products"
                            className="text-sm text-primary hover:underline"
                        >
                            View All
                        </Link>
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={recentProductsColumns}
                            data={products.slice(0, 5)}
                        />
                    </CardContent>
                </Card>

            </div>
        </SidebarLayout>
    );
}