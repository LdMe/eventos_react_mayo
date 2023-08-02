import {createContext} from 'react';

const FavoritesContext = createContext({
    favorites:[],
    getFavoritesApi: () => {}
});

export default FavoritesContext;