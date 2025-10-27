import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/redux/slices/auth.slice";
import AuthService from "@/services/auth.service";
import AccountService from "@/services/account.service";
import env from "@/configs/env.config";

const useInitialApp = () => {
  const dispatch = useDispatch();
  const { refreshToken, accessToken } = useSelector((state) => state.auth.tokens);

  const handleRefreshToken = useCallback(async () => {
    const [res, error] = await AuthService.refreshToken();
    if (error) {
      dispatch(authActions.setStates({ field: "tokens", reset: true }));
      dispatch(authActions.setStates({ field: "isLoging", value: false }));
      return false;
    }
    const { accessToken } = res.data;
    dispatch(authActions.setStates({ field: "tokens.accessToken", value: accessToken }));
    dispatch(authActions.setStates({ field: "isLoging", value: true }));
    return true;
  }, [dispatch]);

  const fetchAccount = useCallback(async () => {
    const [res, err] = await AccountService.getMyAccount();
    if (err) {
      dispatch(authActions.setStates({ field: "account", value: null }));
      return;
    }
    console.log(res)
    dispatch(authActions.setStates({ field: "account", value: res.data }));
  }, [dispatch]);

  useEffect(() => {
    let intervalId;

    const init = async () => {
      if (!refreshToken) {
        dispatch(authActions.setStates({ field: "isLoging", value: false }));
        return;
      }

      await handleRefreshToken();
      intervalId = setInterval(handleRefreshToken, env.interval_refresh_token);
    };

    init();

    return () => { if (intervalId) clearInterval(intervalId) };
  }, [refreshToken, handleRefreshToken, fetchAccount, dispatch]);

  useEffect(() => {
    if (accessToken) fetchAccount();
  }, [accessToken, fetchAccount]);
};

export default useInitialApp;
