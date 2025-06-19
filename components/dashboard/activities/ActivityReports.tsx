// components/dashboard/activities/ActivityDetails.tsx
'use client'

import React, { useState } from 'react';
import {
    X,
    FileText,
    Download,
    ArrowLeft,
    Upload
} from 'lucide-react';
import { useRouter } from 'next/navigation'
import { ActivityData, ActivityReport } from './ActivitiesList';

interface ActivityDetailsProps {
    activityId: string
}

export default function ActivityDetails({ activityId }: ActivityDetailsProps) {
    const router = useRouter();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
            scheduledDate: "2025-05-30T11:00:00",
            location: "Nakuru Sports Ground",
            createdAt: "2025-05-15T16:20:45.654321"
        }
    ]);
    
    // Sample reports data
    const [reports, setReports] = useState<ActivityReport[]>([
        {
            reportId: "report-001",
            activityId: "395a2fbe-8576-45c0-b832-a1d9bbe7b75d",
            filePath: "/uploads/reports/youth-workshop-report-1.pdf",
            fileName: "Youth Workshop Attendance Report.pdf",
            mimeType: "application/pdf",
            description: "Attendance and participation report for the youth counter extremism workshop",
            uploadedAt: "2025-06-15T14:30:00"
        },
        {
            reportId: "report-002",
            activityId: "395a2fbe-8576-45c0-b832-a1d9bbe7b75d",
            filePath: "/uploads/reports/youth-workshop-feedback.pdf",
            fileName: "Participant Feedback Summary.pdf",
            mimeType: "application/pdf",
            description: "Summary of participant feedback and evaluation forms",
            uploadedAt: "2025-06-16T09:15:00"
        },
        {
            reportId: "report-003",
            activityId: "395a2fbe-8576-45c0-b832-a1d9bbe7b75d",
            filePath: "/uploads/reports/workshop-photos.zip",
            fileName: "Workshop Photos.zip",
            mimeType: "application/zip",
            description: "Photo documentation of the workshop activities",
            uploadedAt: "2025-06-16T16:45:00"
        },
        {
            reportId: "report-004",
            activityId: "b4d7c8e9-1234-4567-8901-f2e3d4c5b6a7",
            filePath: "/uploads/reports/peace-building-assessment.pdf",
            fileName: "Community Assessment Report.pdf",
            mimeType: "application/pdf",
            description: "Pre-activity community assessment and needs analysis",
            uploadedAt: "2025-06-12T11:20:00"
        },
        {
            reportId: "report-005",
            activityId: "c5e8f9a0-2345-5678-9012-a3b4c5d6e7f8",
            filePath: "/uploads/reports/women-protection-training.pdf",
            fileName: "Training Module Documentation.pdf",
            mimeType: "application/pdf",
            description: "Complete training module and materials used in the women protection program",
            uploadedAt: "2025-06-20T08:30:00"
        }
    ]);

    const getActivityById = (id: string) => {
        return activities.find(activity => activity.activityId === id);
    };

    const getReportsByActivityId = (activityId: string) => {
        return reports.filter(report => report.activityId === activityId);
    };

    const activity = getActivityById(activityId);
    const activityReports = getReportsByActivityId(activityId);

    const getFileIcon = (mimeType: string) => {
        if (mimeType.includes('pdf')) return <FileText className="w-6 h-6 text-red-500" />;
        if (mimeType.includes('image')) return <FileText className="w-6 h-6 text-blue-500" />;
        if (mimeType.includes('zip')) return <FileText className="w-6 h-6 text-yellow-500" />;
        return <FileText className="w-6 h-6 text-gray-500" />;
    };

    const handleViewReportDetail = (reportId: string) => {
        router.push(`/dashboard/activities/${activityId}/reports/${reportId}`)
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 mr-4"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Activities
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Activity Reports</h1>
                        <p className="text-gray-600">{activity?.title}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload Report</span>
                </button>
            </div>

            {/* Activity Details Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500">County</label>
                        <p className="text-gray-900">{activity?.county}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Scheduled Date</label>
                        <p className="text-gray-900">
                            {activity?.scheduledDate && new Date(activity.scheduledDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <p className="text-gray-900">{activity?.status}</p>
                    </div>
                </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activityReports.map((report) => (
                    <div
                        key={report.reportId}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleViewReportDetail(report.reportId)}
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            {getFileIcon(report.mimeType)}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 truncate">{report.fileName}</h3>
                                <p className="text-sm text-gray-500">{report.mimeType}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{report.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Uploaded: {new Date(report.uploadedAt).toLocaleDateString()}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle download
                                }}
                                className="text-blue-600 cursor-pointer hover:text-blue-800"
                            >
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {activityReports.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</h3>
                    <p className="text-gray-600">Upload the first report for this activity.</p>
                </div>
            )}

            {isUploadModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Upload Activity Report</h2>
                            <button
                                onClick={() => setIsUploadModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const fileInput = form.elements.namedItem('file') as HTMLInputElement;
                                const description = (form.elements.namedItem('description') as HTMLInputElement).value;

                                if (!fileInput?.files?.[0]) return;

                                const newReport = {
                                    reportId: crypto.randomUUID(),
                                    activityId,
                                    filePath: `/uploads/${fileInput.files[0].name}`,
                                    fileName: fileInput.files[0].name,
                                    mimeType: fileInput.files[0].type,
                                    description,
                                    uploadedAt: new Date().toISOString(),
                                };

                                setReports((prev) => [newReport, ...prev]);
                                setIsUploadModalOpen(false);
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Report Description</label>
                                <textarea
                                    name="description"
                                    required
                                    className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-purple-500"
                                    rows={3}
                                    placeholder="Enter report description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
                                <input
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    required
                                    className="w-full border border-gray-300 rounded p-2"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>

    );
}