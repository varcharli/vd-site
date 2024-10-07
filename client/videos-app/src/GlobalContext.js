import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import models from './client/models';

// 创建 Context
const GlobalContext = createContext();

// 定义初始状态
const initialState = {
    user: {
        id: '',
        name: '',
        favoriteId: '',
        watchLaterId: '',
    },
    recentSearch: [],
    // 其他全局参数
};

// 定义 reducer 函数
const globalReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_RECENT_SEARCH':
            return { ...state, recentSearch: action.payload };
        // 其他 case
        default:
            return state;
    }
};

// 创建 Provider 组件
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await models.user.getCurrent();
                const user = response.data;

                dispatch({ type: 'SET_USER', payload: user });
            } catch (error) {
                console.log('Error getting user info: ', error);
            }
        }

        if (isDataLoaded) return;
        getUserInfo().then(() => {
            setIsDataLoaded(true);
        });
    }, [isDataLoaded]);


    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {isDataLoaded ? children : <div>----Loading...</div>}
        </GlobalContext.Provider>
    );
};

// 自定义 hook
export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    const { state, dispatch } = context;

    const setUser = (user) => {
        dispatch({ type: 'SET_USER', payload: user });
    };

    const setRecentSearch = (searches) => {
        dispatch({ type: 'SET_RECENT_SEARCH', payload: searches });
    };

    return {
        user: state.user,
        recentSearch: state.recentSearch,
        setUser,
        setRecentSearch,
    };
};