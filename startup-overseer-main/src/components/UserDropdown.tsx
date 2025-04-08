
import { useState, useRef, useEffect } from "react";
import { LogOut, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProfileImageModal } from "./ProfileImageModal/ProfileImageModal";

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved profile image from localStorage if exists
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleOpenProfileImageModal = () => {
    setIsProfileImageModalOpen(true);
    setIsOpen(false);
  };

  const handleSaveProfileImage = (imageDataUrl: string) => {
    setProfileImage(imageDataUrl);
    localStorage.setItem("profileImage", imageDataUrl);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar className="h-8 w-8 border border-border">
          {profileImage ? (
            <AvatarImage src={profileImage} alt="Imagem de perfil" />
          ) : (
            <AvatarFallback className="bg-slate-100 text-slate-600">
              U
            </AvatarFallback>
          )}
        </Avatar>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <button
            onClick={handleOpenProfileImageModal}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Camera className="mr-2 h-4 w-4" />
            Adicionar imagem de perfil
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </button>
        </div>
      )}

      <ProfileImageModal
        isOpen={isProfileImageModalOpen}
        onClose={() => setIsProfileImageModalOpen(false)}
        onSave={handleSaveProfileImage}
        currentImage={profileImage || undefined}
      />
    </div>
  );
}
