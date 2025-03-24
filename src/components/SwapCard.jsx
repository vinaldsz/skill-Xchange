import React from "react";
import { AlertCircle } from "lucide-react";
import "../styles/SwapProgress.css"; // Import the CSS file

const SwapCard = ({ swap, STATUS_ICONS }) => {
  const { icon: StatusIcon, color: statusColor } = STATUS_ICONS[
    swap.status
  ] || { icon: AlertCircle, color: "text-gray-500" };

  return (
    <div className="swap-card">
      <div className="swap-card-header">
        <h3 className="text-lg font-semibold">{swap.requester_skill_name}</h3>
        <div className="flex items-center">
          <StatusIcon className="mr-2" size={16} />
          <span className={`text-sm font-medium ${statusColor}`}>
            {swap.status}
          </span>
        </div>
      </div>
      <div className="swap-card-content">
        <div className="swap-card-row">
          <span>Requested By:</span>
          <span className="value">{swap.requester_name}</span>
        </div>
        <div className="swap-card-row">
          <span>Requested To:</span>
          <span className="value">{swap.provider_name}</span>
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
