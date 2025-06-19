import React from "react";
import ActivityDetails from "@/components/dashboard/activities/ActivityReports";

export default async function Page ({ params }: { params: Promise<{ activityId: string }> }) {
  return <ActivityDetails activityId={(await params).activityId} />;
};