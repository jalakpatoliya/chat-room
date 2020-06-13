import React from 'react';
import Grid from '@material-ui/core/Grid';

export const Container = (props) => {
    return (
        <div>
            <Grid
                container
                spacing={2}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >

                {props.children.map((component, index) =>
                    <Grid item key={index}>
                        {component}
                    </Grid>
                )}

            </Grid >
        </div >
    )
}

