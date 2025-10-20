import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../configs/const.config';

export default function AdminHomePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user.role !== ROLES.ADMIN) {
      navigate('/');
    }
  }, [user, navigate]);

  return <Fragment></Fragment>;
}
