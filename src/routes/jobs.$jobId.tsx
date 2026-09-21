import { createFileRoute, Link } from "@tanstack/react-router";
import { JobDetail } from "@/components/job/job-detail";
import { Button } from "@/components/ui/button";
import { useJob } from "@/lib/store";

export const Route = createFileRoute("/jobs/$jobId")({ component: JobPage });

function JobPage() {
  const { jobId } = Route.useParams();
  const job = useJob(jobId);
  if (!job) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="font-display text-2xl">Không tìm thấy job</p>
        <Button asChild>
          <Link to="/">Về hàng đợi</Link>
        </Button>
      </div>
    );
  }
  return <JobDetail job={job} />;
}
