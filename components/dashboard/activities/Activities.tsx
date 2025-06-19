// 'use client'

// import React, { useState, useMemo } from 'react';
// import {
//     Plus,
//     X,
//     Search,
//     ChevronLeft,
//     ChevronRight,
//     Edit,
//     Trash2,
//     Eye,
//     Calendar,
//     User,
//     Activity,
//     MapPin,
//     Building,
//     FileText,
//     Download,
//     ArrowLeft,
//     Upload
// } from 'lucide-react';
// import {
//     useReactTable,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     flexRender,
//     createColumnHelper,
//     ColumnDef,
// } from '@tanstack/react-table';
// import { useForm, SubmitHandler } from 'react-hook-form';

// interface ActivityData {
//     activityId: string;
//     title: string;
//     description: string;
//     pillar: 'AWARENESS' | 'PREVENTION' | 'PROTECTION' | 'RESPONSE';
//     county: string;
//     createdBy: string;
//     csoId: string;
//     status: 'PENDING' | 'APPROVED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
//     scheduledDate: string;
//     location: string;
//     createdAt: string;
// }

// interface ActivityReport {
//     reportId: string;
//     activityId: string;
//     filePath: string;
//     fileName: string;
//     mimeType: string;
//     description: string;
//     uploadedAt: string;
// }

// interface CreateActivityForm {
//     title: string;
//     description: string;
//     pillar: 'AWARENESS' | 'PREVENTION' | 'PROTECTION' | 'RESPONSE';
//     county: string;
//     csoId: string;
//     scheduledDate: string;
//     location: string;
// }

// type ViewMode = 'activities' | 'reports' | 'report-detail';

// const Activities: React.FC = () => {
//     const [viewMode, setViewMode] = useState<ViewMode>('activities');
//     const [selectedActivityId, setSelectedActivityId] = useState<string>('');
//     const [selectedReportId, setSelectedReportId] = useState<string>('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//     const [editingActivity, setEditingActivity] = useState<ActivityData | null>(null);
//     const [deletingActivityId, setDeletingActivityId] = useState<string>('');
//     const [globalFilter, setGlobalFilter] = useState('');

//     // React Hook Form setup
//     const {
//         register,
//         handleSubmit,
//         reset,
//         setValue,
//         formState: { errors, isSubmitting }
//     } = useForm<CreateActivityForm>();

//     // Sample activities data
//     const [activities, setActivities] = useState<ActivityData[]>([
//         {
//             activityId: "395a2fbe-8576-45c0-b832-a1d9bbe7b75d",
//             title: "Youth Counter Extremism Workshop",
//             description: "Empowering youth to counter violent extremism through education and community engagement.",
//             pillar: "AWARENESS",
//             county: "Nairobi",
//             createdBy: "ckipchumba",
//             csoId: "123A",
//             status: "PENDING",
//             scheduledDate: "2025-07-15T10:00:00",
//             location: "Eastleigh Youth Centre",
//             createdAt: "2025-06-11T18:11:24.401964"
//         },
//         {
//             activityId: "b4d7c8e9-1234-4567-8901-f2e3d4c5b6a7",
//             title: "Community Peace Building",
//             description: "Building sustainable peace through community engagement and dialogue.",
//             pillar: "PREVENTION",
//             county: "Mombasa",
//             createdBy: "jdoe",
//             csoId: "456B",
//             status: "APPROVED",
//             scheduledDate: "2025-08-20T14:00:00",
//             location: "Mombasa Community Hall",
//             createdAt: "2025-06-10T12:30:15.123456"
//         },
//         {
//             activityId: "c5e8f9a0-2345-5678-9012-a3b4c5d6e7f8",
//             title: "Women Protection Training",
//             description: "Training program for women's safety and protection in the community.",
//             pillar: "PROTECTION",
//             county: "Kisumu",
//             createdBy: "mwangi",
//             csoId: "789C",
//             status: "ONGOING",
//             scheduledDate: "2025-06-25T09:00:00",
//             location: "Kisumu Women's Center",
//             createdAt: "2025-06-05T08:45:30.987654"
//         },
//         {
//             activityId: "d6f9a0b1-3456-6789-0123-b4c5d6e7f8a9",
//             title: "Emergency Response Drill",
//             description: "Community emergency response and preparedness training program.",
//             pillar: "RESPONSE",
//             county: "Nakuru",
//             createdBy: "akamau",
//             csoId: "012D",
//             status: "COMPLETED",
//             scheduledDate: "2025-05-30T11:00:00",
//             location: "Nakuru Sports Ground",
//             createdAt: "2025-05-15T16:20:45.654321"
//         }
//     ]);

//     const handleViewReports = (activityId: string) => {
//         setSelectedActivityId(activityId);
//         setViewMode('reports');
//         // Simulate URL update
//         window.history.pushState({}, '', `/dahsboard/activities/${activityId}/reports`);
//     };

//     const handleViewReportDetail = (reportId: string) => {
//         setSelectedReportId(reportId);
//         setViewMode('report-detail');
//         // Simulate URL update
//         window.history.pushState({}, '', `/dashboard/activities/${selectedActivityId}/reports/${reportId}`);
//     };

//     const handleEditActivity = (activity: ActivityData) => {
//         setEditingActivity(activity);
//         setIsEditModalOpen(true);
//         // Populate form with existing data
//         setValue('title', activity.title);
//         setValue('description', activity.description);
//         setValue('pillar', activity.pillar);
//         setValue('county', activity.county);
//         setValue('csoId', activity.csoId);
//         setValue('scheduledDate', activity.scheduledDate);
//         setValue('location', activity.location);
//     };

//     // Sample reports data
//     const [reports, setReports] = useState<ActivityReport[]>([
//         {
//             reportId: "report-001",
//             activityId: "395a2fbe-8576-45c0-b832-a1d9bbe7b75d",
//             filePath: "/uploads/reports/youth-workshop-report-1.pdf",
//             fileName: "Youth Workshop Attendance Report.pdf",
//             mimeType: "application/pdf",
//             description: "Attendance and participation report for the youth counter extremism workshop",
//             uploadedAt: "2025-06-15T14:30:00"
//         },
//         {
//             reportId: "report-002",
//             activityId: "395a2fbe-8576-45c0-b832-a1d9bbe7b75d",
//             filePath: "/uploads/reports/youth-workshop-feedback.pdf",
//             fileName: "Participant Feedback Summary.pdf",
//             mimeType: "application/pdf",
//             description: "Summary of participant feedback and evaluation forms",
//             uploadedAt: "2025-06-16T09:15:00"
//         },
//         {
//             reportId: "report-003",
//             activityId: "395a2fbe-8576-45c0-b832-a1d9bbe7b75d",
//             filePath: "/uploads/reports/workshop-photos.zip",
//             fileName: "Workshop Photos.zip",
//             mimeType: "application/zip",
//             description: "Photo documentation of the workshop activities",
//             uploadedAt: "2025-06-16T16:45:00"
//         },
//         {
//             reportId: "report-004",
//             activityId: "b4d7c8e9-1234-4567-8901-f2e3d4c5b6a7",
//             filePath: "/uploads/reports/peace-building-assessment.pdf",
//             fileName: "Community Assessment Report.pdf",
//             mimeType: "application/pdf",
//             description: "Pre-activity community assessment and needs analysis",
//             uploadedAt: "2025-06-12T11:20:00"
//         },
//         {
//             reportId: "report-005",
//             activityId: "c5e8f9a0-2345-5678-9012-a3b4c5d6e7f8",
//             filePath: "/uploads/reports/women-protection-training.pdf",
//             fileName: "Training Module Documentation.pdf",
//             mimeType: "application/pdf",
//             description: "Complete training module and materials used in the women protection program",
//             uploadedAt: "2025-06-20T08:30:00"
//         }
//     ]);

//     const columnHelper = createColumnHelper<ActivityData>();

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const columns = useMemo<ColumnDef<ActivityData, any>[]>(
//         () => [
//             columnHelper.accessor('title', {
//                 header: 'Title',
//                 cell: info => (
//                     <div className="font-medium text-gray-900">
//                         {info.getValue()}
//                     </div>
//                 ),
//             }),
//             columnHelper.accessor('pillar', {
//                 header: 'Pillar',
//                 cell: info => {
//                     const pillar = info.getValue();
//                     const getPillarColor = (pillar: string) => {
//                         switch (pillar) {
//                             case 'AWARENESS':
//                                 return 'bg-blue-100 text-blue-800';
//                             case 'PREVENTION':
//                                 return 'bg-green-100 text-green-800';
//                             case 'PROTECTION':
//                                 return 'bg-purple-100 text-purple-800';
//                             case 'RESPONSE':
//                                 return 'bg-orange-100 text-orange-800';
//                             default:
//                                 return 'bg-gray-100 text-gray-800';
//                         }
//                     };

//                     return (
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPillarColor(pillar)}`}>
//                             {pillar}
//                         </span>
//                     );
//                 },
//             }),
//             columnHelper.accessor('county', {
//                 header: 'County',
//                 cell: info => (
//                     <span className="text-sm text-gray-900">
//                         {info.getValue()}
//                     </span>
//                 ),
//             }),
//             columnHelper.accessor('csoId', {
//                 header: 'CSO ID',
//                 cell: info => (
//                     <span className="font-mono text-sm text-gray-600">
//                         {info.getValue()}
//                     </span>
//                 ),
//             }),
//             columnHelper.accessor('scheduledDate', {
//                 header: 'Date',
//                 cell: info => (
//                     <div className="text-sm">
//                         <div className="text-gray-900">
//                             {new Date(info.getValue()).toLocaleDateString()}
//                         </div>
//                         <div className="text-gray-500 text-xs">
//                             {new Date(info.getValue()).toLocaleTimeString([], {
//                                 hour: '2-digit',
//                                 minute: '2-digit'
//                             })}
//                         </div>
//                     </div>
//                 ),
//             }),
//             columnHelper.accessor('status', {
//                 header: 'Status',
//                 cell: info => {
//                     const status = info.getValue();
//                     const getStatusColor = (status: string) => {
//                         switch (status) {
//                             case 'PENDING':
//                                 return 'bg-yellow-100 text-yellow-800';
//                             case 'APPROVED':
//                                 return 'bg-blue-100 text-blue-800';
//                             case 'ONGOING':
//                                 return 'bg-green-100 text-green-800';
//                             case 'COMPLETED':
//                                 return 'bg-emerald-100 text-emerald-800';
//                             case 'CANCELLED':
//                                 return 'bg-red-100 text-red-800';
//                             default:
//                                 return 'bg-gray-100 text-gray-800';
//                         }
//                     };

//                     return (
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
//                             {status}
//                         </span>
//                     );
//                 },
//             }),
//             columnHelper.display({
//                 id: 'actions',
//                 header: 'Actions',
//                 cell: ({ row }) => (
//                     <div className="flex items-center space-x-2">
//                         <button
//                             className="p-1 cursor-pointer text-gray-400 hover:text-blue-600 transition-colors"
//                             title="View Reports"
//                             onClick={() => handleViewReports(row.original.activityId)}
//                         >
//                             <Eye className="w-4 h-4" />
//                         </button>
//                         <button
//                             className="p-1 cursor-pointer text-gray-400 hover:text-green-600 transition-colors"
//                             title="Edit"
//                             onClick={() => handleEditActivity(row.original)}
//                         >
//                             <Edit className="w-4 h-4" />
//                         </button>
//                         <button
//                             className="p-1 cursor-pointer text-gray-400 hover:text-red-600 transition-colors"
//                             title="Delete"
//                             onClick={() => handleDeleteClick(row.original.activityId)}
//                         >
//                             <Trash2 className="w-4 h-4" />
//                         </button>
//                     </div>
//                 ),
//             }),
//         ],
//         []
//     );

//     const table = useReactTable({
//         data: activities,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         globalFilterFn: 'includesString',
//         state: {
//             globalFilter,
//         },
//         onGlobalFilterChange: setGlobalFilter,
//         initialState: {
//             pagination: {
//                 pageSize: 10,
//             },
//         },
//     });

//     const handleDeleteClick = (activityId: string) => {
//         setDeletingActivityId(activityId);
//         setIsDeleteModalOpen(true);
//     };

//     const handleDeleteConfirm = () => {
//         setActivities(activities.filter(activity => activity.activityId !== deletingActivityId));
//         setIsDeleteModalOpen(false);
//         setDeletingActivityId('');
//     };

//     const onSubmit: SubmitHandler<CreateActivityForm> = async (data) => {
//         try {
//             await new Promise(resolve => setTimeout(resolve, 1000));

//             if (isEditModalOpen && editingActivity) {
//                 // Update existing activity
//                 const updatedActivity = {
//                     ...editingActivity,
//                     ...data
//                 };
//                 setActivities(activities.map(activity =>
//                     activity.activityId === editingActivity.activityId ? updatedActivity : activity
//                 ));
//                 setIsEditModalOpen(false);
//                 setEditingActivity(null);
//             } else {
//                 // Create new activity
//                 const newActivity: ActivityData = {
//                     activityId: crypto.randomUUID(),
//                     ...data,
//                     createdBy: "current_user",
//                     status: "PENDING",
//                     createdAt: new Date().toISOString()
//                 };
//                 setActivities([newActivity, ...activities]);
//                 setIsModalOpen(false);
//             }

//             reset();
//         } catch (error) {
//             console.error('Error saving activity:', error);
//         }
//     };

//     const getActivityById = (id: string) => {
//         return activities.find(activity => activity.activityId === id);
//     };

//     const getReportsByActivityId = (activityId: string) => {
//         return reports.filter(report => report.activityId === activityId);
//     };

//     const getReportById = (id: string) => {
//         return reports.find(report => report.reportId === id);
//     };

//     const getFileIcon = (mimeType: string) => {
//         if (mimeType.includes('pdf')) return <FileText className="w-6 h-6 text-red-500" />;
//         if (mimeType.includes('image')) return <FileText className="w-6 h-6 text-blue-500" />;
//         if (mimeType.includes('zip')) return <FileText className="w-6 h-6 text-yellow-500" />;
//         return <FileText className="w-6 h-6 text-gray-500" />;
//     };

//     const counties = [
//         'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi',
//         'Kitale', 'Garissa', 'Kakamega', 'Nyeri', 'Machakos', 'Meru', 'Kisii'
//     ];

//     if (viewMode === 'report-detail') {
//         const report = getReportById(selectedReportId);
//         const activity = getActivityById(selectedActivityId);

//         return (
//             <div className="p-6 bg-gray-50 min-h-screen">
//                 <div className="flex items-center mb-6">
//                     <button
//                         onClick={() => setViewMode('reports')}
//                         className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 mr-4"
//                     >
//                         <ArrowLeft className="w-5 h-5 mr-2" />
//                         Back to Reports
//                     </button>
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
//                         <p className="text-gray-600">{activity?.title}</p>
//                     </div>
//                 </div>

//                 {report && (
//                     <div className="bg-white rounded-lg shadow-sm p-6">
//                         <div className="flex items-start justify-between">
//                             <div className="flex items-center space-x-4">
//                                 {getFileIcon(report.mimeType)}
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">{report.fileName}</h3>
//                                     <p className="text-gray-600 mt-1">{report.description}</p>
//                                     <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
//                                         <span>Uploaded: {new Date(report.uploadedAt).toLocaleDateString()}</span>
//                                         <span>Type: {report.mimeType}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <button className="flex items-center space-x-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
//                                 <Download className="w-4 h-4" />
//                                 <span>Download</span>
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     if (viewMode === 'reports') {
//         const activity = getActivityById(selectedActivityId);
//         const activityReports = getReportsByActivityId(selectedActivityId);

//         return (
//             <div className="p-6 bg-gray-50 min-h-screen">
//                 <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center">
//                         <button
//                             onClick={() => setViewMode('activities')}
//                             className="flex cursor-pointer items-center text-gray-600 hover:text-gray-900 mr-4"
//                         >
//                             <ArrowLeft className="w-5 h-5 mr-2" />
//                             Back to Activities
//                         </button>
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-900">Activity Reports</h1>
//                             <p className="text-gray-600">{activity?.title}</p>
//                         </div>
//                     </div>
//                     <button
//                         onClick={() => setIsUploadModalOpen(true)}
//                         className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
//                         <Upload className="w-4 h-4" />
//                         <span>Upload Report</span>
//                     </button>
//                 </div>

//                 {/* Activity Details Card */}
//                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                             <label className="text-sm font-medium text-gray-500">County</label>
//                             <p className="text-gray-900">{activity?.county}</p>
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium text-gray-500">Scheduled Date</label>
//                             <p className="text-gray-900">
//                                 {activity?.scheduledDate && new Date(activity.scheduledDate).toLocaleDateString()}
//                             </p>
//                         </div>
//                         <div>
//                             <label className="text-sm font-medium text-gray-500">Status</label>
//                             <p className="text-gray-900">{activity?.status}</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Reports Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {activityReports.map((report) => (
//                         <div
//                             key={report.reportId}
//                             className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
//                             onClick={() => handleViewReportDetail(report.reportId)}
//                         >
//                             <div className="flex items-center space-x-3 mb-4">
//                                 {getFileIcon(report.mimeType)}
//                                 <div className="flex-1">
//                                     <h3 className="font-semibold text-gray-900 truncate">{report.fileName}</h3>
//                                     <p className="text-sm text-gray-500">{report.mimeType}</p>
//                                 </div>
//                             </div>
//                             <p className="text-gray-600 text-sm mb-4 line-clamp-3">{report.description}</p>
//                             <div className="flex items-center justify-between text-xs text-gray-500">
//                                 <span>Uploaded: {new Date(report.uploadedAt).toLocaleDateString()}</span>
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         // Handle download
//                                     }}
//                                     className="text-blue-600 cursor-pointer hover:text-blue-800"
//                                 >
//                                     <Download className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {activityReports.length === 0 && (
//                     <div className="text-center py-12">
//                         <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</h3>
//                         <p className="text-gray-600">Upload the first report for this activity.</p>
//                     </div>
//                 )}

//                 {isUploadModalOpen && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h2 className="text-lg font-semibold text-gray-800">Upload Activity Report</h2>
//                                 <button
//                                     onClick={() => setIsUploadModalOpen(false)}
//                                     className="text-gray-400 hover:text-gray-600"
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             </div>

//                             <form
//                                 onSubmit={(e) => {
//                                     e.preventDefault();
//                                     const form = e.currentTarget;
//                                     const fileInput = form.elements.namedItem('file') as HTMLInputElement;
//                                     const description = (form.elements.namedItem('description') as HTMLInputElement).value;

//                                     if (!fileInput?.files?.[0]) return;

//                                     const newReport = {
//                                         reportId: crypto.randomUUID(),
//                                         activityId: selectedActivityId,
//                                         filePath: `/uploads/${fileInput.files[0].name}`,
//                                         fileName: fileInput.files[0].name,
//                                         mimeType: fileInput.files[0].type,
//                                         description,
//                                         uploadedAt: new Date().toISOString(),
//                                     };

//                                     setReports((prev) => [newReport, ...prev]);
//                                     setIsUploadModalOpen(false);
//                                 }}
//                                 className="space-y-4"
//                             >
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Report Description</label>
//                                     <textarea
//                                         name="description"
//                                         required
//                                         className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-purple-500"
//                                         rows={3}
//                                         placeholder="Enter report description"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
//                                     <input
//                                         name="file"
//                                         type="file"
//                                         accept="application/pdf"
//                                         required
//                                         className="w-full border border-gray-300 rounded p-2"
//                                     />
//                                 </div>

//                                 <div className="flex justify-end space-x-3 pt-4 border-t">
//                                     <button
//                                         type="button"
//                                         onClick={() => setIsUploadModalOpen(false)}
//                                         className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//                                     >
//                                         Upload
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 )}

//             </div>

//         );
//     }

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen text-gray-500">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
//                     <p className="text-gray-600">Manage and track all activities</p>
//                 </div>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
//                 >
//                     <Plus className="w-4 h-4" />
//                     <span>Create Activity</span>
//                 </button>
//             </div>

//             {/* Search and Filters */}
//             <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
//                 <div className="flex items-center justify-between">
//                     <div className="relative">
//                         <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search activities..."
//                             value={globalFilter}
//                             onChange={(e) => setGlobalFilter(e.target.value)}
//                             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-80"
//                         />
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <span className="text-sm text-gray-600">
//                             Showing {table.getRowModel().rows.length} of {activities.length} activities
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Activities Table */}
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="w-full table-fixed">
//                         <thead className="bg-gray-50 border-b border-gray-200">
//                             {table.getHeaderGroups().map(headerGroup => (
//                                 <tr key={headerGroup.id}>
//                                     {headerGroup.headers.map(header => (
//                                         <th
//                                             key={header.id}
//                                             className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                                             style={{ width: header.id === 'title' ? '25%' : header.id === 'actions' ? '15%' : 'auto' }}
//                                             onClick={header.column.getToggleSortingHandler()}
//                                         >
//                                             <div className="flex items-center space-x-1">
//                                                 {flexRender(header.column.columnDef.header, header.getContext())}
//                                                 <span className="ml-2">
//                                                     {{
//                                                         asc: '↑',
//                                                         desc: '↓',
//                                                     }[header.column.getIsSorted() as string] ?? null}
//                                                 </span>
//                                             </div>
//                                         </th>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {table.getRowModel().rows.map(row => (
//                                 <tr key={row.id} className="hover:bg-gray-50">
//                                     {row.getVisibleCells().map(cell => (
//                                         <td key={cell.id} className="px-6 py-4 text-sm">
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
//                     <div className="flex items-center space-x-2">
//                         <span className="text-sm text-gray-700">Show</span>
//                         <select
//                             value={table.getState().pagination.pageSize}
//                             onChange={e => table.setPageSize(Number(e.target.value))}
//                             className="border border-gray-300 rounded px-2 py-1 text-sm"
//                         >
//                             {[5, 10, 20, 50].map(pageSize => (
//                                 <option key={pageSize} value={pageSize}>
//                                     {pageSize}
//                                 </option>
//                             ))}
//                         </select>
//                         <span className="text-sm text-gray-700">entries</span>
//                     </div>

//                     <div className="flex items-center space-x-2">
//                         <button
//                             onClick={() => table.previousPage()}
//                             disabled={!table.getCanPreviousPage()}
//                             className="px-3 py-1 cursor-pointer text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                         >
//                             <ChevronLeft className="w-4 h-4" />
//                         </button>

//                         <span className="text-sm text-gray-700">
//                             Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//                         </span>

//                         <button
//                             onClick={() => table.nextPage()}
//                             disabled={!table.getCanNextPage()}
//                             className="px-3 py-1 cursor-pointer text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                         >
//                             <ChevronRight className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Create/Edit Activity Modal */}
//             {(isModalOpen || isEditModalOpen) && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
//                         <div className="flex items-center justify-between mb-6">
//                             <h2 className="text-xl font-bold text-gray-900">
//                                 {isEditModalOpen ? 'Edit Activity' : 'Create New Activity'}
//                             </h2>
//                             <button
//                                 onClick={() => {
//                                     setIsModalOpen(false);
//                                     setIsEditModalOpen(false);
//                                     setEditingActivity(null);
//                                     reset();
//                                 }}
//                                 className="text-gray-400 cursor-pointer hover:text-gray-600"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         <Activity className="w-4 h-4 inline mr-2" />
//                                         Activity Title *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         {...register('title', {
//                                             required: 'Title is required',
//                                             minLength: { value: 5, message: 'Title must be at least 5 characters' }
//                                         })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                                         placeholder="Enter activity title"
//                                     />
//                                     {errors.title && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         <Building className="w-4 h-4 inline mr-2" />
//                                         Pillar *
//                                     </label>
//                                     <select
//                                         {...register('pillar', { required: 'Pillar is required' })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                                     >
//                                         <option value="">Select Pillar</option>
//                                         <option value="AWARENESS">Awareness</option>
//                                         <option value="PREVENTION">Prevention</option>
//                                         <option value="PROTECTION">Protection</option>
//                                         <option value="RESPONSE">Response</option>
//                                     </select>
//                                     {errors.pillar && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.pillar.message}</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         <MapPin className="w-4 h-4 inline mr-2" />
//                                         County *
//                                     </label>
//                                     <select
//                                         {...register('county', { required: 'County is required' })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                                     >
//                                         <option value="">Select County</option>
//                                         {counties.map(county => (
//                                             <option key={county} value={county}>{county}</option>
//                                         ))}
//                                     </select>
//                                     {errors.county && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.county.message}</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         <User className="w-4 h-4 inline mr-2" />
//                                         CSO ID *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         {...register('csoId', {
//                                             required: 'CSO ID is required',
//                                             pattern: { value: /^[A-Z0-9]+$/, message: 'CSO ID must contain only uppercase letters and numbers' }
//                                         })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                                         placeholder="Enter CSO ID (e.g., 123A)"
//                                     />
//                                     {errors.csoId && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.csoId.message}</p>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         <Calendar className="w-4 h-4 inline mr-2" />
//                                         Scheduled Date & Time *
//                                     </label>
//                                     <input
//                                         type="datetime-local"
//                                         {...register('scheduledDate', {
//                                             required: 'Scheduled date is required',
//                                             validate: value => new Date(value) > new Date() || 'Date must be in the future'
//                                         })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                                     />
//                                     {errors.scheduledDate && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.scheduledDate.message}</p>
//                                     )}
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         <MapPin className="w-4 h-4 inline mr-2" />
//                                         Location *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         {...register('location', {
//                                             required: 'Location is required',
//                                             minLength: { value: 5, message: 'Location must be at least 5 characters' }
//                                         })}
//                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                                         placeholder="Enter activity location"
//                                     />
//                                     {errors.location && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Description *
//                                 </label>
//                                 <textarea
//                                     {...register('description', {
//                                         required: 'Description is required',
//                                         minLength: { value: 10, message: 'Description must be at least 10 characters' }
//                                     })}
//                                     rows={4}
//                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//                                     placeholder="Enter activity description"
//                                 />
//                                 {errors.description && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//                                 )}
//                             </div>

//                             <div className="flex items-center justify-end space-x-4 pt-4 border-t">
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setIsModalOpen(false);
//                                         reset();
//                                     }}
//                                     className="px-4 cursor-pointer py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={isSubmitting}
//                                     className="px-4 py-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//                                 >
//                                     {isSubmitting && (
//                                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                                     )}
//                                     <span>{isSubmitting ? 'Creating...' : 'Create Activity'}</span>
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Delete Confirmation Modal */}
//             {isDeleteModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//                         <div className="flex items-center mb-4">
//                             <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
//                                 <Trash2 className="w-5 h-5 text-red-600" />
//                             </div>
//                             <div>
//                                 <h3 className="text-lg font-semibold text-gray-900">Delete Activity</h3>
//                                 <p className="text-gray-600">This action cannot be undone.</p>
//                             </div>
//                         </div>

//                         <div className="mb-6">
//                             <p className="text-gray-600 mb-6">
//                                 Do you want to delete this activity:{' '}
//                                 <span className="font-semibold italic text-red-600">
//                                     {activities.find((a) => a.activityId === deletingActivityId)?.title}
//                                 </span>
//                                 ? All associated reports will also be removed.
//                             </p>
//                         </div>

//                         <div className="flex items-center justify-end space-x-4">
//                             <button
//                                 onClick={() => {
//                                     setIsDeleteModalOpen(false);
//                                     setDeletingActivityId('');
//                                 }}
//                                 className="px-4 py-2 cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleDeleteConfirm}
//                                 className="px-4 py-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
//                             >
//                                 Delete Activity
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Activities;