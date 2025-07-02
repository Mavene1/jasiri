"use client";

import React, { useState } from 'react';
import {
    Users,
    FileText,
    Receipt,
    TrendingUp,
    TrendingDown,
    Plus,
    Trash2,
    PieChart
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';
import { ActivityData } from '../activities/ActivitiesList';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: React.ReactNode;
    iconBg: string;
}

// interface AccountBalance {
//     id: number;
//     bank: string;
//     holderName: string;
//     balance: string;
//     status: 'Active' | 'Paused' | 'Canceled';
// }

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    change,
    changeType,
    icon,
    iconBg
}) => (
    <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${iconBg}`}>
                {icon}
            </div>
        </div>
        <div className="flex items-center mt-4">
            {changeType === 'positive' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                }`}>
                {change}
            </span>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const cashflowData = [
        { day: 'Sat', income: 1200, expense: 800 },
        { day: 'Sun', income: 1400, expense: 600 },
        { day: 'Mon', income: 1100, expense: 900 },
        { day: 'Tue', income: 1600, expense: 700 },
        { day: 'Wed', income: 1256, expense: 235 },
        { day: 'Thu', income: 1350, expense: 850 },
        { day: 'Fri', income: 1500, expense: 650 },
    ];

    // const accountBalances: AccountBalance[] = [
    //     { id: 1, bank: 'Maybank', holderName: 'Cash', balance: 'RM521,611.20', status: 'Active' },
    //     { id: 2, bank: 'Ocbc Bank', holderName: 'Carissa', balance: 'RM160,156.00', status: 'Paused' },
    //     { id: 3, bank: 'RHB Bank', holderName: 'Renee', balance: 'RM52,229.00', status: 'Canceled' },
    //     { id: 4, bank: 'Public Bank', holderName: 'Preston', balance: 'RM82,786.00', status: 'Active' },
    //     { id: 5, bank: 'UOB Bank', holderName: 'Bowman', balance: 'RM105,150.00', status: 'Paused' },
    //     { id: 6, bank: 'Ambank', holderName: 'Wendy', balance: 'Rm5,484.40', status: 'Canceled' },
    // ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'APPROVED':
                return 'bg-blue-100 text-blue-800';
            case 'ONGOING':
                return 'bg-green-100 text-green-800';
            case 'COMPLETED':
                return 'bg-emerald-300 text-emerald-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const [activities] = useState<ActivityData[]>([
            {
                activityId: "395a2fbe-8576-45c0-b832-a1d9bbe7b75d",
                title: "Youth Counter Extremism Workshop",
                description: "Empowering youth to counter violent extremism through education and community engagement.",
                pillar: "AWARENESS",
                county: "Nairobi",
                createdBy: "ckipchumba",
                csoId: "123A",
                status: "PENDING",
                scheduledDate: "2025-07-15T10:00:00",
                targetOutreach: 100,
                location: "Eastleigh Youth Centre",
                createdAt: "2025-06-11T18:11:24.401964"
            },
            {
                activityId: "b4d7c8e9-1234-4567-8901-f2e3d4c5b6a7",
                title: "Community Peace Building",
                description: "Building sustainable peace through community engagement and dialogue.",
                pillar: "PREVENTION",
                county: "Mombasa",
                createdBy: "jdoe",
                csoId: "456B",
                status: "APPROVED",
                scheduledDate: "2025-08-20T14:00:00",
                targetOutreach: 45,
                location: "Mombasa Community Hall",
                createdAt: "2025-06-10T12:30:15.123456"
            },
            {
                activityId: "c5e8f9a0-2345-5678-9012-a3b4c5d6e7f8",
                title: "Women Protection Training",
                description: "Training program for women's safety and protection in the community.",
                pillar: "PROTECTION",
                county: "Kisumu",
                createdBy: "mwangi",
                csoId: "789C",
                status: "ONGOING",
                scheduledDate: "2025-06-25T09:00:00",
                targetOutreach: 70,
                location: "Kisumu Women's Center",
                createdAt: "2025-06-05T08:45:30.987654"
            },
            {
                activityId: "d6f9a0b1-3456-6789-0123-b4c5d6e7f8a9",
                title: "Emergency Response Drill",
                description: "Community emergency response and preparedness training program.",
                pillar: "RESPONSE",
                county: "Nakuru",
                createdBy: "akamau",
                csoId: "012D",
                status: "COMPLETED",
                targetOutreach: 25,
                scheduledDate: "2025-05-30T11:00:00",
                location: "Nakuru Sports Ground",
                createdAt: "2025-05-15T16:20:45.654321"
            }
        ]);
    

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <MetricCard
                    title="Total Activities"
                    value="212"
                    change="+9.5%"
                    changeType="positive"
                    icon={<Receipt className="w-6 h-6 text-white" />}
                    iconBg="bg-orange-500"
                />
                <MetricCard
                    title="Total Reports"
                    value="82"
                    change="-5.5%"
                    changeType="negative"
                    icon={<FileText className="w-6 h-6 text-white" />}
                    iconBg="bg-blue-500"
                />
                <MetricCard
                    title="Total Priority Areas"
                    value="5"
                    change="+20%"
                    changeType="positive"
                    icon={<PieChart className="w-6 h-6 text-white" />}
                    iconBg="bg-red-500"
                />
                <MetricCard
                    title="Total Users"
                    value="164"
                    change="-8.5%"
                    changeType="negative"
                    // icon={<Receipt className="w-6 h-6 text-white" />}
                    icon={<Users className="w-6 h-6 text-white" />}
                    iconBg="bg-green-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {/* Cashflow Chart */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Activities</h3>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">1D</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">7D</button>
                                <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded">1M</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">3M</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">All</button>
                            </div>
                        </div>

                        {/* Chart Area with Recharts */}
                        <div className="h-64 mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={cashflowData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    barCategoryGap="20%"
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                    />
                                    <Bar
                                        dataKey="income"
                                        stackId="a"
                                        fill="#8b5cf6"
                                        radius={[0, 0, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="expense"
                                        stackId="a"
                                        fill="#10b981"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex items-center justify-center space-x-6 text-sm">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-600 rounded mr-2"></div>
                                <span className="text-gray-600">Awareness</span>
                                <span className="font-semibold ml-1 text-gray-800">$1256</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
                                <span className="text-gray-600">Prevention</span>
                                <span className="font-semibold ml-1 text-gray-800">$235</span>
                            </div>
                        </div>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            Wednesday 25
                        </div>
                    </div>
                </div>

                {/* Income vs Expense */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Activities Vs Reports</h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Users className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Total Activities</p>
                                    <p className="font-semibold">RM0.00</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Reports Today</p>
                                <p className="font-semibold">RM23.00</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <TrendingUp className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Activities This Mo...</p>
                                    <p className="font-semibold">RM247.00</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Reports This...</p>
                                <p className="font-semibold">RM254.00</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Users className="w-5 h-5 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-600">Total Users</p>
                                    <p className="font-semibold">RM365.00</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Engagements This Mo...</p>
                                <p className="font-semibold">RM458.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Project Status */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Status</h3>

                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-32 h-32">
                            {/* Simplified donut chart representation */}
                            <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                            <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent transform rotate-45"></div>
                            <div className="absolute inset-0 rounded-full border-8 border-purple-500 border-r-transparent border-b-transparent"></div>
                            <div className="absolute inset-0 rounded-full border-8 border-orange-500 border-l-transparent border-b-transparent transform rotate-180"></div>
                            <div className="absolute inset-0 rounded-full border-8 border-red-500 border-r-transparent border-t-transparent transform rotate-270"></div>

                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <p className="text-2xl font-bold text-gray-900">9.1k</p>
                                <p className="text-sm text-gray-600">Activities</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">On Going</span>
                            </div>
                            <span className="font-semibold">25%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">On Hold</span>
                            </div>
                            <span className="font-semibold">32%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">Finished</span>
                            </div>
                            <span className="font-semibold">68%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">On Hold</span>
                            </div>
                            <span className="font-semibold">15%</span>
                        </div>
                    </div>
                </div>

                {/* Account Balance */}
                <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                        <button className="text-sm text-purple-600 hover:text-purple-700">See All</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">No</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Pillar</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">County</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">CSO ID</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Status</th>
                                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities.map((account) => (
                                    <tr key={account.activityId} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-2 text-sm text-gray-900">{'-'}</td>
                                        <td className="py-4 px-2 text-sm text-gray-900">{account.pillar}</td>
                                        <td className="py-4 px-2 text-sm text-gray-900">{account.county}</td>
                                        <td className="py-4 px-2 text-sm font-medium text-gray-900">{account.csoId}</td>
                                        <td className="py-4 px-2 text-sm font-medium text-gray-900">{account.scheduledDate}</td>
                                        <td className="py-4 px-2">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(account.status)}`}>
                                                {account.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex items-center space-x-2">
                                                <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Dashboard;