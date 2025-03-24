import React, { useState, useEffect, useContext } from "react";
import { myDB } from "../db/myFireStore";
import { EmailContext } from "../contexts/EmailContext.jsx";
import { CheckCircle2, AlertCircle, Clock, RefreshCcw } from "lucide-react";
import SwapCard from "./SwapCard"; // Import the SwapCard component
import "../styles/SwapProgress.css"; // Import the CSS file

export default function SwapProgress() {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { email } = useContext(EmailContext);
  const [userId, setUserId] = useState(null);

  const STATUS_ICONS = {
    Pending: { icon: Clock, color: "text-yellow-500" },
    "In Progress": { icon: RefreshCcw, color: "text-blue-500" },
    Completed: { icon: CheckCircle2, color: "text-green-500" },
    Cancelled: { icon: AlertCircle, color: "text-red-500" },
  };

  useEffect(() => {
    if (email) {
      const fetchUserId = async () => {
        try {
          const user = await myDB.getUserByEmail(email);
          if (user) setUserId(user.id);
        } catch (error) {
          console.error("Error fetching user by email:", error);
        }
      };
      fetchUserId();
    }
  }, [email]);

  useEffect(() => {
    if (userId) {
      const fetchSwaps = async () => {
        try {
          const swapRequests = await myDB.getUserSwaps(userId);
          const swapsWithDetails = await Promise.all(
            swapRequests.map(async (swap) => {
              const requester = await myDB.getUserById(swap.requestor_id);
              const provider = await myDB.getUserById(swap.provider_id);
              const requesterSkill = await myDB.getSkillById(swap.skill_id);
              return {
                ...swap,
                requester_name: requester ? requester.name : "Unknown",
                provider_name: provider ? provider.name : "Unknown",
                requester_skill_name: requesterSkill
                  ? requesterSkill.skill_name
                  : "Unknown Skill",
              };
            })
          );
          setSwaps(swapsWithDetails);
        } catch (error) {
          console.error("Error fetching swap requests:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSwaps();
    }
  }, [userId]);

  const filteredSwaps =
    filter === "all"
      ? swaps
      : swaps.filter((swap) => swap.status.toLowerCase() === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Swap Progress
      </h2>
      <div className="flex mb-4 overflow-x-auto">
        {["All", "Pending", "In Progress", "Completed", "Cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status.toLowerCase())}
              className={`
              px-4 py-2 mr-2 text-sm font-medium whitespace-nowrap
              ${
                filter === status.toLowerCase()
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
            >
              {status}
            </button>
          )
        )}
      </div>

      {filteredSwaps.length > 0 ? (
        <div className="skills-container">
          {filteredSwaps.map((swap) => (
            <SwapCard key={swap.id} swap={swap} STATUS_ICONS={STATUS_ICONS} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-gray-100 rounded-lg p-8">
          <AlertCircle className="mx-auto mb-4 text-gray-500" size={48} />
          <p className="text-xl text-gray-600">No active swaps yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Start exploring skills to initiate a swap!
          </p>
        </div>
      )}
    </div>
  );
}
