import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

//API base url
const rootUrl = 'https://api.github.com';

//Global context creation using react's createContext.
const GithubContext = React.createContext();

//Context provider configuration. Children
const GithubProvider = ({ children }) => {
    //App state initialization githubUser, repos and followers with local mock data.
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    //Remaining requets initialization to 0, request loading set to false, render error msg set to false and no msg.
    const [request, setRequest] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: '' });

    //Function to check remaining request to API.
    const checkRequest = () => {
        //Get request through axios to fetch remaining API request left. Passing base url with rate_limit string.
        //Destructure data from response and destructure remaing from data assign rate alias.
        axios(`${rootUrl}/rate_limit`).then(({ data }) => {
            let { rate: { remaining } } = data;
            // remaining = 0; test value
            //Set request quantity with remaining variable.
            setRequest(remaining);
            //If remaining it equal to 0, show error with reach limit request msg.
            if (remaining === 0) {
                toggleError(true, 'sorry, you have exceeded your hourly rate limit');
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    //Toggle error function, setting error state object with show and msg parameters.
    const toggleError = (show = false, msg = '') => {
        setError({ show, msg });
    }

    //Fetch user's information function. Async function passing username.
    const searchGithubUser = async (user) => {
        //Make sure hide error msg.
        toggleError();
        //Enable loader while fetching request.
        setIsLoading(true);
        //Get request using axios to fetch user's info. Pass API base url concat with username to send request. Store data into response const.
        const response = await axios(`${rootUrl}/users/${user}`).catch((error) => console.log(error));
        //If there is a response.
        if (response) {
            //set githubUser state with data from response.
            setGithubUser(response.data);
            // console.log(response.data);
            //Destructure username and followers from data from response.
            const { login, followers_url } = response.data;
            //Use allSettled JS method to handle several axios request, when all are done then run then logic.
            await Promise.allSettled([
                //Axios get request to fetch repos
                axios(`${rootUrl}/users/${login}/repos?per_page=100`),
                //Axios get requets to fetch followers
                axios(`${followers_url}?per_page=100`)
            ]).then((results) => {
                // console.log(results);
                //Destructure ordered response from response results array.
                const [repos, followers] = results;
                //status set to fulfilled.
                const status = 'fulfilled';
                //If repos request was fulfilled set repos state with repos from repos response.
                if (repos.status === status) {
                    setRepos(repos.value.data);
                }
                //If followers request was fulfilled set followers state with followers from followers response.
                if (followers.status === status) {
                    setFollowers(followers.value.data)
                }
            }).catch((error) => console.log(error));
        } else {
            //Render error if there was no response.
            toggleError(true, 'there are no user with that username');
        }
        //Update remaining request value.
        checkRequest();
        //Hide loader to show information.
        setIsLoading(false);
    }

    //Check and update remaining request when page loads.
    useEffect(checkRequest, []);

    return (
        //Github Context provider. Pass functions and value to share in app context.
        <GithubContext.Provider value={{ githubUser, repos, followers, request, error, searchGithubUser, isLoading }}>{children}</GithubContext.Provider>
    )
}

//Export Provider and Context.
export { GithubProvider, GithubContext };