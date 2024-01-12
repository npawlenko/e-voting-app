import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface GenericListProps<T> {
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => number;
    data: T[];
}

const GenericList = <T extends unknown>({
    renderItem,
    keyExtractor,
    data
}: GenericListProps<T>) => {
    const { t } = useTranslation(); 

    return (
        <Grid
            container
            spacing={2}
            alignItems="stretch"
        >
            {Array.isArray(data) && data.length > 0 ?
            data.map((item) => (
                <Grid item key={keyExtractor(item)} xs={12} md={6} xl={4} sx={{position: 'relative'}}>
                    {renderItem(item)}
                </Grid>
            )) :

            <Typography variant="h6" style={{ textAlign: 'center', display: 'block', width: '100%', marginTop: '20px' }}>{t('noPollsFound')}</Typography>
            }
        </Grid>
    );
}
 
export default GenericList;