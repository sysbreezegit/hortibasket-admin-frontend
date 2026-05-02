import { axiosAdmin } from "@/lib/axios";
import { useGenericMutation } from "@/components/query/useGenericMutation";
import { useAuthStore } from "@/store/AuthStore";
import { toast } from "sonner";

export const useAdminLogin = () => {
  const { setUserData } = useAuthStore();

  return useGenericMutation({
    apiCall: (data: any) => axiosAdmin.post("/admin/auth/login", data),
    onSuccessMessage: "Login successful",
    onSuccess: (response: any) => {
      const { token, admin } = response;
      setUserData(admin, token);
    },
  });
};

