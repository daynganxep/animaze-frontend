import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/slices/auth.slice";
import AuthService from "@/services/auth.service";
import AccountService from "@/services/account.service";
import { INTERVAL_REFRESH_TOKEN } from "@/configs/env.config";

const useInitialApp = () => {
  const dispatch = useDispatch();
  const { refreshToken } = useSelector((state) => state.auth.tokens);

  const fetchAccount = useCallback(async () => {
    const [res, err] = await AccountService.getMyAccount();
    if (err) {
      dispatch(authActions.setStates({ field: "account", value: null }));
      return;
    }
    dispatch(authActions.setStates({ field: "account", value: res.data }));
  }, [dispatch]);

  const handleRefreshToken = useCallback(async () => {
    const [res, error] = await AuthService.refreshToken();
    if (error) {
      dispatch(authActions.setStates({ field: "tokens", reset: true }));
      dispatch(authActions.setStates({ field: "logged", value: false }));
      return false;
    }
    const { accessToken } = res.data;
    dispatch(authActions.setStates({ field: "tokens.accessToken", value: accessToken }));
    dispatch(authActions.setStates({ field: "logged", value: true }));

    await fetchAccount();

    return true;
  }, [dispatch, fetchAccount]);

  useEffect(() => {
    let intervalId;

    const init = async () => {
      if (!refreshToken) {
        dispatch(authActions.setStates({ field: "logged", value: false }));
        return;
      }

      await handleRefreshToken();
      intervalId = setInterval(handleRefreshToken, INTERVAL_REFRESH_TOKEN);
    };

    init();

    return () => { if (intervalId) clearInterval(intervalId) };
  }, [refreshToken, handleRefreshToken, fetchAccount, dispatch]);
};

export default useInitialApp;
