import { Grid } from "@mui/material";

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
    return (
        <Grid
            container
            spacing={2}
            alignItems="stretch"
        >
            {data.map((item) => (
                <Grid item key={keyExtractor(item)} xs={12} md={3}>
                    {renderItem(item)}
                </Grid>
            ))}
        </Grid>
    );
}
 
export default GenericList;