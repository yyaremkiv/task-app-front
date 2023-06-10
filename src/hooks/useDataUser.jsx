import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserOperations from "../redux/user/userOperations";

export const useDataUser = () => {
  const user = useSelector((state) => state.user.data);
  const isLogged = useSelector((state) => state.auth.isLogged);
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserOperations.getUserById());
  }, [dispatch]);

  return [user, isLoading, isLogged, error];
};
