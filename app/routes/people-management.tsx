import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePeople, useDeletePerson } from "~/hooks/usePeople";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import DeletePersonModal from "~/components/admin/DeletePersonModal";
import type { Person } from "~/types/people";

export const PeopleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    person: Person | null;
  }>({
    isOpen: false,
    person: null,
  });

  // Fetch all people
  const { data: people = [], isLoading, error } = usePeople();

  // Delete mutation
  const deletePersonMutation = useDeletePerson();

  const handleEdit = (personId: string) => {
    navigate(`/dashboard/create-people/${personId}`);
  };

  const handleDelete = (person: Person) => {
    setDeleteModal({
      isOpen: true,
      person,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.person) return;

    try {
      await deletePersonMutation.mutateAsync(deleteModal.person.id);
      setDeleteModal({ isOpen: false, person: null });
    } catch (error) {
      console.error("Delete failed:", error);
      // Error handling is managed by the mutation
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false, person: null });
  };

  const handleCreateNew = () => {
    navigate("/dashboard/create-people");
  };

  const handleBackToAdmin = () => {
    navigate("/dashboard");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="mx-auto max-w-6xl pt-8">
          <AnimatedSection delay={0}>
            <GlassContainer>
              <div className="p-8 text-center">
                <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-400" />
                <h2 className="mb-2 text-xl font-semibold text-white">
                  Loading people...
                </h2>
                <p className="text-white/70">
                  Please wait while we fetch the team data.
                </p>
              </div>
            </GlassContainer>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="mx-auto max-w-6xl pt-8">
          <AnimatedSection delay={0}>
            <GlassContainer>
              <div className="p-8 text-center">
                <AlertCircle className="mx-auto mb-4 h-8 w-8 text-red-400" />
                <h2 className="mb-2 text-xl font-semibold text-white">
                  Error loading people
                </h2>
                <p className="mb-4 text-white/70">
                  We couldn't load the team data. Please try again.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </GlassContainer>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-green-500/20 blur-3xl delay-1000"></div>
      </div>

      <div className="relative mx-auto max-w-6xl pt-8">
        {/* Header */}
        <AnimatedSection delay={0}>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center md:mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={handleBackToAdmin}
                className="flex items-center gap-2 self-start rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 md:px-4 md:py-2 md:text-base"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Admin</span>
                <span className="sm:hidden">Back</span>
              </button>
              <div>
                <h1 className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  People Management
                </h1>
                <p className="mt-1 text-sm text-white/70 md:text-base">
                  Manage your GDSC team members
                </p>
              </div>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-green-700 sm:w-auto md:px-6 md:py-3 md:text-base"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5" />
              <span className="sm:hidden">Add Person</span>
              <span className="hidden sm:inline">Add New Person</span>
            </button>
          </div>
        </AnimatedSection>

        {/* People List */}
        {people.length === 0 ? (
          <AnimatedSection delay={200}>
            <GlassContainer>
              <div className="p-6 text-center md:p-12">
                <Users className="mx-auto mb-4 h-12 w-12 text-white/40 md:h-16 md:w-16" />
                <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">
                  No people found
                </h3>
                <p className="mb-6 text-sm text-white/70 md:text-base">
                  Get started by adding your first team member.
                </p>
                <button
                  onClick={handleCreateNew}
                  className="transform rounded-lg bg-gradient-to-r from-blue-600 to-green-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-green-700 md:px-6 md:py-3 md:text-base"
                >
                  Add First Person
                </button>
              </div>
            </GlassContainer>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={200}>
            <GlassContainer>
              <div className="p-4 md:p-6">
                {/* Desktop Table Header - Hidden on mobile */}
                <div className="mb-4 hidden grid-cols-12 gap-4 border-b border-white/10 pb-4 text-sm font-medium text-white/80 md:grid">
                  <div className="col-span-1">Image</div>
                  <div className="col-span-3">Name & Role</div>
                  <div className="col-span-2">Major</div>
                  <div className="col-span-2">Committee</div>
                  <div className="col-span-2">Year</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* People List - Responsive Layout */}
                <div className="space-y-3 md:space-y-3">
                  {people.map((person, index) => (
                    <div
                      key={person.id}
                      className="block rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10 md:grid md:grid-cols-12 md:items-center md:gap-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Mobile Card Layout */}
                      <div className="md:hidden">
                        {/* Header with image, name, and actions */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={person.image_url}
                              alt={person.name}
                              className="h-12 w-12 rounded-full border border-white/20 object-cover"
                            />
                            <div>
                              <h3 className="text-base font-semibold text-white">
                                {person.name}
                              </h3>
                              <p className="text-sm text-blue-300">
                                {person.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(person.id)}
                              className="rounded-lg bg-blue-600/20 p-2 text-blue-300 transition-colors hover:bg-blue-600/40"
                              title="Edit person"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(person)}
                              className="rounded-lg bg-red-600/20 p-2 text-red-300 transition-colors hover:bg-red-600/40"
                              title="Delete person"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {person.major && (
                            <div>
                              <p className="mb-1 text-xs tracking-wide text-white/60 uppercase">
                                Major
                              </p>
                              <p className="text-white/90">{person.major}</p>
                            </div>
                          )}
                          {person.year && (
                            <div>
                              <p className="mb-1 text-xs tracking-wide text-white/60 uppercase">
                                Year
                              </p>
                              <p className="text-white/90">{person.year}</p>
                            </div>
                          )}
                        </div>

                        {/* Committee badge */}
                        {person.committee && (
                          <div className="mt-3">
                            <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
                              {person.committee}
                            </span>
                          </div>
                        )}

                        {/* Specialties on mobile */}
                        {person.specialties &&
                          person.specialties.length > 0 && (
                            <div className="mt-3">
                              <div className="flex flex-wrap gap-2">
                                {person.specialties
                                  .slice(0, 3)
                                  .map((specialty, i) => (
                                    <span
                                      key={i}
                                      className="inline-block rounded-full bg-white/10 px-2 py-1 text-xs text-white/80"
                                    >
                                      {specialty}
                                    </span>
                                  ))}
                                {person.specialties.length > 3 && (
                                  <span className="inline-block rounded-full bg-white/10 px-2 py-1 text-xs text-white/60">
                                    +{person.specialties.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                      </div>

                      {/* Desktop Table Layout - Hidden on mobile */}
                      <div className="hidden md:contents">
                        {/* Image */}
                        <div className="col-span-1">
                          <img
                            src={person.image_url}
                            alt={person.name}
                            className="h-12 w-12 rounded-full border border-white/20 object-cover"
                          />
                        </div>

                        {/* Name & Role */}
                        <div className="col-span-3">
                          <h3 className="mb-1 font-semibold text-white">
                            {person.name}
                          </h3>
                          <p className="text-sm text-blue-300">{person.role}</p>
                        </div>

                        {/* Major */}
                        <div className="col-span-2">
                          <p className="text-sm text-white/80">
                            {person.major || "—"}
                          </p>
                        </div>

                        {/* Committee */}
                        <div className="col-span-2">
                          {person.committee && (
                            <span className="inline-block rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-300">
                              {person.committee}
                            </span>
                          )}
                        </div>

                        {/* Year */}
                        <div className="col-span-2">
                          <p className="text-sm text-white/80">
                            {person.year || "—"}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(person.id)}
                            className="rounded-lg bg-blue-600/20 p-2 text-blue-300 transition-colors hover:bg-blue-600/40"
                            title="Edit person"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(person)}
                            className="rounded-lg bg-red-600/20 p-2 text-red-300 transition-colors hover:bg-red-600/40"
                            title="Delete person"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-center text-xs text-white/70 md:text-sm">
                    Total: {people.length} team member
                    {people.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </GlassContainer>
          </AnimatedSection>
        )}
      </div>

      {/* Delete Modal */}
      {deleteModal.person && (
        <DeletePersonModal
          person={deleteModal.person}
          isOpen={deleteModal.isOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          isDeleting={deletePersonMutation.isPending}
        />
      )}
    </div>
  );
};

export default PeopleManagement;
