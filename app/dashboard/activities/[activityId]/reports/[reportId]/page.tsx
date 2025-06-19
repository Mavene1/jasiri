import React from "react";
import ReportDetails from "@/components/dashboard/activities/ReportDetails";

export default async function Page ({ params }: { params: Promise<{ activityId: string, reportId: string }> }) {
  return <ReportDetails activityId={(await params).activityId} reportId={(await params).reportId} />;
};