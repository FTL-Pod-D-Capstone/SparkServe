import React from 'react'
import {posts} from '../DumyData/DummyData'
import { Container, Grid } from '@mui/material'
import Cards from '../../Components/Cards/Cards'


const VolOppContainer = ({bgColor}) => {
    return (
        <div>
            <Container
            sx={{ my: 8,
                backgroundColor: bgColor || '#ffffff', // default to white if no color is provided
                minHeight: '100vh',
                padding: '20px',
            }}>
        <Grid 
            container rowSpacing={4} 
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <Cards 
                        className="Cards"
                        id={post.id}
                        title={post.title}
                        cover={post.cover}
                        author={post.author}
                        view={post.view}
                        comment={post.comment}
                    />
                </Grid>
            ))}
        </Grid>
    </Container>
    </div>
    )
}

export default VolOppContainer