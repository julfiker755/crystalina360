import { authKey, helpers, roleKey } from "@/lib";
import { useLogoutMutation } from "@/redux/api/authApi";
import { baseApi } from "@/redux/api/baseApi";
import { clearAuth } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const auth = useAppSelector((state: AppState) => state.auth);
  const dispatch = useAppDispatch();
  const role = auth?.user?.role;
  const router = useRouter();

  //   hanlde logout
  const handleLogout = async () => {
    await logout({}).unwrap();
    dispatch(baseApi.util.resetApiState());
    if (role === roleKey.admin || role === roleKey.user) {
      router.push("/");
    } else if (role === roleKey.operator) {
      router.push("/operator");
    }
    helpers.removeAuthCookie(authKey);
    dispatch(clearAuth());
  };

  return {
    logout: handleLogout,
    isLoading,
  };
};
