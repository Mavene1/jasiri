// app/dashboard/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
      const token = (await cookies()).get('token')?.value;

      if (!token) {
        redirect('/get-involved');
      }

      return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header user={"Mavene"} />
                <main className="flex-1 overflow-auto p-0.5 pb-12">{children}</main>
            </div>
        </div>
    )
}
