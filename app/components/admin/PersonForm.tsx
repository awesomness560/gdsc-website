import { useState, useEffect } from "react";
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Users,
  Tag,
  FileText,
  Image,
} from "lucide-react";
import GlassContainer from "~/components/ui/GlassContainer";
import type { Person, PersonFormData } from "~/types/people";

interface PersonFormProps {
  person?: Person;
  onSubmit: (data: PersonFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export const PersonForm: React.FC<PersonFormProps> = ({
  person,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Save Person",
}) => {
  const [formData, setFormData] = useState<PersonFormData>({
    name: "",
    role: "",
    image_url: "",
    major: "",
    year: "",
    committee: "",
    specialties: [],
    bio: "",
  });

  const [newSpecialty, setNewSpecialty] = useState("");

  // Initialize form data when person prop changes
  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name || "",
        role: person.role || "",
        image_url: person.image_url || "",
        major: person.major || "",
        year: person.year || "",
        committee: person.committee || "",
        specialties: person.specialties || [],
        bio: person.bio || "",
      });
    }
  }, [person]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSpecialty = () => {
    if (
      newSpecialty.trim() &&
      !formData.specialties.includes(newSpecialty.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()],
      }));
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <GlassContainer className="mx-auto max-w-2xl">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-white">
            {person ? "Edit Person" : "Create New Person"}
          </h2>
          <p className="text-white/70">
            {person
              ? "Update the person's information below"
              : "Add a new person to the GDSC team"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/90">
              <User className="mr-2 inline h-4 w-4" />
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter full name"
            />
          </div>

          {/* Role Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/90">
              <Mail className="mr-2 inline h-4 w-4" />
              Role *
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., President, Technical Director, Marketing Officer"
            />
          </div>

          {/* Image URL Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/90">
              <Image className="mr-2 inline h-4 w-4" />
              Image URL *
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Major Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/90">
              <GraduationCap className="mr-2 inline h-4 w-4" />
              Major
            </label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Computer Science, Software Engineering"
            />
          </div>

          {/* Year Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/90">
              <Calendar className="mr-2 inline h-4 w-4" />
              Year
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., Sophomore, Junior, Senior, Graduate"
            />
          </div>

          {/* Committee Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/90">
              <Users className="mr-2 inline h-4 w-4" />
              Committee
            </label>
            <select
              name="committee"
              value={formData.committee}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="" className="bg-gray-800">
                Select a committee
              </option>
              <option value="Technical" className="bg-gray-800">
                Technical
              </option>
              <option value="Marketing" className="bg-gray-800">
                Marketing
              </option>
              <option value="Business" className="bg-gray-800">
                Business
              </option>
              <option value="Administrative" className="bg-gray-800">
                Administrative
              </option>
            </select>
          </div>

          {/* Specialties Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/90">
              <Tag className="mr-2 inline h-4 w-4" />
              Specialties
            </label>
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), handleAddSpecialty())
                }
                className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Add a specialty (e.g., React, Flutter, UI/UX)"
              />
              <button
                type="button"
                onClick={handleAddSpecialty}
                className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            {formData.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white"
                  >
                    {specialty}
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialty(specialty)}
                      className="transition-colors hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bio Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/90">
              <FileText className="mr-2 inline h-4 w-4" />
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Brief bio or description (optional)"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 transform rounded-lg bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </GlassContainer>
  );
};

export default PersonForm;
