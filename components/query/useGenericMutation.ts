"use client"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

type MutationParams<T> = {
  apiCall: (data: T) => Promise<any>;
  onSuccessMessage?: string;
  queryKeyToInvalidate?: any | string[];
  redirectTo?: string;
  onSuccess?: (data: any) => void;
};

export const useGenericMutation = <T>({
  apiCall,
  onSuccessMessage = 'Operation successful',
  queryKeyToInvalidate,
  redirectTo,
  onSuccess
}: MutationParams<T>) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: T) => {
      try {
        const response = await apiCall(data);
        return response.data; // Return .data directly as per axios pattern
      } catch (error) {
        console.log('Error:', error);
        throw error;
      }
    },
    onSettled: async (data, error: any) => {
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(onSuccessMessage);

        if (onSuccess) {
          onSuccess(data);
        }

        if (queryKeyToInvalidate) {
          await queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate });
        }

        if (redirectTo) {
          router.push(redirectTo);
        }
      }
    },
  });
};
