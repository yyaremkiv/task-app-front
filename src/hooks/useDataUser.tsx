import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import UserOperations from "../redux/user/userOperations";

export const useDataUser = (): [any, boolean, boolean, string | null] => {
  const user = useSelector((state: RootState) => state.user.data);
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const error = useSelector((state: RootState) => state.user.error);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(UserOperations.getUser());
  }, [dispatch]);

  return [user, isLoading, isLogged, error];
};
