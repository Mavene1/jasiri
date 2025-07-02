// components/dashboard/activities/ReportDetails.tsx
'use client'

import { useRouter } from 'next/navigation'

import React, { useState } from 'react';
import {
    Download,
    ArrowLeft,
    FileText,
} from 'lucide-react';
import { ActivityData, ActivityReport } from './ActivitiesList';

interface ReportDetailsProps {
    activityId: string
    reportId: string
}

export default function ReportDetails({ activityId, reportId }: ReportDetailsProps) {
    const router = useRouter()

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
            scheduledDate: "2025-05-30T11:00:00",
            targetOutreach: 25,
            location: "Nakuru Sports Ground",
            createdAt: "2025-05-15T16:20:45.654321"
        }
    ]);

    // Sample reports data
    const [reports] = useState<ActivityReport[]>([
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

    const getReportById = (id: string) => {
        return reports.find(report => report.reportId === id);
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.includes('pdf')) return <FileText className="w-6 h-6 text-red-500" />;
        if (mimeType.includes('image')) return <FileText className="w-6 h-6 text-blue-500" />;
        if (mimeType.includes('zip')) return <FileText className="w-6 h-6 text-yellow-500" />;
        return <FileText className="w-6 h-6 text-gray-500" />;
    };

    const report = getReportById(reportId);
    const activity = getActivityById(activityId);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 mr-4"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Reports
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
                    <p className="text-gray-600">{activity?.title}</p>
                </div>
            </div>

            {report && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            {getFileIcon(report.mimeType)}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{report.fileName}</h3>
                                <p className="text-gray-600 mt-1">{report.description}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                    <span>Uploaded: {new Date(report.uploadedAt).toLocaleDateString()}</span>
                                    <span>Type: {report.mimeType}</span>
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center space-x-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}