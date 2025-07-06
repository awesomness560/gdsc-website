import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, X } from "lucide-react";
import GlassContainer from "~/components/ui/GlassContainer";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { signIn, isSigningIn, signInError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      await signIn({ email, password });
      // Reset form on success
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      // Error is handled by the hook
      console.error("Sign in failed:", error);
    }
  };

  const handleClose = () => {
    if (isSigningIn) return; // Prevent closing during sign in
    setEmail("");
    setPassword("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md">
        <GlassContainer className="w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-0">
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg border border-white/20 p-2 backdrop-blur-sm"
                style={{
                  background: "rgba(59, 130, 246, 0.2)",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                <Lock className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Officer Sign In
                </h2>
                <p className="text-sm text-white/70">
                  Access the admin dashboard
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              disabled={isSigningIn}
              className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/90"
              >
                Email Address
              </label>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-4 w-4 text-white/60" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSigningIn}
                    className="w-full rounded-lg bg-transparent py-3 pr-4 pl-10 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/90"
              >
                Password
              </label>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 h-4 w-4 text-white/60" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isSigningIn}
                    className="w-full rounded-lg bg-transparent py-3 pr-12 pl-10 text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSigningIn}
                    className="absolute right-3 p-1 text-white/60 transition-colors hover:text-white disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isSigningIn}
                className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-white/80">
                Keep me signed in
              </label>
            </div>

            {/* Error Message */}
            {signInError && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/20 p-3">
                <p className="text-sm text-red-300">
                  {signInError instanceof Error
                    ? signInError.message
                    : "Sign in failed. Please try again."}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="group relative">
              <div
                className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(34, 197, 94, 0.4) 100%)",
                  boxShadow:
                    "0 8px 24px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
              />
              <Button
                type="submit"
                disabled={!email || !password || isSigningIn}
                className="relative z-10 w-full bg-transparent py-3 font-semibold text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 pt-4">
              <p className="text-center text-xs text-white/60">
                Admin credentials are managed by the system administrator.
                <br />
                Contact your admin if you need access.
              </p>
            </div>
          </form>
        </GlassContainer>
      </div>
    </div>
  );
}
