import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { IUser } from "src/Interfaces/DataTypes";
import UserOperations from "../redux/user/userOperations";

type DataUser = [IUser, boolean, boolean, null | string];

export const useDataUser = (): DataUser => {
  const {
    data: user,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.user);
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isLogged) dispatch(UserOperations.getUser());
  }, [dispatch, isLogged]);

  return [user, isLoading, isLogged, error];
};
