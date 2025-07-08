import { AlertTriangle, X } from "lucide-react";
import GlassContainer from "~/components/ui/GlassContainer";
import type { Person } from "~/types/people";

interface DeletePersonModalProps {
  person: Person;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export const DeletePersonModal: React.FC<DeletePersonModalProps> = ({
  person,
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md">
        <GlassContainer>
          <div className="p-6">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-500/20 p-2">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Delete Person
                </h3>
              </div>
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="rounded-full p-1 transition-colors hover:bg-white/10 disabled:opacity-50"
              >
                <X className="h-5 w-5 text-white/70" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="mb-3 text-white/90">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">{person.name}</span>?
              </p>

              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-sm font-medium text-red-300">
                  ⚠️ This is a PERMANENT ACTION
                </p>
                <p className="mt-1 text-sm text-red-200/80">
                  This person will be completely removed from the database and
                  cannot be recovered.
                </p>
              </div>

              <div className="text-sm text-white/70">
                <p>
                  <strong>Role:</strong> {person.role}
                </p>
                {person.committee && (
                  <p>
                    <strong>Committee:</strong> {person.committee}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Person"}
              </button>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
};

export default DeletePersonModal;
