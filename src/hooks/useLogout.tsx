import { authKey, helpers, roleKey } from "@/lib";
import { useLogoutMutation } from "@/redux/api/authApi";
import { baseApi } from "@/redux/api/baseApi";
import { clearAuth } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { redirect, useRouter } from "next/navigation";

export const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const auth = useAppSelector((state: AppState) => state.auth);
  const dispatch = useAppDispatch();
  const role = auth?.user?.role;
  const router = useRouter();

  //   hanlde logout
  const handleLogout = async () => {
    try {
      // await logout({}).unwrap();
      if (role === roleKey.operator) {
        redirect("/operator");
      } else {
        redirect("/");
      }
    } finally {
      helpers.removeAuthCookie(authKey);
      dispatch(clearAuth());
      dispatch(baseApi.util.resetApiState());
    }
  };

  return {
    logout: handleLogout,
    isLoading,
  };
};
