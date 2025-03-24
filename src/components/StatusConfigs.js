import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export const STATUS_CONFIGS = {
  Pending: {
    color: "text-yellow-500",
    icon: AlertCircle,
    description: "Waiting for response",
  },
  Accepted: {
    color: "text-green-600",
    icon: CheckCircle,
    description: "Swap confirmed",
  },
  Rejected: {
    color: "text-red-600",
    icon: XCircle,
    description: "Swap declined",
  },
  InProgress: {
    color: "text-blue-500",
    icon: Clock,
    description: "Swap in progress",
  },
};
