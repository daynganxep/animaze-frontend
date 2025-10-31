import { Avatar, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function PaintedAccount({ account }) {
    const { t } = useTranslation();

    if (!account) {
        return <Typography variant="body1" align="start" justifyItems="center" lineHeight={"32px"}>
            {t("ui.no-one")}
        </Typography >
    }
    return (<Stack direction="row" spacing={1} alignItems={"center"}>
        <Avatar
            src={account?.avatar}
            srcSet={account?.avatar}
            variant="circular"
            sx={{
                width: 32,
                height: 32,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { boxShadow: 3 },
            }}
        />
        <Typography
            variant="body1"
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
        <Typography fontWeight={"bold"} variant="body1">
            #{account?.publicId}
        </Typography>
    </Stack>);
}

export default PaintedAccount;