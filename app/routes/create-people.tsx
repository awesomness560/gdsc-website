import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { usePerson, useCreatePerson, useUpdatePerson } from "~/hooks/usePeople";
import PersonForm from "~/components/admin/PersonForm";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import type { PersonFormData } from "~/types/people";

export const PersonCreateEdit: React.FC = () => {
  const { personId } = useParams<{ personId?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(personId);

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch person data if editing
  const {
    data: person,
    isLoading: isLoadingPerson,
    error: personError,
  } = usePerson(personId!, {
    enabled: isEditing,
  });

  // Mutations
  const createPersonMutation = useCreatePerson();
  const updatePersonMutation = useUpdatePerson();

  const isSubmitting =
    createPersonMutation.isPending || updatePersonMutation.isPending;

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (formData: PersonFormData) => {
    try {
      if (isEditing && personId) {
        await updatePersonMutation.mutateAsync({
          personId,
          personData: formData,
        });
        setNotification({
          type: "success",
          message: "Person updated successfully!",
        });
      } else {
        await createPersonMutation.mutateAsync(formData);
        setNotification({
          type: "success",
          message: "Person created successfully!",
        });
        // Navigate back to admin dashboard after successful creation
        setTimeout(() => {
          navigate("/dashboard/people");
        }, 2000);
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: `Failed to ${isEditing ? "update" : "create"} person. Please try again.`,
      });
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/people");
  };

  // Loading state for editing
  if (isEditing && isLoadingPerson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="mx-auto max-w-4xl pt-8">
          <AnimatedSection delay={0}>
            <GlassContainer className="mx-auto max-w-2xl">
              <div className="p-8 text-center">
                <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-400" />
                <h2 className="mb-2 text-xl font-semibold text-white">
                  Loading person...
                </h2>
                <p className="text-white/70">
                  Please wait while we fetch the person details.
                </p>
              </div>
            </GlassContainer>
          </AnimatedSection>
        </div>
      </div>
    );
  }

  // Error state for editing
  if (isEditing && personError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="mx-auto max-w-4xl pt-8">
          <AnimatedSection delay={0}>
            <GlassContainer className="mx-auto max-w-2xl">
              <div className="p-8 text-center">
                <AlertCircle className="mx-auto mb-4 h-8 w-8 text-red-400" />
                <h2 className="mb-2 text-xl font-semibold text-white">
                  Error loading person
                </h2>
                <p className="mb-4 text-white/70">
                  We couldn't find the person you're looking for.
                </p>
                <button
                  onClick={handleCancel}
                  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Back to People
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

      <div className="relative mx-auto max-w-4xl pt-8">
        {/* Header */}
        <AnimatedSection delay={0}>
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to People
            </button>
            <div>
              <h1 className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-3xl font-bold text-transparent">
                {isEditing ? "Edit Person" : "Create New Person"}
              </h1>
              <p className="mt-1 text-white/70">
                {isEditing
                  ? "Update team member information"
                  : "Add a new team member to GDSC"}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Notification */}
        {notification && (
          <AnimatedSection delay={200}>
            <GlassContainer className="mx-auto mb-6 max-w-2xl">
              <div
                className={`flex items-center gap-3 p-4 ${
                  notification.type === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {notification.type === "success" ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <p className="font-medium">{notification.message}</p>
              </div>
            </GlassContainer>
          </AnimatedSection>
        )}

        {/* Form */}
        <AnimatedSection delay={400}>
          <PersonForm
            person={person}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
            submitLabel={isEditing ? "Update Person" : "Create Person"}
          />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default PersonCreateEdit;
