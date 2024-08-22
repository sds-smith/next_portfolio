
import CoffeeExplorer from './media/coffee-explorer.png'
import Boss from './media/boss.png';
import DiscoverBreweries from './media/discover-breweries.png'
import AssembleTheJams from './media/atj.png';

export const projects = [
    {   
        id: '1on1boss-card',
        name: '1on1Boss',
        action: 'learn more',
        heading_title : 'Kanban-style Discussion Board',
        heading_subtitle : 'Full-stack MERN App',
        background_image : Boss,
        video_link : '',
        live_link : 'http://app.1on1boss.com/',
        repo_link : 'https://www.1on1boss.com/the-team',
        readme_link : 'https://www.1on1boss.com',
        description : 'Client-side React with fully-versionable API on https Express server. Runs in Docker container.'
    },  
    {   
        id: 'discover-breweries-card',
        name: 'Discover Breweries',
        action: 'view on github',
        heading_title : 'Brewery Locator',
        heading_subtitle : 'React static frontend with AWS Lambda',
        background_image : DiscoverBreweries,
        video_link : '',
        live_link : '',
        repo_link: 'https://github.com/sds-smith/discover-breweries/tree/main',
        readme_link : 'https://github.com/sds-smith/discover-breweries/blob/main/README.md',
        description : `Served from AWS S3 via Cloudfront distribution. Lambda functions, triggered by AWS API Gateway and Cloudwatch Events, connect to MongoDB Atlas to perform full range of CRUD operations. Frontend code changes are deployed to S3 via aws cli script`
    },       
    {   
        id: 'atj-card',
        name : 'Assemble the Jams',
        action: 'view on github',
        heading_title : 'Assemble the Jams',
        heading_subtitle : 'React Progressive Web App',
        background_image : AssembleTheJams,
        video_link : 'https://youtu.be/MWqiaZKtZzg',
        live_link : '',
        repo_link: 'https://github.com/sds-smith/assemble_the_jams_3/tree/main',
        readme_link : 'https://github.com/sds-smith/assemble_the_jams_3/blob/master/README.md',
        description : 'React Frontend with Serverless API layer via Netlify functions. Authentication with Spotify and OAuth 2.0.'
    },
    // {   
    //     id: 'coffee-explorer-card',
    //     heading_title : 'Coffee Explorer',
    //     heading_subtitle : 'NextJS Web App',
    //     background_image : CoffeeExplorer,
    //     video_link : '',
    //     live_link : '',
    //     readme_link : 'https://github.com/sds-smith/discover-coffee-stores/blob/main/README.md',
    //     description : 'NextJS App leverages both Server Side Rendering and Static Site Generation; use Foursquare with the browser\'s built-in geolocation API to find coffee shops near you.'
    // }
]