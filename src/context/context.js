import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);

    const [request, setRequest] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ show: false, msg: '' });

    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`).then(({ data }) => {
            let { rate: { remaining } } = data;
            // remaining = 0; test value
            setRequest(remaining);
            if (remaining === 0) {
                toggleError(true, 'sorry, you have exceeded your hourly rate limit');
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const toggleError = (show = false, msg = '') => {
        setError({ show, msg });
    }

    const searchGithubUser = async (user) => {
        toggleError();
        setIsLoading(true);
        const response = await axios(`${rootUrl}/users/${user}`).catch((error) => console.log(error));
        if (response) {
            setGithubUser(response.data);
            console.log(response.data);
            const { login, followers_url } = response.data;
            //https://api.github.com/users/john-smilga/repos?per_page=100
            axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => setRepos(response.data));
            //https://api.github.com/users/john-smilga/followers
            axios(`${followers_url}?per_page=100`).then((response) => setFollowers(response.data));
        } else {
            toggleError(true, 'there are no user with that username');
        }
        checkRequest();
        setIsLoading(false);
    }

    useEffect(checkRequest, []);

    return (
        <GithubContext.Provider value={{ githubUser, repos, followers, request, error, searchGithubUser, isLoading }}>{children}</GithubContext.Provider>
    )
}

export { GithubProvider, GithubContext };