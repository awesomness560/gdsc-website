import { useState } from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";
import GlassContainer from "~/components/ui/GlassContainer";
import { Button } from "~/components/ui/button";
import type { EventWithRSVPCount } from "~/types/events";

interface DeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventWithRSVPCount | null;
  onConfirm: (eventId: string) => void;
  isDeleting?: boolean;
}

export default function DeleteEventModal({
  isOpen,
  onClose,
  event,
  onConfirm,
  isDeleting = false,
}: DeleteEventModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const confirmationPhrase = "delete event";

  if (!isOpen || !event) return null;

  const handleConfirm = () => {
    if (confirmText.toLowerCase() === confirmationPhrase) {
      onConfirm(event.id);
    }
  };

  const isConfirmationValid = confirmText.toLowerCase() === confirmationPhrase;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md">
        <GlassContainer padding="none">
          {/* Red gradient overlay for danger */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 opacity-80" />

          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-xl border border-red-400/30 p-3 backdrop-blur-sm"
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Delete Event</h2>
                  <p className="text-sm text-white/70">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Event Info */}
            <div className="mb-6">
              <GlassContainer padding="sm" gradientOverlay={false}>
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-white">
                    {event.name}
                  </h3>
                  <div className="space-y-1 text-sm text-white/70">
                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p>Location: {event.location}</p>
                    <p>RSVPs: {event.rsvp_count || 0}</p>
                    <p className="capitalize">Status: {event.status}</p>
                  </div>
                </div>
              </GlassContainer>
            </div>

            {/* Warning Message */}
            <div className="mb-6 space-y-3">
              <p className="text-white/90">
                Are you sure you want to delete this event? This will:
              </p>
              <ul className="ml-4 space-y-1 text-sm text-white/70">
                <li>• Permanently delete the event</li>
                <li>• Remove all RSVP data ({event.rsvp_count || 0} RSVPs)</li>
                <li>• Delete all associated links and host information</li>
                <li>• Cannot be recovered</li>
              </ul>
            </div>

            {/* Confirmation Input */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-white/90">
                Type "{confirmationPhrase}" to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                disabled={isDeleting}
                placeholder="delete event"
                className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-sm transition-all focus:border-red-400/50 focus:bg-white/10 focus:outline-none disabled:opacity-50"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20 disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  boxShadow: "0 2px 8px rgba(255, 255, 255, 0.05)",
                }}
              >
                Cancel
              </Button>
              <div className="group relative flex-1">
                <div
                  className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(220, 38, 38, 0.4) 100%)",
                    boxShadow:
                      "0 8px 24px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  }}
                />
                <Button
                  onClick={handleConfirm}
                  disabled={!isConfirmationValid || isDeleting}
                  className="relative z-10 w-full bg-transparent font-semibold text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Event
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
