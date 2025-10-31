import { useSelector } from 'react-redux';
import AccountButton from './avatar';
import LoginButton from './login';


export default function Account() {
    const { logged, account } = useSelector(s => s.auth);

    return logged ? <AccountButton account={account} /> : <LoginButton />

}
