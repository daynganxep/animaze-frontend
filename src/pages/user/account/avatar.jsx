import { Avatar, Button, Stack, Tooltip, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import L from "leaflet";
import { useDispatch } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import Window from '@/components/ui/window';
import useTippy from '@/hooks/use-tippy';
import { authActions } from '@/redux/slices/auth.slice';
import { Copy, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AccountButton({ account }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const tippy = useTippy();

    const avatarRef = useRef(null);

    useEffect(() => {
        if (avatarRef.current) L.DomEvent.disableClickPropagation(avatarRef.current);
    }, []);

    function handleLogout() {
        dispatch(authActions.setStates({ field: "tokens", reset: true }))
    }

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (account?.publicId) {
            navigator.clipboard.writeText(account.publicId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return <Tippy
        onClickOutside={tippy.close}
        interactive={true}
        visible={tippy.opening}
        placement='left-start'
        render={(attrs) => (
            <Window {...attrs} close={tippy.close}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={1}>
                    <Avatar
                        src={account?.avatar}
                        srcSet={account?.avatar}
                        variant="circular"
                        sx={{
                            width: 80,
                            height: 80,
                            cursor: "pointer",
                            transition: "0.3s",
                            "&:hover": { boxShadow: 3 },
                        }}
                    />
                    <Stack spacing={0.5} alignItems="start" sx={{ pr: 4, minWidth: 220 }}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            noWrap
                            sx={{
                                maxWidth: 200,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {account?.name}
                        </Typography>


                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="subtitle1" color="text.secondary" noWrap>
                                {t("ui.id")}: {account?.publicId}
                            </Typography>

                            <Tooltip arrow placement="right" title={copied ? t("ui.copied-id") : t("ui.copy-id")}>
                                <Copy onClick={handleCopy} fontSize="small" />
                            </Tooltip>
                        </Stack>

                        <Typography variant="subtitle1" color="text.secondary">
                            {t("ui.provider")}: {account?.provider}
                        </Typography>
                    </Stack>
                </Stack>
                <Button
                    onClick={handleLogout}
                    size="medium"
                    sx={{ width: "100%", borderRadius: 10 }}
                    endIcon={<LogOut></LogOut>}>
                    {t("ui.log-out")}
                </Button>
            </Window>
        )}>
        <Avatar
            onClick={tippy.open}
            ref={avatarRef}
            src={account?.avatar}
            srcSet={account?.avatar}
            variant="circular"
            sx={{
                width: 48,
                height: 48,
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 3,
                },
            }}
        />
    </Tippy>
}
