import axiosAPI from "../../axiosAPI";

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

export const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, posts});
export const createPostSuccess = (post) => ({type: CREATE_POST_SUCCESS, post});
export const errorMessage = (error) => ({type: ERROR_MESSAGE, error});
export const fetchPostSuccess = post => ({type: FETCH_POST_SUCCESS, post});

export const fetchPosts = () => {
    return async (dispatch) => {
        try {
            const response = await axiosAPI.get('/news');
            dispatch(fetchPostsSuccess(response.data));
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};

export const createPost = post => {
    return async (dispatch) => {
        try {
            await axiosAPI.post('/news', post);
            dispatch(fetchPosts());
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};

export const postRemove = (id) => {
    return  async dispatch => {
        try {
            await axiosAPI.delete(`/news/${id}`);
            dispatch(fetchPosts());
        } catch (e) {
            dispatch(errorMessage(e))
        }
    }
};

export const getOnePost = id => {
  return async dispatch => {
        try {
            const response =  await axiosAPI.get(`/news/${id}`);
            dispatch(fetchPostSuccess(response.data));
        } catch (e) {
            dispatch(errorMessage(e))
        }
  }
};